local dependencies = {}

function fromFunctionComponent(render, componentType)
    local roact = dependencies.roact
    local prepareHooks = dependencies.prepareHooks
    local resetHooks = dependencies.resetHooks
    local componentClass = componentType:extend(debug.info(render, "n"))

    function componentClass:init()
        self.effects = {}
        self.effectHandles = {}
    end

    function componentClass:flush(effect)
        if (not effect) then return end
        if self.effectHandles[effect.id] then
            self.effectHandles[effect.id]()
        end
        self.effectHandles[effect.id] = effect.callback()
        self:flush(effect.next)
    end

    function componentClass:flushEffects()
        self:flush(self.effects.head)
        self.effects.head = nil
        self.effects.tail = nil
    end

    function componentClass:cleanupEffects()
        for _, cleanup in pairs(self.effectHandles) do
            cleanup()
        end
        table.clear(self.effectHandles)
    end

    function componentClass:setHookState(id, reducer)
        self:setState(function (currentState)
            return { [id] = reducer(currentState[id]) }
        end)
    end

    function componentClass:render()
        prepareHooks(self)
        local element = render(self.props)
        resetHooks(self)
        return element
    end

    function componentClass:didMount()
        self:flushEffects()
    end

    function componentClass:didUpdate()
        self:flushEffects()
    end

    function componentClass:willUnmount()
        self:cleanupEffects()
        self.effects.head = nil
    end

    return componentClass
end

return {
    dependencies = dependencies,
    fromFunctionComponent = fromFunctionComponent,
}
