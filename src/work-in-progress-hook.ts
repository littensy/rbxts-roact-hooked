import type { FunctionComponent } from "./from-function-component";
import type { LinkedListNode } from "./index";

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
let currentlyRenderingComponent: FunctionComponent | undefined;

/**
 * Returns the currently-rendering component. Throws an error if a component is not mid-render.
 */
export function resolveCurrentComponent(): FunctionComponent {
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
export function prepareHooks(component: FunctionComponent) {
	assert(
		currentlyRenderingComponent === undefined,
		"Failed to render function component! (Another function component is rendering)",
	);
	currentlyRenderingComponent = component;
}

/**
 * Cleans up hooks. Must be called after finishing a render!
 */
export function resetHooks(component?: FunctionComponent) {
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
 * @param create - Returns the initial value for `Hook.state` and `Hook.baseState`.
 */
export function createWorkInProgressHook<S>(create: S | (() => S)): Hook<S> {
	const currentlyRenderingComponent = resolveCurrentComponent();

	let nextWorkInProgressHook: undefined | Hook;
	if (!workInProgressHook) {
		nextWorkInProgressHook = currentlyRenderingComponent.firstHook;
	} else {
		nextWorkInProgressHook = workInProgressHook.next;
	}

	if (nextWorkInProgressHook) {
		// There's already a work-in-progress. Reuse it.
		workInProgressHook = nextWorkInProgressHook;
	} else {
		const initialValue = typeIs(create, "function") ? create() : create;

		const newHook: Hook<S> = {
			id: workInProgressHook ? workInProgressHook.id + 1 : 0,
			state: initialValue,
			baseState: initialValue,
		};

		if (workInProgressHook === undefined) {
			// This is the first hook in the list.
			currentlyRenderingComponent.firstHook = workInProgressHook = newHook;
		} else {
			// Append to the end of the list.
			workInProgressHook = workInProgressHook.next = newHook;
		}
	}

	return workInProgressHook as Hook<S>;
}
