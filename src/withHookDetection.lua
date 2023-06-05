local hoc = require(script.Parent.hoc)
local hooks = require(script.Parent.hooks)
local pureComponent = require(script.Parent.pureComponent)

local proxyComponents = {}
local statelessComponents = {}
local modulesWithHookDetection = {}

local function withHookDetection(Roact, options)
	options = options or {}

	local moduleId = tostring(Roact)
	local createElement = Roact.createElement

	local forcePureComponent = if options.forcePureComponent ~= nil then options.forcePureComponent else false
	local debugMode = if options.debug ~= nil then options.debug else false

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

		hooks.prepareHookTest()

		pcall(component, if props ~= nil then props else {})

		local didUseHooks = hooks.finishHookTest()

		if didUseHooks then
			-- If the component tried to use hooks, create a proxy component
			local proxyComponent

			if pureComponent.isPureComponent(component) or forcePureComponent then
				proxyComponent = hoc.withHooksPure(component)
			else
				proxyComponent = hoc.withHooks(component)
			end

			if debugMode then
				local render = proxyComponent.render

				function proxyComponent:render(...)
					debug.profilebegin(self._name)
					local success, result = pcall(render, self, ...)
					debug.profileend()

					if not success then
						error(result, 2)
					end

					return result
				end
			end

			proxyComponents[component] = proxyComponent

			return createElement(proxyComponent, props, children)
		else
			-- Mark this component as stateless so we don't have to check it again
			statelessComponents[component] = true
			return createElement(component, props, children)
		end
	end

	return Roact
end

return withHookDetection
