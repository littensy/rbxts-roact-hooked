/**
 * https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react/v16/index.d.ts
 */

import * as hooks from "./hooks";
import { fromFunctionComponent } from "./from-function-component";
import Roact from "@rbxts/roact";

/**
 * `Hooked.FC` is a [higher-order component](https://reactjs.org/docs/higher-order-components.html) that turns your
 * function component into a [Roact Component](https://roblox.github.io/roact/guide/components/).
 *
 * @example ```
 * const MyComponent = Hooked.FC(
 *   (props: Props) => {
 *     // render using props
 *   },
 * );
 * MyComponent.defaultProps = {};
 * ```
 *
 * @param render - Function component to wrap
 * @returns A Component class
 *
 * @see https://reactjs.org/docs/hooks-intro.html
 */
function FC<P = {}>(render: Hooked.FC<P>): Hooked.FunctionComponentConstructor<P> {
	return fromFunctionComponent<P>(render, Roact.Component);
}

/**
 * `Hooked.pure` is a [higher-order component](https://reactjs.org/docs/higher-order-components.html) that turns your
 * function component into a [Roact PureComponent](https://roblox.github.io/roact/performance/reduce-reconciliation/#purecomponent),
 * which implements the `shouldUpdate` lifecycle event with a shallow equality comparison.
 *
 * If your component renders the same result given the same props, you can wrap it in a call to `Hooked.pure` for a
 * performance boost in some cases by memoizing the result. This means that Roact will skip rendering the component,
 * and reuse the last rendered result.
 *
 * `Hooked.pure` only checks for prop changes. If your function component wrapped in `Hooked.pure` has a
 * {@link useState}, {@link useReducer} or {@link useContext} Hook in its implementation, it will still rerender when
 * state or context change.
 *
 * @example ```
 * const MyComponent = Hooked.pure(
 *   (props: Props) => {
 *     // render using props
 *   },
 * );
 * MyComponent.defaultProps = {};
 * ```
 *
 * @param render - Function component to wrap in a Roact PureComponent
 * @returns A PureComponent class
 *
 * @see https://reactjs.org/docs/react-api.html
 * @see https://roblox.github.io/roact/performance/reduce-reconciliation/
 */
function pure<P = {}>(render: Hooked.FC<P>): Hooked.FunctionComponentConstructor<P> {
	return fromFunctionComponent<P>(render, Roact.PureComponent);
}

/**
 * Roact implementation of React Hooks
 */
const Hooked = {
	...hooks,
	FC,
	pure,
} as const;

export = Hooked;

// Utility types
declare namespace Hooked {
	interface LinkedList<T extends LinkedListNode<any>> {
		head?: T;
		tail?: T;
	}

	interface LinkedListNode<T> {
		next?: T;
	}

	type Destructor = () => void;

	type FC<P = {}> = Roact.FunctionComponent<P>;

	type Dispatch<A> = (action: A) => void;
	type DispatchWithoutAction = () => void;

	type Reducer<S, A> = (prevState: S, action: A) => S;
	type ReducerState<R extends Reducer<any, any>> = R extends Reducer<infer S, any> ? S : never;
	type ReducerAction<R extends Reducer<any, any>> = R extends Reducer<any, infer A> ? A : never;

	type ReducerWithoutAction<S> = (prevState: S) => S;
	type ReducerStateWithoutAction<R extends ReducerWithoutAction<any>> = R extends ReducerWithoutAction<infer S>
		? S
		: never;

	type SetStateReducer<S> = Reducer<S, SetStateAction<S>>;
	type SetStateAction<S> = S | ((prevState: S) => S);

	type DependencyList = ReadonlyArray<unknown>;
	type EffectCallback = () => void | Destructor;

	interface RoactContext<T> {
		Provider: Roact.ComponentConstructor<{
			value: T;
		}>;
		Consumer: Roact.ComponentConstructor<{
			render: (value: T) => Roact.Element | undefined;
		}>;
	}

	interface FunctionComponentConstructor<P = {}> extends Roact.ComponentConstructor<P, Record<number, unknown>> {
		defaultProps?: Partial<P>;
		validateProps?: (props: P) => LuaTuple<[boolean, string?]>;
	}

	interface Effect extends LinkedListNode<Effect> {
		id: number;
		callback: EffectCallback;
		deps?: DependencyList;
	}

	interface LayoutEffect extends Effect {
		immediate: true;
	}
}
