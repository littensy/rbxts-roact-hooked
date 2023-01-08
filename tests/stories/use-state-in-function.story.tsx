import Roact from "@rbxts/roact";
import { useState } from "@rbxts/roact-hooked";

function useStateButCooler(initialValue: number) {
	return useState(initialValue);
}

function Counter() {
	const [counter1, setCounter1] = useStateButCooler(5);
	const [counter2, setCounter2] = useStateButCooler(10);

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
				Text={`${counter1}/${counter2}`}
				TextColor3={new Color3(0, 1, 0)}
				TextSize={32}
			/>
			<textbutton
				BackgroundColor3={new Color3(1, 0, 0)}
				Font={Enum.Font.Code}
				LayoutOrder={2}
				Size={new UDim2(1, 0, 0, 38)}
				Text={"Increase counter 1"}
				TextColor3={new Color3(1, 1, 1)}
				TextScaled={true}
				Event={{
					Activated: () => setCounter1((counter) => counter + 1),
				}}
			/>
			<textbutton
				BackgroundColor3={new Color3(1, 0, 0)}
				Font={Enum.Font.Code}
				LayoutOrder={3}
				Size={new UDim2(1, 0, 0, 38)}
				Text={"Increase counter 2"}
				TextColor3={new Color3(1, 1, 1)}
				TextScaled={true}
				Event={{
					Activated: () => setCounter2(counter2 + 1),
				}}
			/>
		</frame>
	);
}

export = (target: Frame) => {
	const handle = Roact.mount(<Counter />, target, "Counter");

	return () => Roact.unmount(handle);
};
