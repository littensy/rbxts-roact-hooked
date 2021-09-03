import { useMemo } from "./use-memo";
import type { DependencyList } from "../types";

/**
 * Returns a memoized version of the callback that only changes if one of the dependencies has changed.
 *
 * This is useful when passing callbacks to optimized child components that rely on reference equality to prevent
 * unnecessary renders.
 *
 * `useCallback(fn, deps)` is equivalent to `useMemo(() => fn, deps)`.
 *
 * @example
 * const memoizedCallback = useCallback(
 *   () => {
 *     doSomething(a, b);
 *   },
 *   [a, b],
 * );
 *
 * @param callback - An inline callback
 * @param deps - An array of dependencies
 * @returns A memoized version of the callback
 *
 * @see https://reactjs.org/docs/hooks-reference.html#usecallback
 */
export function useCallback<T extends Callback>(callback: T, deps: DependencyList): T {
	return useMemo(() => callback, deps);
}
