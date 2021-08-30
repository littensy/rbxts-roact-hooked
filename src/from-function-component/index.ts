import { dependencies } from "./from-function-component";
import { prepareHooks, resetHooks } from "../work-in-progress-hook";
import Roact from "@rbxts/roact";

dependencies.Roact = Roact;
dependencies.prepareHooks = prepareHooks;
dependencies.resetHooks = resetHooks;

export { fromFunctionComponent, FunctionComponent } from "./from-function-component";
