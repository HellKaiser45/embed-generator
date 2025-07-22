import { component$, useContextProvider, useStore } from "@builder.io/qwik";
import IconSelector from "~/components/lv1/icons-selectors";
import { SocialBannerContext } from "~/contexts/social-banner-context";


export default component$(() => {

  const StateContext = useStore(
    {
      'icons-color': 'fill-primary',
      'icons-size': 24,
      'socials': []
    });

  useContextProvider(SocialBannerContext, StateContext);

  return (
    <>
      <div class="flex flex-col items-center justify-center gap-4 p-4">
        <IconSelector />
      </div>

    </>
  );
});


