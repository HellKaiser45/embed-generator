// an iframe preview component for Qwik to display 
import { component$ } from "@builder.io/qwik";
import { buildTransparentIframe } from "~/utils/sharedfncs";

interface IframePreviewProps {
  url: string;
  width: number | string;
  height: number | string;
}

export const IframePreview = component$<IframePreviewProps>(({ url, width, height }) => {
  const iframeCode = buildTransparentIframe(url, width, height);

  return (
    <div class="card bg-base-100 shadow-xl border border-base-300 ">
      <div class="overflow-x-auto">
        <div dangerouslySetInnerHTML={iframeCode} class="inline-block" />
      </div>
    </div>
  );
});
