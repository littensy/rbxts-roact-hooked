local hoc = require(script.hoc)
local hooks = require(script.hooks)

return {
	-- HOC
	withHooks = hoc.withHooks,
	withHooksPure = hoc.withHooksPure,

	-- Hooks
	useBinding = hooks.useBinding,
	useCallback = hooks.useCallback,
	useContext = hooks.useContext,
	useEffect = hooks.useEffect,
	useMemo = hooks.useMemo,
	useMutable = hooks.useMutable,
	useReducer = hooks.useReducer,
	useRef = hooks.useRef,
	useState = hooks.useState,
}
