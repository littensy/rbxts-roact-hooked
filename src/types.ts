import type Roact from "@rbxts/roact";

export = Hooked;

// Roact
declare namespace Hooked {
	/**
	 * A Roact Context
	 */
	interface RoactContext<T> {
		Provider: Roact.ComponentConstructor<{
			value: T;
		}>;
		Consumer: Roact.ComponentConstructor<{
			render: (value: T) => Roact.Element | undefined;
		}>;
	}
}

// Reducers
declare namespace Hooked {
	/**
	 * Dispatcher function that takes an action and passes it to a reducer.
	 */
	type Dispatch<A> = (action: A) => void;
	/**
	 * Dispatcher function that calls a reducer.
	 */
	type DispatchWithoutAction = () => void;
	/**
	 * Function that returns a new state given the previous state and an action.
	 */
	type Reducer<S, A> = (prevState: S, action: A) => S;
	/**
	 * Infer an Action from a Reducer.
	 */
	type ReducerAction<R extends Reducer<any, any>> = R extends Reducer<any, infer A> ? A : never;
	/**
	 * Infer a State from a Reducer.
	 */
	type ReducerState<R extends Reducer<any, any>> = R extends Reducer<infer S, any> ? S : never;
	/**
	 * Function that returns a new state given the previous state.
	 */
	type ReducerWithoutAction<S> = (prevState: S) => S;
	/**
	 * Infer a State from a Reducer with no Action.
	 */
	type ReducerStateWithoutAction<R extends ReducerWithoutAction<any>> = R extends ReducerWithoutAction<infer S>
		? S
		: never;
}

// Utility types
declare namespace Hooked {
	export interface LinkedList<T extends LinkedListNode<any>> {
		head?: T;
		tail?: T;
	}

	export interface LinkedListNode<T> {
		next?: T;
	}
}

// Hooks
declare namespace Hooked {
	type Destructor = () => void;

	type EffectCallback = () => void | Destructor;

	interface Effect extends LinkedListNode<Effect> {
		id: number;
		callback: EffectCallback;
		deps?: DependencyList;
	}

	type DependencyList = ReadonlyArray<unknown>;
}
