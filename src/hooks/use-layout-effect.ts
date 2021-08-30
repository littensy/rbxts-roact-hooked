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
 * The signature is identical to `useEffect`, but it fires synchronously after the function component is called.
 * Use this to read layout from the DOM and synchronously re-render.
 *
 * Updates scheduled inside `useLayoutEffect` will be flushed synchronously, blocking the `Component.render` method.
 *
 * Prefer the standard `useEffect` when possible to avoid blocking visual updates.
 *
 * If you’re migrating code from a class component, `useLayoutEffect` fires in the same phase as `didMount`
 * and `didUpdate`. All cleanup functions are called on `didUnmount`.
 *
 * @see https://reactjs.org/docs/hooks-reference.html#uselayouteffect
 */
export function useLayoutEffect(callback: EffectCallback, deps?: DependencyList) {
	const hook = createWorkInProgressHook<LayoutEffect | undefined>(undefined);
	const prevDeps = hook.state?.deps;
	if (deps && areDepsEqual(deps, prevDeps)) {
		return;
	}
	hook.state = scheduleLayoutEffect({ id: hook.id, immediate: true, callback, deps });
}
