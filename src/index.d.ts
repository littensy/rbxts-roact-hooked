import type Roact from "@rbxts/roact";

// HOCs

/**
 * Adds additional behavior to `Roact.createElement`, allowing you to use hooks in your components without
 * having to wrap them in `withHooks` or `withHooksPure`. Can be called multiple times safely.
 *
 * @example
 * withHookDetection(Roact);
 * Roact.mount(<MyComponent />, playerGui);
 */
export declare function withHookDetection(library: typeof Roact): void;

/**
 * Marks a component as a PureComponent to be used by `wrapCreateElement`.
 *
 * @example
 * export default function MyComponent(props: Props) {
 * 	return <frame />;
 * }
 * markPureComponent(MyComponent);
 */
export declare function markPureComponent<T extends FunctionComponent<any>>(Component: T): T;

/**
 * `withHooks` is a [higher-order component](https://reactjs.org/docs/higher-order-components.html) that wraps a
 * Function Component in a [Roact Component](https://roblox.github.io/roact/guide/components/), allowing you to
 * hook into its lifecycle and state.
 *
 * The `api` parameter allows you to manually set values for `defaultProps` and `shouldUpdate`, but it is recommended
 * to use parameter destructuring instead.
 *
 * @example
 * function MyComponent(props: Props) {
 * 	return <frame />;
 * }
 * export default withHooks(MyComponent);
 *
 * @see https://reactjs.org/docs/hooks-intro.html
 */
export declare function withHooks<P = {}>(
	Component: FunctionComponent<P>,
	api?: Partial<ComponentApi<P>>,
): (props: P) => Roact.Element;

/**
 * `withHooksPure` is a [higher-order component](https://reactjs.org/docs/higher-order-components.html) that wraps a
 * Function Component in a [Roact PureComponent](https://roblox.github.io/roact/guide/components/), allowing you to
 * hook into its lifecycle and state.
 *
 * If your function component wrapped in `pure` has a `useState`, `useReducer` or `useContext` hook
 * in its implementation, it will still re-render when the state or context changes.
 *
 * The `api` parameter allows you to manually set values for `defaultProps` and `shouldUpdate`, but it is recommended
 * to use parameter destructuring instead.
 *
 * @example
 * function MyComponent(props: Props) {
 * 	return <frame />;
 * }
 * export default withHooksPure(MyComponent);
 *
 * @see https://reactjs.org/docs/react-api.html
 * @see https://roblox.github.io/roact/performance/reduce-reconciliation/
 */
export declare function withHooksPure<P = {}>(
	Component: FunctionComponent<P>,
	api?: Partial<ComponentApi<P>>,
): (props: P) => Roact.Element;

// Hooks

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
 * @param initialValue - The initial value of the binding
 * @returns A memoized `Binding` object, and a function to update the value of the binding.
 *
 * @see https://roblox.github.io/roact/advanced/bindings-and-refs/#bindings
 */
export declare function useBinding<T>(initialValue: T): LuaTuple<[Roact.Binding<T>, (newValue: T) => void]>;

/**
 * Returns a memoized version of the callback that only changes if one of the dependencies has changed.
 *
 * This is useful when passing callbacks to optimized child components that rely on reference equality to prevent
 * unnecessary renders.
 *
 * `useCallback(fn, deps)` is equivalent to `useMemo(() => fn, deps)`.
 *
 * @example
 * const memoizedCallback = useCallback(
 *   () => {
 *     doSomething(a, b);
 *   },
 *   [a, b],
 * );
 *
 * @param callback - An inline callback
 * @param deps - An array of dependencies
 * @returns A memoized version of the callback
 *
 * @see https://reactjs.org/docs/hooks-reference.html#usecallback
 */
export declare function useCallback<T extends Callback>(callback: T, deps: readonly unknown[]): T;

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
export function useContext<T>(context: RoactContext<T>): T;

/**
 * Accepts a function that contains imperative, possibly effectful code. The function passed to `useEffect` will run
 * synchronously (thread-blocking) after the Roblox Instance is created and rendered.
 *
 * The clean-up function (returned by the effect) runs before the component is removed from the UI to prevent memory
 * leaks. Additionally, if a component renders multiple times, the **previous effect is cleaned up before executing
 * the next effect**.
 *
 *`useEffect` runs in the same phase as `didMount` and `didUpdate`. All cleanup functions are called on `willUnmount`.
 *
 * @example
 * useEffect(() => {
 *   // use value
 *   return () => {}; // cleanup
 * }, [value]);
 *
 * useEffect(() => {
 *   // did update
 * });
 *
 * useEffect(() => {
 *   // did mount
 *   return () => {}; // will unmount
 * }, []);
 *
 * @param callback - Imperative function that can return a cleanup function
 * @param deps - If present, effect will only activate if the values in the list change
 *
 * @see https://reactjs.org/docs/hooks-reference.html#useeffect
 */
