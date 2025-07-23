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
        <div class="card bg-base-100 border border-base-300">

          <div class="card-body">
            <h2 class="card-title">{props.title ?? "Card Title"}</h2>

            <hr class="my-2 border-base-200" />

            <p>{props.description ?? "A card component has a figure, a body part, and inside body there are title and actions parts"}</p>

            <hr class="my-2 border-base-200" />

            <Slot />
          </div>
        </div>
      </>
    );
  }
);
