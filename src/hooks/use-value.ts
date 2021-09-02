import { createWorkInProgressHook } from "../work-in-progress-hook";

/**
 * `useValue` returns a mutable object whose `.current` property is initialized to the argument `initialValue`.
 * The returned object will persist for the full lifetime of the component.
 *
 * `useValue()` is handy for keeping any mutable value around similar to how you’d use instance fields in classes.
 *
 * This cannot be used as a [Roact Ref](https://roblox.github.io/roact/advanced/bindings-and-refs/#refs). If you want
 * to reference a Roblox Instance, refer to {@link useRef}.
 *
 * @example
 * const valueContainer = useValue(initialValue);
 * useEffect(() => {
 *   valueContainer.current = value;
 * });
 *
 * @param initialValue - Initialized as the `.current` property
 * @returns A memoized, mutable object
 *
 * @see https://reactjs.org/docs/hooks-reference.html#useref
 */
export function useValue<T>(initialValue: T): { current: T } {
	const hook = createWorkInProgressHook(() => ({ current: initialValue }));
	return hook.state;
}
