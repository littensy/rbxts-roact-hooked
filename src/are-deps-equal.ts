import type { DependencyList } from "./types";

export function areDepsEqual(nextDeps: DependencyList, prevDeps?: DependencyList) {
	if (!prevDeps) return false;
	return (nextDeps as Array<defined>).every((value, index) => prevDeps[index] === value);
}
