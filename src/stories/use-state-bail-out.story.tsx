import Hooked, { useEffect, useState } from "../index";
import Roact from "@rbxts/roact";

const Counter = Hooked.FC(() => {
	const [state, setState] = useState(1);

	print("This number should not repeat: " + state);

	useEffect(() => {
		print("Starting setstate spam");
		setState(state);
		setState(state);
		setState(state);
		const promise = Promise.delay(0.25).then(() => {
			setState(2);
			setState(2);
			setState(2);
		});
		return () => promise.cancel();
	}, []);

	return <frame BackgroundTransparency={1} Size={UDim2.fromScale(1, 1)} BackgroundColor3={new Color3()} />;
});

export = (target: Frame) => {
	const handle = Roact.mount(<Counter />, target, "Counter");

	return () => Roact.unmount(handle);
};
