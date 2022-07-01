-- https://github.com/facebook/react/blob/main/packages/react-dom/src/server/ReactPartialRendererHooks.js
-- https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberHooks.new.js

local Roact = require(script.Parent.Roact)

local currentlyRenderingComponent
local hookCount = 0
local workInProgressHook

local isReRender

local function finishHooks()
	currentlyRenderingComponent = nil
	hookCount = 0
	workInProgressHook = nil
end

local function prepareToUseHooks(componentIdentity)
	currentlyRenderingComponent = componentIdentity

	if workInProgressHook ~= nil then
		warn("A component failed to fully unmount before rendering a new one.")
		finishHooks()
	end
end

local function resolveCurrentlyRenderingComponent()
	if not currentlyRenderingComponent then
		error(
			'Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n' ..
			'1. You might have mismatching versions of React and the renderer (such as React DOM)\n' ..
			'2. You might be breaking the Rules of Hooks\n' ..
			'3. You might have more than one copy of React in the same app\n' ..
			'See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.'
		)
	end

	return currentlyRenderingComponent
end

local function areHookInputsEqual(nextDeps, prevDeps)
	if not prevDeps then
		return false
	end

	if type(nextDeps) ~= type(prevDeps) then
		return false
	end

	if type(nextDeps) == "table" then
		for key, value in pairs(nextDeps) do
			if prevDeps[key] ~= value then
				return false
			end
		end

		for key, value in pairs(prevDeps) do
			if nextDeps[key] ~= value then
				return false
			end
		end

		return true
	end

	return nextDeps == prevDeps
end

local function createHook()
	return {
		memoizedState = nil,
		next = nil,
		index = hookCount,
	}
end

local function createWorkInProgressHook()
	hookCount += 1

	if not workInProgressHook then
		-- This is the first hook in the list
		if not currentlyRenderingComponent.firstHook then
			-- The component is being mounted. Create a new hook.
			isReRender = false

			local hook = createHook()
			currentlyRenderingComponent.firstHook = hook
			workInProgressHook = hook
		else
			-- The component is being re-rendered. Reuse the first hook.
			isReRender = true
			workInProgressHook = currentlyRenderingComponent.firstHook
		end
	else
		if not workInProgressHook.next then
			isReRender = false

			-- Append to the end of the list
			local hook = createHook()
			workInProgressHook.next = hook
			workInProgressHook = hook
		else
			isReRender = true
			workInProgressHook = workInProgressHook.next
		end
	end

	return workInProgressHook
end

local function commitHookEffectListUpdate(componentIdentity)
	local lastEffect = componentIdentity.lastEffect

	if not lastEffect then
		return
	end

	local firstEffect = lastEffect.next
	local effect = firstEffect

	repeat
		if effect.prevDeps and areHookInputsEqual(effect.deps, effect.prevDeps) then
			-- Nothing changed
			effect = effect.next
			continue
		end

		-- Clear
		local destroy = effect.destroy
		effect.destroy = nil

		if destroy then
			task.spawn(destroy)
		end

		-- Update
		task.spawn(function()
			effect.destroy = effect.create()
		end)

		effect = effect.next
	until effect == firstEffect
end

local function commitHookEffectListUnmount(componentIdentity)
	local lastEffect = componentIdentity.lastEffect

	if not lastEffect then
		return
	end

	local firstEffect = lastEffect.next
	local effect = firstEffect

	repeat
		-- Clear
		local destroy = effect.destroy
		effect.destroy = nil

		if destroy then
			task.spawn(destroy)
		end

		effect = effect.next
	until effect == firstEffect
end

local function pushEffect(create, destroy, deps)
	resolveCurrentlyRenderingComponent()

	local effect = {
		create = create,
		destroy = destroy,
		deps = deps,
		prevDeps = nil,
		next = nil,
	}

	local lastEffect = currentlyRenderingComponent.lastEffect

	if lastEffect then
		local firstEffect = lastEffect.next
		lastEffect.next = effect
		effect.next = firstEffect
		currentlyRenderingComponent.lastEffect = effect
	else
		effect.next = effect
		currentlyRenderingComponent.lastEffect = effect
	end

	return effect
