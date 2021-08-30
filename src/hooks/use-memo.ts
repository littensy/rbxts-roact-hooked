import { areDepsEqual } from "../are-deps-equal";
import { createWorkInProgressHook } from "../work-in-progress-hook";
import type { DependencyList } from "../index";

/**
 * `useMemo` will only recompute the memoized value when one of the `deps` has changed.
 *
 * Usage note: if calling `useMemo` with a referentially stable function, also give it as the input in
 * the second argument.
 *
 * @example ```
 * function expensive () { ... }
 *
 * function Component () {
 *   const expensiveResult = useMemo(expensive, [expensive])
 *   return ...
 * }
 * ```
 *
 * @see https://reactjs.org/docs/hooks-reference.html#usememo
 */
export function useMemo<T>(factory: () => T, deps: DependencyList | undefined): T {
	const hook = createWorkInProgressHook<[T?, DependencyList?]>(() => []);

	const [prevValue, prevDeps] = hook.state;
	if (prevValue !== undefined && deps && areDepsEqual(deps, prevDeps)) {
		return prevValue;
	}

	const nextValue = factory();
	hook.state = [nextValue, deps];

	return nextValue;
}
