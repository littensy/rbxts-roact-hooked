import { hookComponent } from "./hook-component";
import Roact from "@rbxts/roact";
import type { HookedComponentConstructor } from "./types";

export type {
	FC,
	HookedComponentConstructor,
	RoactContext,
	Dispatch,
	DispatchWithoutAction,
	Reducer,
	ReducerWithoutAction,
} from "./types";

export * from "./hooks";

/**
 * `hooked` is a [higher-order component](https://reactjs.org/docs/higher-order-components.html) that turns your
 * Function Component into a [Roact Component](https://roblox.github.io/roact/guide/components/).
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
 * @param render - A Function Component
 * @returns A Component class
 *
 * @see https://reactjs.org/docs/hooks-intro.html
 */
export function hooked<P = {}>(render: Roact.FunctionComponent<P>): HookedComponentConstructor<P> {
	return hookComponent<P>(render, Roact.Component);
}

/**
 * `pure` is a [higher-order component](https://reactjs.org/docs/higher-order-components.html) that turns your
 * Function Component into a [Roact PureComponent](https://roblox.github.io/roact/performance/reduce-reconciliation/#purecomponent).
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
 * @param render - A Function Component
 * @returns A PureComponent class
 *
 * @see https://reactjs.org/docs/react-api.html
 * @see https://roblox.github.io/roact/performance/reduce-reconciliation/
 */
export function pure<P = {}>(render: Roact.FunctionComponent<P>): HookedComponentConstructor<P> {
	return hookComponent<P>(render, Roact.PureComponent);
}
