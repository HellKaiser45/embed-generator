//qwik.dev + daisyui card reusable component
import { ClassList, component$, Slot } from "@builder.io/qwik";

interface FlexibleCardProps {
  title?: string;
  description?: string;
  class?: ClassList;
}

export const FlexibleCard = component$<FlexibleCardProps>(
  ({ title, description, class: extraClass }) => {
    return (
      <>
        <div class={["card bg-base-100 border border-base-300", extraClass]}>

          <div class="card-body justify-start flex">
            <h2 class="card-title">{title ?? ""}</h2>

            <hr class="my-2 border-base-200" />

            <p>{description ?? ""}</p>

            <hr class="my-2 border-base-200" />

            <Slot />
          </div>
        </div>
      </>
    );
  }
);
