import { ComponentWithHooksConstructor, withHooks, withHooksPure } from "./with-hooks";
import Roact from "@rbxts/roact";

export type { RoactContext, Dispatch, DispatchWithoutAction, Reducer, ReducerWithoutAction } from "./types";

export * from "./hooks";

/**
 * `hooked` is a [higher-order component](https://reactjs.org/docs/higher-order-components.html) that turns your
 * Function Component into a [class component](https://roblox.github.io/roact/guide/components/).
 *
 * `hooked` allows you to hook into the Component's lifecycle through Hooks.
 *
 * @example
 * const MyComponent = hooked<Props>(
 *   (props) => {
 *     // render using props
 *   },
 * );
 *
 * @see https://reactjs.org/docs/hooks-intro.html
 */
export function hooked<P = {}>(functionComponent: Roact.FunctionComponent<P>): ComponentWithHooksConstructor<P> {
	return withHooks<P>(functionComponent);
}

/**
 * `pure` is a [higher-order component](https://reactjs.org/docs/higher-order-components.html) that turns your
 * Function Component into a [PureComponent](https://roblox.github.io/roact/performance/reduce-reconciliation/#purecomponent).
 *
 * If your function component wrapped in `pure` has a {@link useState}, {@link useReducer} or {@link useContext} Hook
 * in its implementation, it will still rerender when state or context changes.
 *
 * @example
 * const MyComponent = pure<Props>(
 *   (props) => {
 *     // render using props
 *   },
 * );
 *
 * @see https://reactjs.org/docs/react-api.html
 * @see https://roblox.github.io/roact/performance/reduce-reconciliation/
 */
export function pure<P = {}>(functionComponent: Roact.FunctionComponent<P>): ComponentWithHooksConstructor<P> {
	return withHooksPure<P>(functionComponent);
}
