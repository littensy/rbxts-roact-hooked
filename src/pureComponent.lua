local pureComponents = {}

local function markPureComponent(functionComponent)
	pureComponents[functionComponent] = true
	return functionComponent
end

local function isPureComponent(functionComponent)
	return pureComponents[functionComponent]
end

return {
	markPureComponent = markPureComponent,
	isPureComponent = isPureComponent,
}
