import { areDepsEqual } from "../are-deps-equal";
import { createWorkInProgressHook } from "../work-in-progress-hook";
import type { DependencyList } from "../index";

/**
 * `useMemo` will only recompute the memoized value when one of the `deps` has changed. This optimization helps to
 * avoid expensive calculations on every render.
 *
 * Remember that the function passed to `useMemo` runs during rendering. Don’t do anything there that you wouldn’t
 * normally do while rendering. For example, side effects belong in `useEffect`, not `useMemo`.
 *
 * If no array is provided, a new value will be computed on every render. This is usually a mistake, so `deps` must be
 * explicitly written as `undefined`.
 *
 * @example
 * const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
 *
 * @param factory - A "create" function that computes a value
 * @param deps - An array of dependencies
 * @returns A memoized value
 *
 * @see https://reactjs.org/docs/hooks-reference.html#usememo
 */
export function useMemo<T extends defined>(factory: () => T, deps: DependencyList | undefined): T {
	const hook = createWorkInProgressHook<[T?, DependencyList?]>(() => []);

	const [prevValue, prevDeps] = hook.state;
	if (prevValue !== undefined && deps && areDepsEqual(deps, prevDeps)) {
		return prevValue;
	}

	const nextValue = factory();
	hook.state = [nextValue, deps];

	return nextValue;
}
