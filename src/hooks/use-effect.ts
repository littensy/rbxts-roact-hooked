import { areDepsEqual } from "../are-deps-equal";
import { createWorkInProgressHook, resolveCurrentComponent } from "../work-in-progress-hook";
import type { DependencyList, Effect, EffectCallback } from "../index";

function scheduleEffect(effect: Effect): Effect {
	const { effects } = resolveCurrentComponent();
	if (effects.tail === undefined) {
		// This is the first effect in the list
		effects.head = effects.tail = effect;
	} else {
		// Append to the end of the list
		effects.tail = effects.tail.next = effect;
	}
	return effect;
}

/**
 * Accepts a function that contains imperative, possibly effectful code.
 *
 * If you’re migrating code from a class component, `useEffect` fires in the same phase as `didMount` and `didUpdate`.
 * All cleanup functions are called on `didUnmount`.
 *
 * @param callback - Imperative function that can return a cleanup function
 * @param deps - If present, effect will only activate if the values in the list change.
 *
 * @see https://reactjs.org/docs/hooks-reference.html#useeffect
 */
export function useEffect(callback: EffectCallback, deps?: DependencyList) {
	const hook = createWorkInProgressHook<Effect | undefined>(undefined);
	const prevDeps = hook.state?.deps;
	if (deps && areDepsEqual(deps, prevDeps)) {
		return;
	}
	hook.state = scheduleEffect({ id: hook.id, callback, deps });
}
