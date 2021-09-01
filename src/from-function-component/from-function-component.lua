local dependencies = {}

function fromFunctionComponent(render, componentType)
    local roact = dependencies.roact
    local prepareHooks = dependencies.prepareHooks
    local resetHooks = dependencies.resetHooks
    local componentClass = componentType:extend(debug.info(render, "n"))

    function componentClass:init()
        componentClass.effects = {}
        componentClass.layoutEffects = {}
        componentClass.effectHandles = {}
    end

    function componentClass:flush(effect)
        if (not effect) then return end
        if self.effectHandles[effect.id] then
            self.effectHandles[effect.id]()
        end
        self.effectHandles[effect.id] = effect.callback()
        flush(effect.next)
    end

    function componentClass:flushLayoutEffects()
        flush(self.layoutEffects.head)
        self.layoutEffects.head = nil
        self.layoutEffects.tail = nil
    end

    function componentClass:flushEffects()
        flush(self.effects.head)
        self.effects.head = nil
        self.effects.tail = nil
        flushLayoutEffects()
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
        flushLayoutEffects()
        return element
    end

    function componentClass:didMount()
        flushEffects()
    end

    function componentClass:didUpdate()
        flushEffects()
    end

    function componentClass:willUnmount()
        cleanupEffects()
        self.effects.head = nil
        self.layoutEffects.head = nil
    end

    return componentClass
end

return {
    dependencies = dependencies,
    fromFunctionComponent = fromFunctionComponent,
}
