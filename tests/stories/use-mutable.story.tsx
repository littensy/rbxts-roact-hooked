import Roact from "@rbxts/roact";
import { useEffect, useMutable, useState, withHooks } from "@rbxts/roact-hooked";

const WorldsWorstStopwatch = withHooks(() => {
	const [updater, setUpdater] = useState(0);
	const stopwatch = useMutable(0);

	useEffect(() => {
		const connection = game.GetService("RunService").Heartbeat.Connect((step) => (stopwatch.current += step));

		return () => connection.Disconnect();
	});

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
				Text={"The stopwatch is at " + stopwatch.current}
				TextColor3={new Color3(0, 1, 0)}
				TextSize={32}
			/>
			<textbutton
				BackgroundColor3={new Color3(1, 0, 0)}
				Font={Enum.Font.Code}
				LayoutOrder={3}
				Size={new UDim2(1, 0, 0, 38)}
				Text={"Check new time"}
				TextColor3={new Color3(1, 1, 1)}
				TextScaled={true}
				Event={{
					Activated: () => setUpdater(updater + 1),
				}}
			/>
		</frame>
	);
});

export = (target: Frame) => {
	const handle = Roact.mount(<WorldsWorstStopwatch />, target, "WorldsWorstClock");

	return () => Roact.unmount(handle);
};
