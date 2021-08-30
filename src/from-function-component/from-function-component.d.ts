import type { Effect, FC, FunctionComponentConstructor, LayoutEffect, LinkedList } from "../index";
import type { Hook, prepareHooks, resetHooks } from "../work-in-progress-hook";
import type Roact from "@rbxts/roact";

export = FromFunctionComponent;
export as namespace FromFunctionComponent;

// Main functions
declare namespace FromFunctionComponent {
	const dependencies: {
		Roact: typeof Roact;
		prepareHooks: typeof prepareHooks;
		resetHooks: typeof resetHooks;
	};

	function fromFunctionComponent<P = {}>(
		render: FC<P>,
		componentType: typeof Roact.Component,
	): FunctionComponentConstructor<P>;
}

// Function Component
declare namespace FromFunctionComponent {
	interface FunctionComponentState {
		[id: number]: unknown;
	}

	interface FunctionComponent<P = {}> extends Roact.Component<P, FunctionComponentState> {
		/**
		 * The first hook in the linked list.
		 */
		firstHook?: Hook;

		/**
		 * A linked list of effects.
		 */
		readonly effects: LinkedList<Effect>;

		/**
		 * A linked list of layout effects.
		 */
		readonly layoutEffects: LinkedList<LayoutEffect>;

		/**
		 * Sets the memoized state of a hook. Calls the updater function with the current state.
		 *
		 * @param id - The numerical id of the hook.
		 * @param reducer - Returns a new state from the current state.
		 */
		setHookState<T>(id: number, reducer: (currentState: T) => T): void;

		/**
		 * Sets up hooks & calls the render function passed to `create`.
		 */
		render(): Roact.Element;
	}
}
