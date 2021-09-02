import Hooked, { useEffect, useLayoutEffect, useRef } from "../index";
import Roact from "@rbxts/roact";

const Clipboard = Hooked.FC(() => {
	const ref = useRef<TextBox>();

	useEffect(() => {
		const input = ref.getValue();
		if (input) {
			input.CaptureFocus();
			print(input.Parent);
		}
	}, []);

	useLayoutEffect(() => {
		const input = ref.getValue();
		if (input) {
			print(input.Parent);
		}
	}, []);

	return <textbox Ref={ref} Size={new UDim2(1, 0, 1, 0)} Text="Edit me" TextSize={32} />;
});

export = (target: Frame) => {
	const handle = Roact.mount(<Clipboard />, target, "Clipboard");

	return () => Roact.unmount(handle);
};
