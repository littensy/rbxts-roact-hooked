local hoc = require(script.Parent.hoc)
local hooks = require(script.Parent.hooks)
local pureComponent = require(script.Parent.pureComponent)

local proxyComponents = {}
local statelessComponents = {}
local modulesWithHookDetection = {}

local function withHookDetection(Roact)
	local moduleId = tostring(Roact)
	local createElement = Roact.createElement

	if modulesWithHookDetection[moduleId] then
		return
	end

	modulesWithHookDetection[moduleId] = true

	function Roact.createElement(component, props, children)
		if type(component) ~= "function" or statelessComponents[component] then
			return createElement(component, props, children)
		end

		if proxyComponents[component] then
			-- The proxy for this component has already been created
			return createElement(proxyComponents[component], props, children)
		end

		if props == nil then
			props = {}
		end

		hooks.prepareHookTest()

		pcall(component, props)

		local didUseHooks = hooks.finishHookTest()

		if didUseHooks then
			-- If the component tried to use hooks, create a proxy component
			local proxyComponent

			if pureComponent.isPureComponent(component) then
				proxyComponent = hoc.withHooksPure(component)
			else
				proxyComponent = hoc.withHooks(component)
			end

			proxyComponents[component] = proxyComponent

			return createElement(proxyComponent, props, children)
		else
			-- Mark this component as stateless so we don't have to check it again
			statelessComponents[component] = true
			return createElement(component, props, children)
		end
	end
end

return withHookDetection
