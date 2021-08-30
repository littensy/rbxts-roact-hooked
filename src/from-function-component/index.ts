import { prepareHooks, resetHooks } from "../work-in-progress-hook";
import Roact from "@rbxts/roact";
import helper from "./from-function-component";

helper.dependencies = { Roact, prepareHooks, resetHooks };

export { fromFunctionComponent, FunctionComponent, FunctionComponentConstructor } from "./from-function-component";
