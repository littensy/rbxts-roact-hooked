import type { HookedComponent } from "./hook-component";
import type { LinkedListNode } from "./types";

export interface Hook<S = unknown> extends LinkedListNode<Hook> {
	id: number;
	state: S;
	baseState: S;
}

/**
 * The hook currently running.
 */
let workInProgressHook: Hook | undefined;

/**
 * Reference to a component mid-render.
 */
let currentlyRenderingComponent: HookedComponent | undefined;

/**
 * Returns the currently-rendering component. Throws an error if a component is not mid-render.
 */
export function resolveCurrentComponent(): HookedComponent {
	return (
		currentlyRenderingComponent ||
		error(
			"Invalid hook call. Hooks can only be called inside of the body of a function component." +
				"See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem",
			3,
		)
	);
}

/**
 * Prepares for an upcoming render.
 */
export function prepareHooks(component: HookedComponent) {
	assert(
		currentlyRenderingComponent === undefined,
		"Failed to render function component! (Another function component is rendering)",
	);
	currentlyRenderingComponent = component;
}

/**
 * Cleans up hooks. Must be called after finishing a render!
 */
export function resetHooks(component?: HookedComponent) {
	if (component) {
		assert(
			currentlyRenderingComponent === component,
			"Failed to render function component! (Another function component rendered during process)",
		);
	}
	currentlyRenderingComponent = undefined;
	workInProgressHook = undefined;
}

/**
 * Get or create a new hook. Hooks are memoized for every component. See the original source
 * {@link https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberHooks.new.js#L619 here}.
 *
 * @param initialValue - Returns the initial value for `Hook.state` and `Hook.baseState`.
 */
export function createWorkInProgressHook<S>(initialValue: S | (() => S)): Hook<S> {
	const currentlyRenderingComponent = resolveCurrentComponent();
	const nextWorkInProgressHook = workInProgressHook ? workInProgressHook.next : currentlyRenderingComponent.firstHook;

	if (nextWorkInProgressHook) {
		// The hook has already been created
		workInProgressHook = nextWorkInProgressHook;
	} else {
		// This is a new hook, should be from an initial render
		const state = typeIs(initialValue, "function") ? initialValue() : initialValue;
		const id = workInProgressHook ? workInProgressHook.id + 1 : 0;

		const newHook: Hook<S> = { id, state, baseState: state };

		if (!workInProgressHook) {
			// This is the first hook in the list
			currentlyRenderingComponent.firstHook = workInProgressHook = newHook;
		} else {
			// Append to the end of the list
			workInProgressHook = workInProgressHook.next = newHook;
		}
	}

	return workInProgressHook as Hook<S>;
}
