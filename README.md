# [@rbxts/roact-hooked](https://www.npmjs.com/package/@rbxts/roact-hooked)

Roact hooks based on [Kampfkarren's hooks](https://github.com/Kampfkarren/roact-hooks) & [React Hooks](https://reactjs.org/docs/hooks-intro.html)

> ✋🏾 This is a work in progress!

## Usage

```tsx
import { hooked, useEffect, useState } from "@rbxts/roact-hooked";
import Roact from "@rbxts/roact";

interface MyComponentProps {
  name?: string;
}

export const MyComponent = hooked<MyComponentProps>(({ name = "David Baszucki" }) => {
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
});
```
