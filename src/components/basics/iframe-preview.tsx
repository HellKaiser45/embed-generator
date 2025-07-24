// an iframe preview component for Qwik to display 
import { component$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city"};

export const IframePreview = component$(() => {
  const location = useLocation();
  return (
    <iframe
      src={location.href}
      title="Iframe Preview"
      style={{ width: "100%", height: "100%" }}
    />
  );
});
