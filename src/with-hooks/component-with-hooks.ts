import { Hook, renderDone, renderReady } from "../utils/memoized-hook";
import type { Destructor, Effect, LinkedList } from "../types";
import type Roact from "@rbxts/roact";

type State = Record<number, unknown>;

export interface ComponentWithHooksConstructor<P = {}> extends Roact.ComponentConstructor<P, State> {
	/**
	 * If `defaultProps` is defined on a stateful component, any props that aren't specified when a component is created
	 * will be taken from there.
	 */
	defaultProps?: Partial<P>;

	/**
	 * `validateProps` is an optional method that can be implemented for a component. It provides a mechanism for
	 * verifying inputs passed into the component.
	 *
	 * Every time props are updated, `validateProps` will be called with the new props before proceeding to
	 * `shouldUpdate` or `init`. It should return the same parameters that assert expects: a boolean, true if the props
	 * passed validation, false if they did not, plus a message explaining why they failed. If the first return value is
	 * true, the second value is ignored.
	 *
	 * **For performance reasons, property validation is disabled by default.** To use this feature, enable
	 * `propValidation` via `setGlobalConfig`:
	 * ```lua
	 * Roact.setGlobalConfig({
	 *     propValidation = true
	 * })
	 * ```
	 *
	 * See [setGlobalConfig](https://roblox.github.io/roact/api-reference/#roactsetglobalconfig) for more details.
	 */
	validateProps?: (props: P) => LuaTuple<[boolean, string?]>;
}

export interface ComponentWithHooks<P = any> extends Roact.Component<P, State> {}

export abstract class ComponentWithHooks<P = any> {
	/**
	 * The first hook in the linked list.
	 */
	abstract firstHook?: Hook;

	/**
	 * A linked list of effects.
	 */
	abstract effects: LinkedList<Effect>;

	/**
	 * Maps effect cleanup functions to effect ids.
	 */
	abstract effectHandles: Map<number, Destructor>;

	/**
	 * A reference to the function component this class should wrap. In practice, this is defined as a static field, as
	 * those can be accessed through the `__index` metamethod.
	 */
	abstract readonly functionComponent: Roact.FunctionComponent<P>;

	init() {
		this.effects = {};
		this.effectHandles = new Map();
	}

	setHookState<T>(id: number, reducer: (currentState: T) => T) {
		this.setState((state) => ({ [id]: reducer(state[id] as T) }));
	}

	render() {
		renderReady(this);
		const result = opcall(this.functionComponent, this.props);
		renderDone(this);
		if (!result.success) {
			throw `(ComponentWithHooks) ${result.error}`;
		}
		return result.value;
	}

	protected didMount() {
		this.flushEffects();
	}

	protected didUpdate() {
		this.flushEffects();
	}

	protected willUnmount() {
		this.unmountEffects();
		this.effects.head = undefined;
	}

	private flushEffectsHelper(effect?: Effect) {
		if (!effect) return;
		this.effectHandles.get(effect.id)?.();
		const handle = effect.callback();
		if (handle) {
			this.effectHandles.set(effect.id, handle);
		}
		this.flushEffectsHelper(effect.next);
	}

	private flushEffects() {
		this.flushEffectsHelper(this.effects.head);
		this.effects.head = undefined;
		this.effects.tail = undefined;
	}

	private unmountEffects() {
		// This does not clean up effects by order of id, but it should not matter
		// because this is on unmount
		this.effectHandles.forEach((handle) => handle());
		this.effectHandles.clear();
	}
}