export declare function useEffect(callback: () => (() => void) | void, deps?: readonly unknown[]): void;

/**
 * `useMemo` will only recompute the memoized value when one of the `deps` has changed. This optimization helps to
 * avoid expensive calculations on every render.
 *
 * Remember that the function passed to `useMemo` runs during rendering. Don’t do anything there that you wouldn’t
 * normally do while rendering. For example, side effects belong in `useEffect`, not `useMemo`.
 *
 * If no array is provided, a new value will be computed on every render. This is usually a mistake, so `deps` must be
 * explicitly written as `undefined`.
 *
 * @example
 * const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
 *
 * @param factory - A "create" function that computes a value
 * @param deps - An array of dependencies
 * @returns A memoized value
 *
 * @see https://reactjs.org/docs/hooks-reference.html#usememo
 */
export declare function useMemo<T>(factory: () => T, deps: readonly unknown[] | undefined): T;

/**
 * `useMutable` returns a mutable object whose `.current` property is initialized to the argument `initialValue`.
 * The returned object will persist for the full lifetime of the component.
 *
 * `useMutable()` is handy for keeping any mutable value around similar to how you’d use instance fields in classes.
 *
 * This cannot be used as a [Roact Ref](https://roblox.github.io/roact/advanced/bindings-and-refs/#refs). If you want
 * to reference a Roblox Instance, refer to {@link useRef}.
 *
 * @example
 * const container = useMutable(initialValue);
 * useEffect(() => {
 *   container.current = value;
 * });
 *
 * @param initialValue - Initialized as the `.current` property
 * @returns A memoized, mutable object
 *
 * @see https://reactjs.org/docs/hooks-reference.html#useref
 */
export declare function useMutable<T>(initialValue: T): { current: T };
/**
 * `useMutable` returns a mutable object whose `.current` property is initialized to the argument `initialValue`.
 * The returned object will persist for the full lifetime of the component.
 *
 * `useMutable()` is handy for keeping any mutable value around similar to how you’d use instance fields in classes.
 *
 * This cannot be used as a [Roact Ref](https://roblox.github.io/roact/advanced/bindings-and-refs/#refs). If you want
 * to reference a Roblox Instance, refer to {@link useRef}.
 *
 * @example
 * const container = useMutable(initialValue);
 * useEffect(() => {
 *   container.current = value;
 * });
 *
 * @param initialValue - Initialized as the `.current` property
 * @returns A memoized, mutable object
 *
 * @see https://reactjs.org/docs/hooks-reference.html#useref
 */
// convenience overload for refs given as a ref prop as they typically start with a null value
export declare function useMutable<T>(initialValue: T | undefined): { current: T };
/**
 * `useMutable` returns a mutable object whose `.current` property is initialized to the argument `initialValue`.
 * The returned object will persist for the full lifetime of the component.
 *
 * `useMutable()` is handy for keeping any mutable value around similar to how you’d use instance fields in classes.
 *
 * This cannot be used as a [Roact Ref](https://roblox.github.io/roact/advanced/bindings-and-refs/#refs). If you want
 * to reference a Roblox Instance, refer to {@link useRef}.
 *
 * @example
 * const container = useMutable(initialValue);
 * useEffect(() => {
 *   container.current = value;
 * });
 *
 * @returns A memoized, mutable object
 *
 * @see https://reactjs.org/docs/hooks-reference.html#useref
 */
// convenience overload for potentially undefined initialValue / call with 0 arguments
// has a default to stop it from defaulting to {} instead
export declare function useMutable<T = undefined>(): { current?: T };

/**
 * Accepts a reducer of type `(state, action) => newState`, and returns the current state paired with a `dispatch`
 * method.
 *
 * If a new state is the same value as the current state, this will bail out without rerendering the component.
 *
 * `useReducer` is usually preferable to `useState` when you have complex state logic that involves multiple sub-values.
 * It also lets you optimize performance for components that trigger deep updates because [you can pass `dispatch` down
 * instead of callbacks](https://reactjs.org/docs/hooks-faq.html#how-to-avoid-passing-callbacks-down).
 *
 * There are two different ways to initialize `useReducer` state. You can use the initial state as a second argument,
 * or [create the initial state lazily](https://reactjs.org/docs/hooks-reference.html#lazy-initialization). To do this,
 * you can pass an init function as the third argument. The initial state will be set to `initializer(initialArg)`.
 *
 * @param reducer - Function that returns a state given the current state and an action
 * @param initializerArg - State used during the initial render, or passed to `initializer` if provided
 * @param initializer - Optional function that returns an initial state given `initializerArg`
 * @returns The current state, and an action dispatcher
 *
 * @see https://reactjs.org/docs/hooks-reference.html#usereducer
 */
