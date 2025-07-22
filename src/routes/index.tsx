import { component$ } from "@builder.io/qwik";

import IconSelector from "~/components/lv1/icons-selectors";

export default component$(() => {
  return (
    <>
      <div class="flex flex-col items-center justify-center gap-4 p-4">
        <IconSelector />
      </div>

    </>
  );
});


