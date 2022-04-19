import {
	Dispatch,
	DispatchWithoutAction,
	Reducer,
	ReducerAction,
	ReducerState,
	ReducerStateWithoutAction,
	ReducerWithoutAction,
} from "../types";
import { memoizedHook, resolveCurrentComponent } from "../memoized-hook";

/**
 * Accepts a reducer of type `(state, action) => newState`, and returns the current state paired with a `dispatch`
 * method.
 *
 * If a new state is the same value as the current state, this will bail out without rerendering the component.
 *
 * `useReducer` is usually preferable to `useState` when you have complex state logic that involves multiple sub-values.
 * It also lets you optimize performance for components that trigger deep updates because [you can pass `dispatch` down
 * instead of callbacks](https://reactjs.org/docs/hooks-faq.html#how-to-avoid-passing-callbacks-down).
 *
 * There are two different ways to initialize `useReducer` state. You can use the initial state as a second argument,
 * or [create the initial state lazily](https://reactjs.org/docs/hooks-reference.html#lazy-initialization). To do this,
 * you can pass an init function as the third argument. The initial state will be set to `initializer(initialArg)`.
 *
 * @param reducer - Function that returns a state given the current state and an action
 * @param initializerArg - State used during the initial render, or passed to `initializer` if provided
 * @param initializer - Optional function that returns an initial state given `initializerArg`
 * @returns The current state, and an action dispatcher
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
 * Accepts a reducer of type `(state, action) => newState`, and returns the current state paired with a `dispatch`
 * method.
 *
 * If a new state is the same value as the current state, this will bail out without rerendering the component.
 *
 * `useReducer` is usually preferable to `useState` when you have complex state logic that involves multiple sub-values.
 * It also lets you optimize performance for components that trigger deep updates because [you can pass `dispatch` down
 * instead of callbacks](https://reactjs.org/docs/hooks-faq.html#how-to-avoid-passing-callbacks-down).
 *
 * There are two different ways to initialize `useReducer` state. You can use the initial state as a second argument,
 * or [create the initial state lazily](https://reactjs.org/docs/hooks-reference.html#lazy-initialization). To do this,
 * you can pass an init function as the third argument. The initial state will be set to `initializer(initialArg)`.
 *
 * @param reducer - Function that returns a state given the current state and an action
 * @param initializerArg - State used during the initial render, or passed to `initializer` if provided
 * @param initializer - Optional function that returns an initial state given `initializerArg`
 * @returns The current state, and an action dispatcher
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
 * Accepts a reducer of type `(state, action) => newState`, and returns the current state paired with a `dispatch`
 * method.
 *
 * If a new state is the same value as the current state, this will bail out without rerendering the component.
 *
 * `useReducer` is usually preferable to `useState` when you have complex state logic that involves multiple sub-values.
 * It also lets you optimize performance for components that trigger deep updates because [you can pass `dispatch` down
 * instead of callbacks](https://reactjs.org/docs/hooks-faq.html#how-to-avoid-passing-callbacks-down).
 *
 * There are two different ways to initialize `useReducer` state. You can use the initial state as a second argument,
 * or [create the initial state lazily](https://reactjs.org/docs/hooks-reference.html#lazy-initialization). To do this,
 * you can pass an init function as the third argument. The initial state will be set to `initializer(initialArg)`.
 *
 * @param reducer - Function that returns a state given the current state and an action
 * @param initializerArg - State used during the initial render, or passed to `initializer` if provided
 * @param initializer - Optional function that returns an initial state given `initializerArg`
 * @returns The current state, and an action dispatcher
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
 * Accepts a reducer of type `(state, action) => newState`, and returns the current state paired with a `dispatch`
 * method.
 *
 * If a new state is the same value as the current state, this will bail out without rerendering the component.
 *
 * `useReducer` is usually preferable to `useState` when you have complex state logic that involves multiple sub-values.
 * It also lets you optimize performance for components that trigger deep updates because [you can pass `dispatch` down
 * instead of callbacks](https://reactjs.org/docs/hooks-faq.html#how-to-avoid-passing-callbacks-down).
 *
 * There are two different ways to initialize `useReducer` state. You can use the initial state as a second argument,
 * or [create the initial state lazily](https://reactjs.org/docs/hooks-reference.html#lazy-initialization). To do this,
 * you can pass an init function as the third argument. The initial state will be set to `initializer(initialArg)`.
 *
 * @param reducer - Function that returns a state given the current state and an action
 * @param initializerArg - State used during the initial render, or passed to `initializer` if provided
 * @param initializer - Optional function that returns an initial state given `initializerArg`
 * @returns The current state, and an action dispatcher
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
 * Accepts a reducer of type `(state, action) => newState`, and returns the current state paired with a `dispatch`
 * method.
 *
 * If a new state is the same value as the current state, this will bail out without rerendering the component.
 *
 * `useReducer` is usually preferable to `useState` when you have complex state logic that involves multiple sub-values.
 * It also lets you optimize performance for components that trigger deep updates because [you can pass `dispatch` down
 * instead of callbacks](https://reactjs.org/docs/hooks-faq.html#how-to-avoid-passing-callbacks-down).
 *
 * There are two different ways to initialize `useReducer` state. You can use the initial state as a second argument,
 * or [create the initial state lazily](https://reactjs.org/docs/hooks-reference.html#lazy-initialization). To do this,
 * you can pass an init function as the third argument. The initial state will be set to `initializer(initialArg)`.
 *
 * @param reducer - Function that returns a state given the current state and an action
 * @param initializerArg - State used during the initial render, or passed to `initializer` if provided
 * @param initializer - Optional function that returns an initial state given `initializerArg`
 * @returns The current state, and an action dispatcher
 *
 * @see https://reactjs.org/docs/hooks-reference.html#usereducer
 */
// Implementation matches a previous overload, is this required?
export function useReducer<R extends Reducer<unknown, unknown>, I>(
	reducer: R,
	initializerArg: I,
	initializer?: (arg: I) => ReducerState<R>,
): [state: ReducerState<R>, dipatch: Dispatch<ReducerAction<R>>] {
	const currentComponent = resolveCurrentComponent();
	const hook = memoizedHook(() => {
		if (initializer) {
			return initializer(initializerArg);
		} else {
			return initializerArg as ReducerState<R>;
		}
	});

	function dispatch(action: ReducerAction<R>) {
		const nextState = reducer(hook.state, action) as ReducerState<R>;
		if (hook.state !== nextState) {
			currentComponent.setHookState(hook.id, () => (hook.state = nextState));
		}
	}

	return [hook.state, dispatch];
}