// overload where dispatch could accept 0 arguments.
export declare function useReducer<R extends ReducerWithoutAction<any>, I>(
	reducer: R,
	initializerArg: I,
	initializer: (arg: I) => ReducerStateWithoutAction<R>,
): LuaTuple<[ReducerStateWithoutAction<R>, DispatchWithoutAction]>;
/**
 * Accepts a reducer of type `(state, action) => newState`, and returns the current state paired with a `dispatch`
 * method.
 *
 * If a new state is the same value as the current state, this will bail out without rerendering the component.
 *
 * `useReducer` is usually preferable to `useState` when you have complex state logic that involves multiple sub-values.
 * It also lets you optimize performance for components that trigger deep updates because [you can pass `dispatch` down
 * instead of callbacks](https://reactjs.org/docs/hooks-faq.html#how-to-avoid-passing-callbacks-down).
 *
 * There are two different ways to initialize `useReducer` state. You can use the initial state as a second argument,
 * or [create the initial state lazily](https://reactjs.org/docs/hooks-reference.html#lazy-initialization). To do this,
 * you can pass an init function as the third argument. The initial state will be set to `initializer(initialArg)`.
 *
 * @param reducer - Function that returns a state given the current state and an action
 * @param initializerArg - State used during the initial render, or passed to `initializer` if provided
 * @param initializer - Optional function that returns an initial state given `initializerArg`
 * @returns The current state, and an action dispatcher
 *
 * @see https://reactjs.org/docs/hooks-reference.html#usereducer
 */
// overload where dispatch could accept 0 arguments.
export declare function useReducer<R extends ReducerWithoutAction<any>>(
	reducer: R,
	initializerArg: ReducerStateWithoutAction<R>,
	initializer?: undefined,
): LuaTuple<[ReducerStateWithoutAction<R>, DispatchWithoutAction]>;
/**
 * Accepts a reducer of type `(state, action) => newState`, and returns the current state paired with a `dispatch`
 * method.
 *
 * If a new state is the same value as the current state, this will bail out without rerendering the component.
 *
 * `useReducer` is usually preferable to `useState` when you have complex state logic that involves multiple sub-values.
 * It also lets you optimize performance for components that trigger deep updates because [you can pass `dispatch` down
 * instead of callbacks](https://reactjs.org/docs/hooks-faq.html#how-to-avoid-passing-callbacks-down).
 *
 * There are two different ways to initialize `useReducer` state. You can use the initial state as a second argument,
 * or [create the initial state lazily](https://reactjs.org/docs/hooks-reference.html#lazy-initialization). To do this,
 * you can pass an init function as the third argument. The initial state will be set to `initializer(initialArg)`.
 *
 * @param reducer - Function that returns a state given the current state and an action
 * @param initializerArg - State used during the initial render, or passed to `initializer` if provided
 * @param initializer - Optional function that returns an initial state given `initializerArg`
 * @returns The current state, and an action dispatcher
 *
 * @see https://reactjs.org/docs/hooks-reference.html#usereducer
 */
// overload for free "I"; all goes as long as initializer converts it into "ReducerState<R>".
export declare function useReducer<R extends Reducer<any, any>, I>(
	reducer: R,
	initializerArg: I,
	initializer: (arg: I) => ReducerState<R>,
): LuaTuple<[ReducerState<R>, Dispatch<ReducerAction<R>>]>;
/**
 * Accepts a reducer of type `(state, action) => newState`, and returns the current state paired with a `dispatch`
 * method.
 *
 * If a new state is the same value as the current state, this will bail out without rerendering the component.
 *
 * `useReducer` is usually preferable to `useState` when you have complex state logic that involves multiple sub-values.
 * It also lets you optimize performance for components that trigger deep updates because [you can pass `dispatch` down
 * instead of callbacks](https://reactjs.org/docs/hooks-faq.html#how-to-avoid-passing-callbacks-down).
 *
 * There are two different ways to initialize `useReducer` state. You can use the initial state as a second argument,
 * or [create the initial state lazily](https://reactjs.org/docs/hooks-reference.html#lazy-initialization). To do this,
 * you can pass an init function as the third argument. The initial state will be set to `initializer(initialArg)`.
 *
 * @param reducer - Function that returns a state given the current state and an action
 * @param initializerArg - State used during the initial render, or passed to `initializer` if provided
 * @param initializer - Optional function that returns an initial state given `initializerArg`
 * @returns The current state, and an action dispatcher
 *
 * @see https://reactjs.org/docs/hooks-reference.html#usereducer
 */
