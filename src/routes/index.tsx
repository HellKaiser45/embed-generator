import { component$ } from "@builder.io/qwik";
import { Icon } from "~/components/basics/icons";
import Button from "~/components/basics/button";

export default component$(() => {
  return (
    <>
      <div class="flex flex-col items-center justify-center gap-4 p-4">
        <Button class="btn-primary">
          <Icon name="github" class="fill-base-content w-5 h-5" />
        </Button>
      </div>

    </>
  );
});