end

local function useEffect(create, deps)
	resolveCurrentlyRenderingComponent()

	local hook = createWorkInProgressHook()
	
	if not isReRender then
		hook.memoizedState = pushEffect(create, nil, deps)
	else
		hook.memoizedState.prevDeps = hook.memoizedState.deps
		hook.memoizedState.deps = deps
		hook.memoizedState.create = create
	end
end

local function basicStateReducer(state, action)
	if type(action) == "function" then
		return action(state)
	else
		return action
	end
end

local function useReducer(reducer, initialArg, init)
	local component = resolveCurrentlyRenderingComponent()
	local hook = createWorkInProgressHook()

	-- Mount
	if not isReRender then
		local initialState

		if reducer == basicStateReducer then
			-- Special case for `useState`.
			if type(initialArg) == "function" then
				initialState = initialArg()
			else
				initialState = initialArg
			end
		else
			if init then
				initialState = init(initialArg)
			else
				initialState = initialArg
			end
		end

		local function dispatch(action)
			local nextState = reducer(hook.memoizedState.state, action)

			if nextState == hook.memoizedState.state then
				return
			end

			hook.memoizedState.state = nextState

			component:setState({
				[hook.index] = nextState,
			})

			return nextState
		end

		hook.memoizedState = {
			dispatch = dispatch,
			state = initialState,
		}
	end

	return hook.memoizedState.state, hook.memoizedState.dispatch
end

local function useState(initialState)
	-- Use useReducer's special case for `useState`.
	return useReducer(basicStateReducer, initialState)
end

local function useMemo(create, deps)
	resolveCurrentlyRenderingComponent()

	local hook = createWorkInProgressHook()
	local prevState = hook.memoizedState

	if prevState ~= nil and deps ~= nil and areHookInputsEqual(deps, prevState.deps) then
		return prevState.value
	end

	local value = create()
	hook.memoizedState = { value = value, deps = deps }

	return value
end

local function useCallback(callback, deps)
	return useMemo(function()
		return callback
	end, deps)
end

local function useMutable(initialValue)
	resolveCurrentlyRenderingComponent()

	local hook = createWorkInProgressHook()

	if not isReRender then
		hook.memoizedState = { current = initialValue }
	end

	return hook.memoizedState
end

local function useRef()
	resolveCurrentlyRenderingComponent()

	local hook = createWorkInProgressHook()

	if not isReRender then
		hook.memoizedState = Roact.createRef()
	end

	return hook.memoizedState
end

local function useBinding(initialValue)
	resolveCurrentlyRenderingComponent()
	
	local hook = createWorkInProgressHook()

	if not isReRender then
		local binding, setValue = Roact.createBinding(initialValue)
		hook.memoizedState = { binding = binding, setValue = setValue }
	end

	return hook.memoizedState.binding, hook.memoizedState.setValue
end

local function useContext(context)
	resolveCurrentlyRenderingComponent()

	local hook = createWorkInProgressHook()

	if not isReRender then
		local consumer = setmetatable({}, { __index = currentlyRenderingComponent })
		context.Consumer.init(consumer)
		hook.memoizedState = consumer.contextEntry
	end

	local contextEntry = hook.memoizedState
	local value, setValue = useState(contextEntry and contextEntry.value)

	useEffect(function()
		return contextEntry.onUpdate:subscribe(setValue)
	end, {})

	return value
end

return {
	-- Hooks
	useBinding = useBinding,
	useCallback = useCallback,
	useContext = useContext,
	useEffect = useEffect,
	useMemo = useMemo,
	useMutable = useMutable,
	useReducer = useReducer,
	useRef = useRef,
	useState = useState,

	-- Internal API
	commitHookEffectListUpdate = commitHookEffectListUpdate,
	commitHookEffectListUnmount = commitHookEffectListUnmount,
	prepareToUseHooks = prepareToUseHooks,
	finishHooks = finishHooks,
}