// overload where "I" may be a subset of ReducerState<R>; used to provide autocompletion.
// If "I" matches ReducerState<R> exactly then the last overload will allow initializer to be omitted.
export declare function useReducer<R extends Reducer<any, any>, I>(
	reducer: R,
	initializerArg: I & ReducerState<R>,
	initializer?: (arg: I & ReducerState<R>) => ReducerState<R>,
): LuaTuple<[ReducerState<R>, Dispatch<ReducerAction<R>>]>;

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
export declare function useRef<T extends Instance = Instance>(): Roact.Ref<T>;

/**
 * Returns a stateful value, and a function to update it.
 *
 * During the initial render, the returned state (`state`) is the same as the value passed as the first argument
 * (`initialState`).
 *
 * The `setState` function is used to update the state. It always knows the current state, so it's safe to omit from
 * the `useEffect` or `useCallback` dependency lists.
 *
 * If you update a State Hook to the same value as the current state, this will bail out without rerendering the
 * component.
 *
 * @example
 * const [state, setState] = useState(initialState);
 * const [state, setState] = useState(() => someExpensiveComputation());
 * setState(newState);
 * setState((prevState) => prevState + 1)
 *
 * @param initialState - State used during the initial render. Can be a function, which will be executed on initial render
 * @returns A stateful value, and an updater function
 *
 * @see https://reactjs.org/docs/hooks-reference.html#usestate
 */
export declare function useState<S>(
	initialState: S | (() => S),
): LuaTuple<[state: S, setState: Dispatch<SetStateAction<S>>]>;
/**
 * Returns a stateful value, and a function to update it.
 *
 * During the initial render, the returned state (`state`) is the same as the value passed as the first argument
 * (`initialState`).
 *
 * The `setState` function is used to update the state. It always knows the current state, so it's safe to omit from
 * the `useEffect` or `useCallback` dependency lists.
 *
 * If you update a State Hook to the same value as the current state, this will bail out without rerendering the
 * component.
 *
 * @example
 * const [state, setState] = useState(initialState);
 * const [state, setState] = useState(() => someExpensiveComputation());
 * setState(newState);
 * setState((prevState) => prevState + 1)
 *
 * @param initialState - State used during the initial render. Can be a function, which will be executed on initial render
 * @returns A stateful value, and an updater function
 *
 * @see https://reactjs.org/docs/hooks-reference.html#usestate
 */
export declare function useState<S = undefined>(
	initialState?: void,
): LuaTuple<[state: S | undefined, setState: Dispatch<SetStateAction<S | undefined>>]>;

// Types

/**
 * API for extending the functionality of Roact Hooks.
 */
interface ComponentApi<P = {}> {
	defaultProps?: Partial<P>;
	shouldUpdate: (this: ComponentWithProps<P>, nextProps: P) => boolean;
	validateProps: (props: P) => true | LuaTuple<[false, string] | [true]>;
}
/**
 * A Roact Component with a public 'props' field.
 */
export type ComponentWithProps<P = {}, S = {}> = Roact.Component<P, S> & { props: Roact.PropsWithChildren<P> };
/**
 * A Roact function component.
 */
export type FunctionComponent<P = {}> = (props: Roact.PropsWithChildren<P>) => Roact.Element | undefined;
/**
 * A Roact context.
 */
export interface RoactContext<T> {
	Provider: Roact.ComponentConstructor<{
		value: T;
	}>;

	Consumer: Roact.ComponentConstructor<{
		render: (value: T) => Roact.Element | undefined;
	}>;
}
/**
 * Dispatcher function that takes an action and passes it to a reducer.
 */
export type Dispatch<A> = (action: A) => void;
/**
 * Dispatcher function that calls a reducer.
 */
export type DispatchWithoutAction = () => void;
/**
 * Function that returns a new state given the previous state and an action.
 */
export type Reducer<S, A> = (prevState: S, action: A) => S;
/**
 * Infer an Action from a Reducer.
 */
export type ReducerAction<R extends Reducer<any, any>> = R extends Reducer<any, infer A> ? A : never;
/**
 * Infer a State from a Reducer.
 */
export type ReducerState<R extends Reducer<any, any>> = R extends Reducer<infer S, any> ? S : never;
/**
 * Function that returns a new state given the previous state.
 */
export type ReducerWithoutAction<S> = (prevState: S) => S;
/**
 * Infer a State from a Reducer with no Action.
 */
export type ReducerStateWithoutAction<R extends ReducerWithoutAction<any>> = R extends ReducerWithoutAction<infer S>
	? S
	: never;
/**
 * The first parameter of the setState callback.
 */
export type SetStateAction<S> = S | ((prevState: S) => S);
