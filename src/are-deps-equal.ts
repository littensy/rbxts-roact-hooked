import type { DependencyList } from "./index";

export function areDepsEqual(nextDeps: DependencyList, prevDeps?: DependencyList) {
	if (!prevDeps) return false;
	return (nextDeps as Array<defined>).every((value, index) => prevDeps[index] === value);
}
