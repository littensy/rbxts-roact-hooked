import { Binding, createBinding } from "@rbxts/roact";
import { useMemo } from "./use-memo";

/**
 * Creates a memoized Roact binding with the given value.
 *
 * @see https://reactjs.org/docs/hooks-reference.html#usecontext
 */
export function useBinding<T>(initialValue: T): [Binding<T>, (newValue: T) => void] {
	return useMemo(() => {
		const [binding, setBinding] = createBinding(initialValue);
		return [binding, setBinding];
	}, []);
}
