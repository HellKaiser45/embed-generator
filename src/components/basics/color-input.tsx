//basic custom daisyui compoonent for color picker
import { component$, type QRL } from "@builder.io/qwik";

interface ColorInputProps {
  value?: string;
  onColorChange$?: QRL<(color: string) => void>;
  [key: string]: any; // allow any other native input attributes
}

export const ColorInput = component$<ColorInputProps>(
  (props) => {
    return (
      <input
        type="color"
        class="h-6 w-6"
        value={props.value ?? '#000000'}
        onInput$={(ev) => props.onColorChange$?.((ev.target as HTMLInputElement).value)}
        {...props}
      />
    );
  }
);
