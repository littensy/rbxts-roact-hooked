import { areDepsEqual } from "../utils/are-deps-equal";
import { memoizedHook, resolveCurrentComponent } from "../utils/memoized-hook";
import type { DependencyList, Effect, EffectCallback } from "../types";

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
 * Accepts a function that contains imperative, possibly effectful code. The function passed to `useEffect` will run
 * synchronously (thread-blocking) after the Roblox Instance is created and rendered.
 *
 * The clean-up function (returned by the effect) runs before the component is removed from the UI to prevent memory
 * leaks. Additionally, if a component renders multiple times, the **previous effect is cleaned up before executing
 * the next effect**.
 *
 *`useEffect` runs in the same phase as `didMount` and `didUpdate`. All cleanup functions are called on `willUnmount`.
 *
 * @example
 * useEffect(() => {
 *   // use value
 *   return () => {
 *     // cleanup
 *   }
 * }, [value]);
 *
 * useEffect(() => {
 *   // did update
 * });
 *
 * useEffect(() => {
 *   // did mount
 *   return () => {
 *     // will unmount
 *   }
 * }, []);
 *
 * @param callback - Imperative function that can return a cleanup function
 * @param deps - If present, effect will only activate if the values in the list change
 *
 * @see https://reactjs.org/docs/hooks-reference.html#useeffect
 */
export function useEffect(callback: EffectCallback, deps?: DependencyList) {
	const hook = memoizedHook<Effect | undefined>(undefined);
	const prevDeps = hook.state?.deps;
	if (deps && areDepsEqual(deps, prevDeps)) return;
	hook.state = scheduleEffect({ id: hook.id, callback, deps });
}
