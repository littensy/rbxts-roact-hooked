import { Ref, createRef } from "@rbxts/roact";
import { createWorkInProgressHook } from "../work-in-progress-hook";

/**
 * Creates a memoized Roact ref with the given value.
 *
 * @see https://roblox.github.io/roact/advanced/bindings-and-refs/#refs
 */
export function useRef<T extends Instance = Instance>(): Ref<T> {
	return createWorkInProgressHook(() => createRef<T>()).state;
}
