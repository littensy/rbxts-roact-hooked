import { areDepsEqual } from "../are-deps-equal";
import { createWorkInProgressHook, resolveCurrentComponent } from "../work-in-progress-hook";
import type { DependencyList, EffectCallback, LayoutEffect } from "../index";

function scheduleLayoutEffect(effect: LayoutEffect): LayoutEffect {
	const { layoutEffects } = resolveCurrentComponent();
	if (layoutEffects.tail === undefined) {
		// This is the first effect in the list
		layoutEffects.head = layoutEffects.tail = effect;
	} else {
		// Append to the end of the list
		layoutEffects.tail = layoutEffects.tail.next = effect;
	}
	return effect;
}

/**
 * The signature is identical to `useEffect`, but it fires synchronously on `didMount`. Use this to read from or update
 * the Roblox Instance objects and synchronously re-render.
 *
 * Prefer the standard `useEffect` when possible to avoid blocking visual updates.
 *
 * `useLayoutEffect` runs in the same phase as `didMount` and `didUpdate`. All cleanup functions are called on `willUnmount`.
 *
 * ##### [Let me know if this is useless](https://github.com/littensy/rbxts-roact-hooked/issues)
 *
 * @param callback - Imperative function that can return a cleanup function
 * @param deps - If present, effect will only activate if the values in the list change
 *
 * @see https://reactjs.org/docs/hooks-reference.html#uselayouteffect
 */
export function useLayoutEffect(callback: EffectCallback, deps?: DependencyList) {
	const hook = createWorkInProgressHook<LayoutEffect | undefined>(undefined);
	const prevDeps = hook.state?.deps;
	if (deps && areDepsEqual(deps, prevDeps)) return;
	hook.state = scheduleLayoutEffect({ id: hook.id, immediate: true, callback, deps });
}
