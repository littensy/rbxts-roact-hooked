import { ComponentWithHooks, ComponentWithHooksConstructor } from "./component-with-hooks";
import Roact from "@rbxts/roact";

function componentWithHooksMixin(ctor: object) {
	for (const [k, v] of pairs(ComponentWithHooks)) {
		ctor[k as never] = v as never;
	}
}

export function withHooks<P = {}>(functionComponent: Roact.FunctionComponent<P>): ComponentWithHooksConstructor<P> {
	abstract class ComponentClass extends Roact.Component {
		// Static fields can be inherited, so 'ComponentClass.render' can access this with no
		// constructor implementation
		static functionComponent = functionComponent;
	}
	componentWithHooksMixin(ComponentClass);
	return ComponentClass as unknown as ComponentWithHooksConstructor<P>;
}

export function withHooksPure<P = {}>(functionComponent: Roact.FunctionComponent<P>): ComponentWithHooksConstructor<P> {
	abstract class ComponentClass extends Roact.PureComponent {
		static functionComponent = functionComponent;
	}
	componentWithHooksMixin(ComponentClass);
	return ComponentClass as unknown as ComponentWithHooksConstructor<P>;
}
