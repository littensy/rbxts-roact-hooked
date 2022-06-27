# [@rbxts/roact-hooked](https://www.npmjs.com/package/@rbxts/roact-hooked)

Roact hooks based on [Kampfkarren's hooks](https://github.com/Kampfkarren/roact-hooks) & [React Hooks](https://reactjs.org/docs/hooks-intro.html)

## Install

```
npm install @rbxts/roact-hooked
```

## Usage

```tsx
import Roact from "@rbxts/roact";
import { withHooks, useEffect, useState } from "@rbxts/roact-hooked";

interface Props {
  name?: string;
}

function MyComponent({ name = "David Baszucki" }: Props) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    print("Counter: " + count);
  }, [count]);

  return (
    <textbutton
      Size={new UDim2(1, 0, 1, 0)}
      Text={`${name} pressed ${count} times`}
      Event={{
        Activated: () => setCount((value) => value + 1),
      }}
    />
  );
}

export default withHooks(MyComponent);
```
