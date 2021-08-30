/**
 * https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react/v16/index.d.ts
 */

import * as hooks from "./hooks";
import { FunctionComponentConstructor, fromFunctionComponent } from "./from-function-component";
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
function FC<
	T extends Hooked.FC | {},
	F extends Hooked.FC = T extends Hooked.FC ? T : Hooked.FC<T>,
	P extends {} = Hooked.InferFCProps<F>,
>(render: F): FunctionComponentConstructor<P> {
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
function pure<F extends Hooked.FC<any>, P = Hooked.InferFCProps<F>>(render: F): Roact.ComponentConstructor<P> {
	return fromFunctionComponent<P>(render, Roact.PureComponent);
}

const Hooked = {
	...hooks,
	FC,
	pure,
} as const;

export = Hooked;

// Utility types
declare namespace Hooked {
	interface LinkedList<T extends LinkedListNode<any>> {
		/**
		 * First node in the list.
		 */
		head?: T;
		/**
		 * Last node in the list.
		 */
		tail?: T;
	}

	type LinkedListNode<T> = {
		/**
		 * The next node in the list.
		 */
		next?: T;
	};

	type Destructor = () => void;

	/**
	 * A Function Component
	 */
	type FC<P = {}> = Roact.FunctionComponent<P>;

	/**
	 * Extracts the props type from a Function Component
	 */
	type InferFCProps<T> = T extends FC<infer P> ? P : never;

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

	interface Effect extends LinkedListNode<Effect> {
		id: number;
		callback: EffectCallback;
		deps?: DependencyList;
	}

	interface LayoutEffect extends Effect {
		immediate: true;
	}
}
