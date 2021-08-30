local dependencies = {}

function fromFunctionComponent(render, componentType)
    local roact = dependencies.roact
    local prepareHooks = dependencies.prepareHooks
    local resetHooks = dependencies.resetHooks
    local componentClass = componentType:extend(debug.info(render, "n"))

    local effects, layoutEffects, effectHandles = {}, {}, {}

    componentClass.effects = effects
    componentClass.layoutEffects = layoutEffects
    componentClass.effectHandles = effectHandles

    local function flush(effect)
        if (not effect) then return end
        if effectHandles[effect.id] then
            effectHandles[effect.id]()
        end
        effectHandles[effect.id] = effect.callback()
        flush(effect.next)
    end

    local function flushLayoutEffects()
        flush(layoutEffects.head)
        layoutEffects.head = nil
        layoutEffects.tail = nil
    end

    local function flushEffects()
        flush(effects.head)
        effects.head = nil
        effects.tail = nil
        flushLayoutEffects()
    end

    local function cleanupEffects()
        for _, cleanup in pairs(effectHandles) do
            cleanup()
        end
        table.clear(effectHandles)
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
        effects.head = nil
        layoutEffects.head = nil
    end

    return componentClass
end

return {
    dependencies = dependencies,
    fromFunctionComponent = fromFunctionComponent,
}
