import { createWorkInProgressHook, resolveCurrentComponent } from "../work-in-progress-hook";
import type {
	Dispatch,
	DispatchWithoutAction,
	Reducer,
	ReducerAction,
	ReducerState,
	ReducerStateWithoutAction,
	ReducerWithoutAction,
} from "../index";

/**
 * An alternative to `useState`.
 *
 * `useReducer` is usually preferable to `useState` when you have complex state logic that involves
 * multiple sub-values. It also lets you optimize performance for components that trigger deep
 * updates because you can pass `dispatch` down instead of callbacks.
 *
 * @see https://reactjs.org/docs/hooks-reference.html#usereducer
 */
// overload where dispatch could accept 0 arguments.
export function useReducer<R extends ReducerWithoutAction<any>, I>(
	reducer: R,
	initializerArg: I,
	initializer: (arg: I) => ReducerStateWithoutAction<R>,
): [ReducerStateWithoutAction<R>, DispatchWithoutAction];
/**
 * An alternative to `useState`.
 *
 * `useReducer` is usually preferable to `useState` when you have complex state logic that involves
 * multiple sub-values. It also lets you optimize performance for components that trigger deep
 * updates because you can pass `dispatch` down instead of callbacks.
 *
 * @see https://reactjs.org/docs/hooks-reference.html#usereducer
 */
// overload where dispatch could accept 0 arguments.
export function useReducer<R extends ReducerWithoutAction<any>>(
	reducer: R,
	initializerArg: ReducerStateWithoutAction<R>,
	initializer?: undefined,
): [ReducerStateWithoutAction<R>, DispatchWithoutAction];
/**
 * An alternative to `useState`.
 *
 * `useReducer` is usually preferable to `useState` when you have complex state logic that involves
 * multiple sub-values. It also lets you optimize performance for components that trigger deep
 * updates because you can pass `dispatch` down instead of callbacks.
 *
 * @see https://reactjs.org/docs/hooks-reference.html#usereducer
 */
// overload for free "I"; all goes as long as initializer converts it into "ReducerState<R>".
export function useReducer<R extends Reducer<any, any>, I>(
	reducer: R,
	initializerArg: I,
	initializer: (arg: I) => ReducerState<R>,
): [ReducerState<R>, Dispatch<ReducerAction<R>>];
/**
 * An alternative to `useState`.
 *
 * `useReducer` is usually preferable to `useState` when you have complex state logic that involves
 * multiple sub-values. It also lets you optimize performance for components that trigger deep
 * updates because you can pass `dispatch` down instead of callbacks.
 *
 * @see https://reactjs.org/docs/hooks-reference.html#usereducer
 */
// overload where "I" may be a subset of ReducerState<R>; used to provide autocompletion.
// If "I" matches ReducerState<R> exactly then the last overload will allow initializer to be omitted.
export function useReducer<R extends Reducer<any, any>, I>(
	reducer: R,
	initializerArg: I & ReducerState<R>,
	initializer?: (arg: I & ReducerState<R>) => ReducerState<R>,
): [ReducerState<R>, Dispatch<ReducerAction<R>>];
/**
 * An alternative to `useState`.
 *
 * `useReducer` is usually preferable to `useState` when you have complex state logic that involves
 * multiple sub-values. It also lets you optimize performance for components that trigger deep
 * updates because you can pass `dispatch` down instead of callbacks.
 *
 * @see https://reactjs.org/docs/hooks-reference.html#usereducer
 */
// Implementation matches a previous overload, is this required?
export function useReducer<R extends Reducer<unknown, unknown>, I>(
	reducer: R,
	initializerArg: I,
	initializer?: (arg: I) => ReducerState<R>,
): [ReducerState<R>, Dispatch<ReducerAction<R>>] {
	const currentlyRenderingComponent = resolveCurrentComponent();
	const hook = createWorkInProgressHook(() =>
		initializer ? initializer(initializerArg) : (initializerArg as ReducerState<R>),
	);
	const dispatch = (action: ReducerAction<R>) => {
		currentlyRenderingComponent.setHookState(
			hook.id,
			() => (hook.state = reducer(hook.state, action) as ReducerState<R>),
		);
	};
	return [hook.state, dispatch];
}
