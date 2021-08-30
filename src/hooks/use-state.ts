import { createWorkInProgressHook, resolveCurrentComponent } from "../work-in-progress-hook";
import type { Dispatch, SetStateAction, SetStateReducer } from "../index";

export const setStateReducer = <S>(state: S, action: SetStateAction<S>): S => {
	return typeIs(action, "function") ? action(state) : action;
};

/**
 * Returns a stateful value, and a function to update it.
 *
 * @see https://reactjs.org/docs/hooks-reference.html#usestate
 */
export function useState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];
/**
 * Returns a stateful value, and a function to update it.
 *
 * @see https://reactjs.org/docs/hooks-reference.html#usestate
 */
export function useState<S = undefined>(initialState?: void): [S | undefined, Dispatch<SetStateAction<S | undefined>>];
/**
 * Returns a stateful value, and a function to update it.
 *
 * @see https://reactjs.org/docs/hooks-reference.html#usestate
 */
export function useState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>] {
	const currentlyRenderingComponent = resolveCurrentComponent();
	const hook = createWorkInProgressHook(() => (typeIs(initialState, "function") ? initialState() : initialState));
	const dispatch = (action: SetStateAction<S>) => {
		currentlyRenderingComponent.setHookState(hook.id, () => (hook.state = setStateReducer(hook.state, action)));
	};
	return [hook.state, dispatch];
}
