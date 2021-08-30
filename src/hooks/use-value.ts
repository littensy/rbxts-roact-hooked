import { createWorkInProgressHook } from "../work-in-progress-hook";

/**
 * `useValue` returns a mutable ref object whose `.current` property is initialized to the passed argument
 * (`initialValue`). The returned object will persist for the full lifetime of the component.
 *
 * `useValue()` is handy for keeping any mutable value around similar to how you’d use instance fields in classes.
 *
 * @see https://reactjs.org/docs/hooks-reference.html#useref
 */
export function useValue<T>(initialValue: T): { current: T } {
	const hook = createWorkInProgressHook(() => ({ current: initialValue }));
	return hook.state;
}
