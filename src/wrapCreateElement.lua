local hoc = require(script.Parent.hoc)
local hooks = require(script.Parent.hooks)
local pureComponent = require(script.Parent.pureComponent)

local proxyComponents = {}
local statelessComponents = {}

local function wrapCreateElement(Roact)
	local createElement = Roact.createElement

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

		hooks.resetDidUseHooks()

		pcall(component, props)

		if hooks.didComponentUseHooks() then
			-- If the component tried to use hooks, create a proxy component
			local proxyComponent = if pureComponent then hoc.withHooksPure(component) else hoc.withHooks(component)
			proxyComponents[component] = proxyComponent
			return createElement(proxyComponent, props, children)
		else
			-- Mark this component as stateless so we don't have to check it again
			statelessComponents[component] = true
			return createElement(component, props, children)
		end
	end
end

return wrapCreateElement
