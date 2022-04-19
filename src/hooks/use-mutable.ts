import { memoizedHook } from "../memoized-hook";

interface MutableObject<T> {
	current: T;
}

// Function overloads from https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react/index.d.ts#L1061

/**
 * `useMutable` returns a mutable object whose `.current` property is initialized to the argument `initialValue`.
 * The returned object will persist for the full lifetime of the component.
 *
 * `useMutable()` is handy for keeping any mutable value around similar to how you’d use instance fields in classes.
 *
 * This cannot be used as a [Roact Ref](https://roblox.github.io/roact/advanced/bindings-and-refs/#refs). If you want
 * to reference a Roblox Instance, refer to {@link useRef}.
 *
 * @example
 * const container = useMutable(initialValue);
 * useEffect(() => {
 *   container.current = value;
 * });
 *
 * @param initialValue - Initialized as the `.current` property
 * @returns A memoized, mutable object
 *
 * @see https://reactjs.org/docs/hooks-reference.html#useref
 */
export function useMutable<T>(initialValue: T): MutableObject<T>;
/**
 * `useMutable` returns a mutable object whose `.current` property is initialized to the argument `initialValue`.
 * The returned object will persist for the full lifetime of the component.
 *
 * `useMutable()` is handy for keeping any mutable value around similar to how you’d use instance fields in classes.
 *
 * This cannot be used as a [Roact Ref](https://roblox.github.io/roact/advanced/bindings-and-refs/#refs). If you want
 * to reference a Roblox Instance, refer to {@link useRef}.
 *
 * @example
 * const container = useMutable(initialValue);
 * useEffect(() => {
 *   container.current = value;
 * });
 *
 * @param initialValue - Initialized as the `.current` property
 * @returns A memoized, mutable object
 *
 * @see https://reactjs.org/docs/hooks-reference.html#useref
 */
// convenience overload for refs given as a ref prop as they typically start with a null value
export function useMutable<T>(initialValue: T | undefined): MutableObject<T>;
/**
 * `useMutable` returns a mutable object whose `.current` property is initialized to the argument `initialValue`.
 * The returned object will persist for the full lifetime of the component.
 *
 * `useMutable()` is handy for keeping any mutable value around similar to how you’d use instance fields in classes.
 *
 * This cannot be used as a [Roact Ref](https://roblox.github.io/roact/advanced/bindings-and-refs/#refs). If you want
 * to reference a Roblox Instance, refer to {@link useRef}.
 *
 * @example
 * const container = useMutable(initialValue);
 * useEffect(() => {
 *   container.current = value;
 * });
 *
 * @returns A memoized, mutable object
 *
 * @see https://reactjs.org/docs/hooks-reference.html#useref
 */
// convenience overload for potentially undefined initialValue / call with 0 arguments
// has a default to stop it from defaulting to {} instead
export function useMutable<T = undefined>(): MutableObject<T | undefined>;
/**
 * `useMutable` returns a mutable object whose `.current` property is initialized to the argument `initialValue`.
 * The returned object will persist for the full lifetime of the component.
 *
 * `useMutable()` is handy for keeping any mutable value around similar to how you’d use instance fields in classes.
 *
 * This cannot be used as a [Roact Ref](https://roblox.github.io/roact/advanced/bindings-and-refs/#refs). If you want
 * to reference a Roblox Instance, refer to {@link useRef}.
 *
 * @example
 * const container = useMutable(initialValue);
 * useEffect(() => {
 *   container.current = value;
 * });
 *
 * @param initialValue - Initialized as the `.current` property
 * @returns A memoized, mutable object
 *
 * @see https://reactjs.org/docs/hooks-reference.html#useref
 */
export function useMutable(initialValue?: unknown) {
	return memoizedHook(() => ({ current: initialValue })).state;
}
