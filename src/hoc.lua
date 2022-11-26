local Roact = require(script.Parent.Roact)
local hooks = require(script.Parent.hooks)
local prepareToUseHooks = hooks.prepareToUseHooks
local finishHooks = hooks.finishHooks
local commitHookEffectListUpdate = hooks.commitHookEffectListUpdate
local commitHookEffectListUnmount = hooks.commitHookEffectListUnmount

local function withHooksImpl(Component, Class, api)
	local componentName = debug.info(Component, "n") or "Component"
	if componentName == "" then
		componentName = "Component"
	end

	local Proxy = Class:extend(componentName .. " (roact-hooked)")

	Proxy._name = componentName

	function Proxy:render()
		prepareToUseHooks(self)
		local children = Component(self.props)
		finishHooks()
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

	if api and type(api) == "table" then
		for k, v in pairs(api) do
			Proxy[k] = v
		end
	end

	return Proxy
end

local function withHooks(Component, api)
	return withHooksImpl(Component, Roact.Component, api)
end

local function withHooksPure(Component, api)
	return withHooksImpl(Component, Roact.PureComponent, api)
end

return {
	withHooks = withHooks,
	withHooksPure = withHooksPure,
}
