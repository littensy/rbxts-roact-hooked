import Hooked, { useContext, useState } from "../index";
import Roact from "@rbxts/roact";

const CounterContext1 = Roact.createContext<{ counter: number; increment: () => void }>(undefined!);
const CounterContext2 = Roact.createContext<{ counter: number; increment: () => void }>(undefined!);

const Consumer = Hooked.FC(() => {
	const counter1 = useContext(CounterContext1);
	const counter2 = useContext(CounterContext2);

	return (
		<frame BackgroundTransparency={1} Size={new UDim2(1, 0, 1, 0)}>
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
				Text={`${counter1.counter}/${counter2.counter}`}
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
					Activated: () => counter1.increment(),
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
					Activated: () => counter2.increment(),
				}}
			/>
		</frame>
	);
});

const App = Hooked.FC(() => {
	const [counter1, setCounter1] = useState(5);
	const [counter2, setCounter2] = useState(5);

	return (
		<CounterContext1.Provider
			value={{
				counter: counter1,
				increment: () => setCounter1(counter1 + 1),
			}}
		>
			<CounterContext2.Provider
				value={{
					counter: counter2,
					increment: () => setCounter2(counter2 + 1),
				}}
			>
				<Consumer />
			</CounterContext2.Provider>
		</CounterContext1.Provider>
	);
});

export = (target: Frame) => {
	const handle = Roact.mount(<App />, target, "Component");

	return () => Roact.unmount(handle);
};
