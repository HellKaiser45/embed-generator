import { component$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { decompressState } from "~/utils/compressState"; import { decompressState } from "~/utils/compressState";



export default component$(() => {
  const location = useLocation();

  const decompressedParams = decompressState(location.params)


  return (
    <div class="flex flex-col items-center justify-center gap-4 p-4 font-mono">
      <h1>Qwik UI</h1>
      <p>This is a Qwik UI app.</p>
      <p>Visits: {location.data.count}</p>
    </div>
  );
});

