import Hooked, { useReducer } from "../index";
import Roact from "@rbxts/roact";

interface State {
	count: number;
}

type Action = { type: "increment" } | { type: "decrement" };

const initialState: State = { count: 0 };

function reducer({ count }: State, { type: actionType }: Action) {
	switch (actionType) {
		case "increment":
			return { count: count + 1 };
		case "decrement":
			return { count: count - 1 };
		default:
			error(`Unknown type: ${actionType}`);
	}
}

const Counter = Hooked.FC(() => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<frame BackgroundTransparency={1} Size={UDim2.fromScale(1, 1)}>
			<uilistlayout
				FillDirection={Enum.FillDirection.Vertical}
				Padding={new UDim(0, 5)}
				SortOrder={Enum.SortOrder.LayoutOrder}
			/>
			<textlabel
				BackgroundTransparency={1}
				Font={Enum.Font.Code}
				LayoutOrder={1}
				Size={new UDim2(1, 0, 0, 38)}
				Text={tostring(state.count)}
				TextColor3={new Color3(0, 1, 0)}
				TextSize={32}
			/>
			<textbutton
				BackgroundColor3={new Color3(1, 0, 0)}
				Font={Enum.Font.Code}
				LayoutOrder={2}
				Size={new UDim2(1, 0, 0, 38)}
				Text={"Increment"}
				TextColor3={new Color3(1, 1, 1)}
				TextScaled={true}
				Event={{
					Activated: () => dispatch({ type: "increment" }),
				}}
			/>
			<textbutton
				BackgroundColor3={new Color3(1, 0, 0)}
				Font={Enum.Font.Code}
				LayoutOrder={3}
				Size={new UDim2(1, 0, 0, 38)}
				Text={"Decrement"}
				TextColor3={new Color3(1, 1, 1)}
				TextScaled={true}
				Event={{
					Activated: () => dispatch({ type: "decrement" }),
				}}
			/>
		</frame>
	);
});

export = (target: Frame) => {
	const handle = Roact.mount(<Counter />, target, "Counter");

	return () => Roact.unmount(handle);
};
