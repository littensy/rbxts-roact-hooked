import Roact from "@rbxts/roact";
import { useEffect, useState, withHooks } from "@rbxts/roact-hooked";

const PrintingButton = withHooks(() => {
	const [counter, setCounter] = useState(0);
	const [lonerCounter, setLonerCounter] = useState(0);

	useEffect(() => {
		print("didUpdate, counter:", counter);
		return () => print("willUpdate / willUnmount");
	});

	useEffect(() => {
		print("didUpdate [lonerCounter], lonerCounter:", lonerCounter);
		return () => print("willUpdate / willUnmount [lonerCounter]");
	}, [lonerCounter]);

	useEffect(() => {
		print("didMount");
	}, []);

	return (
		<frame BackgroundTransparency={1} Size={new UDim2(1, 0, 1, 0)}>
			<uilistlayout
				FillDirection={Enum.FillDirection.Vertical}
				Padding={new UDim(0, 5)}
				SortOrder={Enum.SortOrder.LayoutOrder}
			/>
			<textbutton
				Key="Counter"
				BackgroundColor3={new Color3(0, 0, 0)}
				Font={Enum.Font.Code}
				LayoutOrder={1}
				Size={new UDim2(1, 0, 0, 38)}
				Text={"Click me and I'll print!"}
				TextColor3={new Color3(1, 1, 1)}
				TextScaled={true}
				Event={{
					Activated: () => setCounter(counter + 1),
				}}
			/>
			<textbutton
				Key="LonerCounter"
				BackgroundColor3={new Color3(0, 0, 0)}
				Font={Enum.Font.Code}
				LayoutOrder={2}
				Size={new UDim2(1, 0, 0, 38)}
				Text={"Something depends on me..."}
				TextColor3={new Color3(1, 1, 1)}
				TextScaled={true}
				Event={{
					Activated: () => setLonerCounter(lonerCounter + 1),
				}}
			/>
		</frame>
	);
});

export = (target: Frame) => {
	const handle = Roact.mount(<PrintingButton />, target, "Component");

	return () => Roact.unmount(handle);
};
