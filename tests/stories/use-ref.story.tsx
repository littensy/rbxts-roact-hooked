import { hooked, useEffect, useRef } from "@rbxts/roact-hooked";
import Roact from "@rbxts/roact";

const Clipboard = hooked(() => {
	const ref = useRef<TextBox>();

	useEffect(() => {
		const input = ref.getValue();
		if (input) {
			input.CaptureFocus();
			print(input.Parent);
		}
	}, []);

	return <textbox Ref={ref} Size={new UDim2(1, 0, 1, 0)} Text="Edit me" TextSize={32} />;
});

export = (target: Frame) => {
	const handle = Roact.mount(<Clipboard />, target, "Clipboard");

	return () => Roact.unmount(handle);
};
