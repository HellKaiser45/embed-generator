import { component$, useContextProvider, useStore, useContext, $ } from "@builder.io/qwik";
import IconSelector from "~/components/lv1/icons-selectors";
import { SocialBannerContext } from "~/contexts/social-banner-context";
import { FlexibleCard } from "~/components/basics/flexible-card";
import { ColorInput } from "~/components/basics/color-input";

export default component$(() => {

  const StateContext = useStore(
    {
      'icons-color': 'fill-primary',
      'icons-size': 24,
      'socials': []
    });

  useContextProvider(SocialBannerContext, StateContext);
  const state = useContext(SocialBannerContext);


  return (
    <>
      <div class="flex flex-col items-center justify-center gap-4 p-4">
        <FlexibleCard title="Icons" description="Select your icons">
          <ColorInput onColorChange={$((color: string) => {
            state["icons-color"] = color;
          })
          } />
          <IconSelector />
        </FlexibleCard>
      </div>

    </>
  );
});


