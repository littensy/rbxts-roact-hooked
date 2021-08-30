import { useMemo } from "./use-memo";
import type { DependencyList } from "../index";

/**
 * `useCallback` will return a memoized version of the callback that only changes if one of the `inputs`
 * has changed.
 *
 * @see https://reactjs.org/docs/hooks-reference.html#usecallback
 */
export function useCallback<T extends Callback>(callback: T, deps: DependencyList): T {
	return useMemo(() => callback, deps);
}
