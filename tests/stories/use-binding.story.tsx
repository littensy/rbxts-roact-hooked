import Roact from "@rbxts/roact";
import { useBinding, useEffect, withHookDetection } from "@rbxts/roact-hooked";

const RunService = game.GetService("RunService");

function Stopwatch() {
	const [timer, setTimer] = useBinding(0);

	useEffect(() => {
		const connection = RunService.Heartbeat.Connect((step) => setTimer(timer.getValue() + step));

		return () => {
			connection.Disconnect();
		};
	});

	return (
		<textlabel
			Size={new UDim2(1, 0, 1, 0)}
			Text={timer.map((time) => `Time: ${"%.02f".format(time)}`)}
			TextSize={32}
		/>
	);
}

export = (target: Frame) => {
	withHookDetection(Roact);

	const handle = Roact.mount(<Stopwatch />, target, "Stopwatch");

	return () => Roact.unmount(handle);
};
