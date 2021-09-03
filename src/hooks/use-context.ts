/**
 * @see https://github.com/Kampfkarren/roact-hooks/blob/main/src/createUseContext.lua
 */

import { createWorkInProgressHook, resolveCurrentComponent } from "../work-in-progress-hook";
import { useEffect } from "./use-effect";
import { useState } from "./use-state";
import Roact from "@rbxts/roact";
import type { Destructor, RoactContext } from "../types";

interface ContextInternal<T> {
	Provider: Roact.ComponentConstructor<{
		value: T;
	}>;
	Consumer: ConsumerConstructor<T>;
	defaultValue: T;
}

interface ConsumerConstructor<T>
	extends Roact.ComponentConstructor<{
		render: (value: T) => Roact.Element | undefined;
	}> {
	contextEntry: ContextEntry<T>;
	init: (self: ConsumerConstructor<T>, props?: Roact.Component) => void;
}

interface ContextEntry<T> {
	value: T;
	onUpdate: {
		subscribe(listener: (newValue: T) => void): Destructor;
	};
}

function copyComponent<T>(component: Roact.Component) {
	return setmetatable({}, { __index: component as never }) as ConsumerConstructor<T>;
}

/**
 * Accepts a context object (the value returned from `Roact.createContext`) and returns the current context value, as
 * given by the nearest context provider for the given context.
 *
 * When the nearest `Context.Provider` above the component updates, this Hook will trigger a rerender with the latest
 * context value.
 *
 * If there is no Provider, `useContext` returns the default value of the context.
 *
 * @param context - The Context object to read from
 * @returns The latest context value of the nearest Provider
 *
 * @see https://reactjs.org/docs/hooks-reference.html#usecontext
 */
export function useContext<T>(context: RoactContext<T>): T {
	const thisContext = context as ContextInternal<T>;

	const { state: contextEntry } = createWorkInProgressHook(() => {
		const consumer = copyComponent<T>(resolveCurrentComponent());
		thisContext.Consumer.init(consumer);
		return consumer.contextEntry;
	});

	if (contextEntry) {
		const [value, setValue] = useState(contextEntry.value);
		useEffect(() => contextEntry.onUpdate.subscribe(setValue), []);
		return value;
	} else {
		return thisContext.defaultValue;
	}
}
