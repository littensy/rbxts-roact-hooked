local pureComponents = {}

local function pureComponent(functionComponent)
	pureComponents[functionComponent] = true
	return functionComponent
end

local function isPureComponent(functionComponent)
	return pureComponents[functionComponent]
end

return {
	pureComponent = pureComponent,
	isPureComponent = isPureComponent,
}
