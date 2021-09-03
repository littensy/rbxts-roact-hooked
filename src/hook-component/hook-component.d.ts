import type { Effect, FC, HookedComponentConstructor, LinkedList } from "../types";
import type { Hook, prepareHooks, resetHooks } from "../work-in-progress-hook";
import type Roact from "@rbxts/roact";

export = HookComponent;
export as namespace FromFunctionComponent;

// Function export
declare namespace HookComponent {
	const dependencies: {
		Roact: typeof Roact;
		prepareHooks: typeof prepareHooks;
		resetHooks: typeof resetHooks;
	};

	function hookComponent<P = {}>(render: FC<P>, componentType: typeof Roact.Component): HookedComponentConstructor<P>;
}

// Hooked Component
declare namespace HookComponent {
	interface HookedComponentState {
		[id: number]: unknown;
	}

	interface HookedComponent<P = {}> extends Roact.Component<P, HookedComponentState> {
		/**
		 * The first hook in the linked list.
		 */
		firstHook?: Hook;

		/**
		 * A linked list of effects.
		 */
		readonly effects: LinkedList<Effect>;

		/**
		 * Sets the memoized state of a hook. Calls the updater function with the current state.
		 *
		 * @param id - The numerical id of the hook.
		 * @param reducer - Returns a new state from the current state.
		 */
		setHookState<T>(id: number, reducer: (currentState: T) => T): void;

		/**
		 * Sets up hooks & calls the render function passed to `create`.
		 */
		render(): Roact.Element;
	}
}
