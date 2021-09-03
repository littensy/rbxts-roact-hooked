import { Ref, createRef } from "@rbxts/roact";
import { createWorkInProgressHook } from "../work-in-progress-hook";

/**
 * `useRef` returns a memoized *`Ref`*, a special type of binding that points to Roblox Instance objects that are
 * created by Roact. The returned object will persist for the full lifetime of the component.
 *
 * `useMutable()` is handy for keeping any mutable value around similar to how you’d use instance fields in classes.
 *
 * This is not mutable like React's `useRef` hook. If you want to use a mutable object, refer to {@link useMutable}.
 *
 * @example
 * const ref = useRef<TextBox>();
 *
 * useEffect(() => {
 * 	const textBox = ref.getValue();
 * 	if (textBox) {
 * 		textBox.CaptureFocus();
 * 	}
 * }, []);
 *
 * return <textbox Ref={ref} />;
 *
 * @returns A memoized `Ref` object
 *
 * @see https://roblox.github.io/roact/advanced/bindings-and-refs/#refs
 */
export function useRef<T extends Instance = Instance>(): Ref<T> {
	return createWorkInProgressHook(() => createRef<T>()).state;
}
