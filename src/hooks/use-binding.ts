import { Binding, createBinding } from "@rbxts/roact";
import { memoizedHook } from "../memoized-hook";

/**
 * `useBinding` returns a memoized *`Binding`*, a special object that Roact automatically unwraps into values. When a
 * binding is updated, Roact will only change the specific properties that are subscribed to it.
 *
 * The first value returned is a `Binding` object, which will typically be passed as a prop to a Roact host component.
 * The second is a function that can be called with a new value to update the binding.
 *
 * @example
 * const [binding, setBindingValue] = useBinding(initialValue);
 *
 * @param initialValue - Initialized as the `.current` property
 * @returns A memoized `Binding` object, and a function to update the value of the binding.
 *
 * @see https://roblox.github.io/roact/advanced/bindings-and-refs/#bindings
 */
export function useBinding<T>(initialValue: T): [Binding<T>, (newValue: T) => void] {
	return memoizedHook(() => {
		const bindingSet: [Binding<T>, (newValue: T) => void] = createBinding(initialValue);
		return bindingSet;
	}).state;
}
