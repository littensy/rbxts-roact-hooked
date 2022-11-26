import Roact from "@rbxts/roact";
import { useState, withHooks } from "@rbxts/roact-hooked";

const Counter = withHooks(
	({ offset = 0 }: { offset?: number }) => {
		const [counter1, setCounter1] = useState(1);
		const [counter2, setCounter2] = useState(() => {
			print("expensive counter2");
			return 10;
		});

		if (counter1 === 5) {
			throw "error";
		}

		return (
			<frame BackgroundTransparency={1} Size={UDim2.fromScale(1, 1)} Position={UDim2.fromScale(0, offset)}>
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
	},
	{ _name: "Counter" } as never,
);

export = (target: Frame) => {
	const handle = Roact.mount(
		<>
			<Counter />
			<Counter offset={0.25} />
		</>,
		target,
		"Counter",
	);

	return () => Roact.unmount(handle);
};
