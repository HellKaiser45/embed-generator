//qwik.dev + daisyui card reusable component
import { component$, Slot } from "@builder.io/qwik";

interface FlexibleCardProps {
  title?: string;
  description?: string;
}

export const FlexibleCard = component$<FlexibleCardProps>(
  (props) => {
    return (
      <>
        <div class="card bg-base-100 border border-base-300 w-auto">

          <div class="card-body">
            <h2 class="card-title">{props.title ?? ""}</h2>

            <hr class="my-2 border-base-200" />

            <p>{props.description ?? ""}</p>

            <hr class="my-2 border-base-200" />

            <Slot />
          </div>
        </div>
      </>
    );
  }
);
