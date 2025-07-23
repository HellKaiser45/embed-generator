//qwik.dev + daisyui card reusable component
import { component$, Slot } from "@builder.io/qwik";

export const FlexibleCard = component$(
  () => {
    return (
      <>
        <div class="card bg-base-100 shadow-sm">

          <div class="card-body">
            <h2 class="card-title">Card Title</h2>
            <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
            <Slot />
          </div>
        </div>
      </>

    );
  }
);
