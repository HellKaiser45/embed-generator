//basic custom daisyui compoonent for color picker
import { component$ } from "@builder.io/qwik";


export const ColorInput = component$(
  () => {
    return (
      <input type="color" class="h-6 w-6" />

    )
  })
