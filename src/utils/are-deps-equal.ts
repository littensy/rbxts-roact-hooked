import type { DependencyList } from "../types";

export function areDepsEqual(nextDeps: DependencyList, prevDeps?: DependencyList) {
	if (prevDeps === undefined) {
		return false;
	}

	if (nextDeps.size() !== prevDeps.size()) {
		return false;
	}

	for (let i = 0; i < nextDeps.size(); i++) {
		if (nextDeps[i] === prevDeps[i]) {
			continue;
		}
		return false;
	}
	return true;
}
