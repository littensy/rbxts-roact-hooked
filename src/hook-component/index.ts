import { dependencies } from "./hook-component";
import { prepareHooks, resetHooks } from "../work-in-progress-hook";
import Roact from "@rbxts/roact";

// Provide dependencies
[dependencies.Roact, dependencies.prepareHooks, dependencies.resetHooks] = [Roact, prepareHooks, resetHooks];

export { hookComponent, HookedComponent } from "./hook-component";
