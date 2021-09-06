import { useReducer } from "./use-reducer";
import type { Dispatch } from "../types";

type SetStateAction<S> = S | ((prevState: S) => S);

/**
 * Returns a stateful value, and a function to update it.
 *
 * During the initial render, the returned state (`state`) is the same as the value passed as the first argument
 * (`initialState`).
 *
 * The `setState` function is used to update the state. It always knows the current state, so it's safe to omit from
 * the `useEffect` or `useCallback` dependency lists.
 *
 * If you update a State Hook to the same value as the current state, this will bail out without rerendering the
 * component.
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
 * If you update a State Hook to the same value as the current state, this will bail out without rerendering the
 * component.
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
 * If you update a State Hook to the same value as the current state, this will bail out without rerendering the
 * component.
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
	const [state, dispatch] = useReducer(
		(state: S, action: SetStateAction<S>): S => {
			return typeIs(action, "function") ? action(state) : action;
		},
		undefined,
		() => (typeIs(initialState, "function") ? initialState() : initialState),
	);
	return [state, dispatch];
}
