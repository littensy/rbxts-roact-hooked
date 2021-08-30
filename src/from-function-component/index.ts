import { prepareHooks, resetHooks } from "../work-in-progress-hook";
import Roact from "@rbxts/roact";
import helper from "./from-function-component";

helper.dependencies.Roact = Roact;
helper.dependencies.prepareHooks = prepareHooks;
helper.dependencies.resetHooks = resetHooks;

export { fromFunctionComponent, FunctionComponent } from "./from-function-component";
