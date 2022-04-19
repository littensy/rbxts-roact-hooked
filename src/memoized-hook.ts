import { LinkedListNode } from "./types";
import { resolve } from "./utils/resolve";
import type { ComponentWithHooks } from "./with-hooks";

const EXCEPTION_INVALID_HOOK_CALL = [
	"Invalid hook call. Hooks can only be called inside of the body of a function component.",
	"This is usually the result of conflicting versions of roact-hooked.",
	"See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.",
].join("\n");
const EXCEPTION_RENDER_NOT_DONE = "Failed to render hook! (Another hooked component is rendering)";
const EXCEPTION_RENDER_OVERLAP = "Failed to render hook! (Another hooked component rendered during this one)";

export interface Hook<S = unknown> extends LinkedListNode<Hook> {
	id: number;
	state: S;
	baseState: S;
}

let currentHook: Hook | undefined;
let currentlyRenderingComponent: ComponentWithHooks | undefined;

/**
 * Prepares for an upcoming render.
 */
export function renderReady(component: ComponentWithHooks) {
	assert(currentlyRenderingComponent === undefined, EXCEPTION_RENDER_NOT_DONE);
	currentlyRenderingComponent = component;
}

/**
 * Cleans up hooks. Must be called after finishing a render!
 */
export function renderDone(component: ComponentWithHooks) {
	assert(currentlyRenderingComponent === component, EXCEPTION_RENDER_OVERLAP);
	currentlyRenderingComponent = undefined;
	currentHook = undefined;
}

/**
 * Returns the currently-rendering component. Throws an error if a component is not mid-render.
 */
export function resolveCurrentComponent(): ComponentWithHooks {
	return currentlyRenderingComponent || error(EXCEPTION_INVALID_HOOK_CALL, 3);
}

/**
 * Gets or creates a new hook. Hooks are memoized for every component. See the original source
 * {@link https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberHooks.new.js#L619 here}.
 *
 * @param initialValue - Initial value for `Hook.state` and `Hook.baseState`.
 */
export function memoizedHook<S>(initialValue: S | (() => S)): Hook<S> {
	const currentlyRenderingComponent = resolveCurrentComponent();

	let nextHook: Hook | undefined;
	if (currentHook) {
		nextHook = currentHook.next;
	} else {
		nextHook = currentlyRenderingComponent.firstHook;
	}

	if (nextHook) {
		// The hook has already been created
		currentHook = nextHook;
	} else {
		// This is a new hook, should be from an initial render
		const state = resolve(initialValue);

		const newHook: Hook<S> = {
			id: currentHook ? currentHook.id + 1 : 0,
			state,
			baseState: state,
		};

		if (!currentHook) {
			// This is the first hook in the list
			currentlyRenderingComponent.firstHook = currentHook = newHook;
		} else {
			// Append to the end of the list
			currentHook = currentHook.next = newHook;
		}
	}

	return currentHook as Hook<S>;
}
