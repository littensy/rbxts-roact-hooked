import { createWorkInProgressHook, resolveCurrentComponent } from "../work-in-progress-hook";
import type { Dispatch, SetStateAction } from "../index";

const setStateReducer = <S>(state: S, action: SetStateAction<S>): S => {
	return typeIs(action, "function") ? action(state) : action;
};

/**
 * Returns a stateful value, and a function to update it.
 *
 * During the initial render, the returned state (`state`) is the same as the value passed as the first argument
 * (`initialState`).
 *
 * The `setState` function is used to update the state. It always knows the current state, so it's safe to omit from
 * the `useEffect` or `useCallback` dependency lists.
 *
 * If you update a State Hook to the same value as the current state, this will bail out without rendering the children
 * or firing effects.
 *
 * @example
 * const [state, setState] = useState(initialState);
 * const [state, setState] = useState(() => someExpensiveComputation());
 * setState(newState);
 * setState((prevState) => prevState + 1)
 *
 * @param initialState - State used during the initial render. Can be a function, which will be executed on initial render
 * @returns A stateful value, and an updater function
 *
 * @see https://reactjs.org/docs/hooks-reference.html#usestate
 */
export function useState<S>(initialState: S | (() => S)): [state: S, setState: Dispatch<SetStateAction<S>>];
/**
 * Returns a stateful value, and a function to update it.
 *
 * During the initial render, the returned state (`state`) is the same as the value passed as the first argument
 * (`initialState`).
 *
 * The `setState` function is used to update the state. It always knows the current state, so it's safe to omit from
 * the `useEffect` or `useCallback` dependency lists.
 *
 * If you update a State Hook to the same value as the current state, this will bail out without rendering the children
 * or firing effects.
 *
 * @example
 * const [state, setState] = useState(initialState);
 * const [state, setState] = useState(() => someExpensiveComputation());
 * setState(newState);
 * setState((prevState) => prevState + 1)
 *
 * @param initialState - State used during the initial render. Can be a function, which will be executed on initial render
 * @returns A stateful value, and an updater function
 *
 * @see https://reactjs.org/docs/hooks-reference.html#usestate
 */
export function useState<S = undefined>(
	initialState?: void,
): [state: S | undefined, setState: Dispatch<SetStateAction<S | undefined>>];
/**
 * Returns a stateful value, and a function to update it.
 *
 * During the initial render, the returned state (`state`) is the same as the value passed as the first argument
 * (`initialState`).
 *
 * The `setState` function is used to update the state. It always knows the current state, so it's safe to omit from
 * the `useEffect` or `useCallback` dependency lists.
 *
 * If you update a State Hook to the same value as the current state, this will bail out without rendering the children
 * or firing effects.
 *
 * @example
 * const [state, setState] = useState(initialState);
 * const [state, setState] = useState(() => someExpensiveComputation());
 * setState(newState);
 * setState((prevState) => prevState + 1)
 *
 * @param initialState - State used during the initial render. Can be a function, which will be executed on initial render
 * @returns A stateful value, and an updater function
 *
 * @see https://reactjs.org/docs/hooks-reference.html#usestate
 */
export function useState<S>(initialState: S | (() => S)): [state: S, setState: Dispatch<SetStateAction<S>>] {
	const currentlyRenderingComponent = resolveCurrentComponent();
	const hook = createWorkInProgressHook(() => (typeIs(initialState, "function") ? initialState() : initialState));
	const dispatch = (action: SetStateAction<S>) => {
		// If you update a State Hook to the same value as the current state,
		// this will bail out without rendering the children or firing effects.
		const nextState = setStateReducer(hook.state, action);
		if (hook.state !== nextState) {
			currentlyRenderingComponent.setHookState(hook.id, () => (hook.state = nextState));
		}
	};
	return [hook.state, dispatch];
}
