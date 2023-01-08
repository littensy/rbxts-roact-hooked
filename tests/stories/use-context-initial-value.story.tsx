import Roact from "@rbxts/roact";
import { useContext, useState, withHookDetection } from "@rbxts/roact-hooked";

const CounterContext = Roact.createContext({ counter: -1, increment: () => {} });

function Consumer(props: { offset: number }) {
	const counter = useContext(CounterContext);

	return (
		<frame BackgroundTransparency={1} Size={new UDim2(1, 0, 1, 0)} Position={new UDim2(0, 0, 0, props.offset ?? 0)}>
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
				Text={`${counter.counter}`}
				TextColor3={new Color3(0, 1, 0)}
				TextSize={32}
			/>
			<textbutton
				BackgroundColor3={new Color3(1, 0, 0)}
				Font={Enum.Font.Code}
				LayoutOrder={2}
				Size={new UDim2(1, 0, 0, 38)}
				Text={"Increase counter"}
				TextColor3={new Color3(1, 1, 1)}
				TextScaled={true}
				Event={{
					Activated: () => counter.increment(),
				}}
			/>
		</frame>
	);
}

function App() {
	const [counter, setCounter] = useState(5);

	return (
		<>
			<CounterContext.Provider
				value={{
					counter,
					increment: () => setCounter(counter + 1),
				}}
			>
				<Consumer offset={0} />
			</CounterContext.Provider>

			<Consumer offset={150} />
		</>
	);
}

export = (target: Frame) => {
	withHookDetection(Roact);

	const handle = Roact.mount(<App />, target, "Component");

	return () => Roact.unmount(handle);
};
