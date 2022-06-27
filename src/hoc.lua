local Roact = require(script.Parent.Roact)
local hooks = require(script.Parent.hooks)
local prepareToUseHooks = hooks.prepareToUseHooks
local finishHooks = hooks.finishHooks
local commitHookEffectListUpdate = hooks.commitHookEffectListUpdate
local commitHookEffectListUnmount = hooks.commitHookEffectListUnmount

local function withHooksImpl(Component, Superclass)
	local componentName = debug.info(Component, "n") or "Component"

	local Proxy = Superclass:extend("withHooks(" .. componentName .. ")")

	function Proxy:render()
		prepareToUseHooks(self)
		local children = Component(self.props)
		finishHooks(self)
		return children
	end

	function Proxy:didMount()
		commitHookEffectListUpdate(self)
	end

	function Proxy:didUpdate()
		commitHookEffectListUpdate(self)
	end

	function Proxy:willUnmount()
		commitHookEffectListUnmount(self)
	end

	return Proxy
end

local function withHooks(Component)
	return withHooksImpl(Component, Roact.Component)
end

local function withHooksPure(Component)
	return withHooksImpl(Component, Roact.PureComponent)
end

return {
	withHooks = withHooks,
	withHooksPure = withHooksPure,
}
