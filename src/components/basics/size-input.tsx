// this is a QWIK component that is used to render a size input
import { component$, QRL } from "@builder.io/qwik";


interface SizeInputProps {
  onSizeChange: QRL<(color: string) => void>;
  value?: string;
}

export const SizeInput = component$<SizeInputProps>(
  (props) => {
    return (
      <>
        <input
          type="number"
          value={props.value ?? '24'}
          onInput$={(ev) => props.onSizeChange((ev.target as HTMLInputElement).value)}
          {...props}
          class="input input-sm w-fit max-w-20 validator
                 [appearance:textfield]
                 [&::-webkit-outer-spin-button]:appearance-none
                 [&::-webkit-inner-spin-button]:appearance-none"
          min="16"
          max="64"
          size={2}
          title="Icon size must be between 16 and 64"
        />
        <p class="validator-hint">Icon size must be between 16 and 64</p>
      </>
    );
  }
);
