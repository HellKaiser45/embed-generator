import { component$, useContextProvider, useStore, useContext, $, useTask$, useSignal } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import IconSelector from "~/components/lv1/icons-selectors";
import { SocialBannerContext, SocialBannerContextType, UrlSocialBannerContext } from "~/contexts/social-banner-context";
import { FlexibleCard } from "~/components/basics/flexible-card";
import { ColorInput } from "~/components/basics/color-input";
import { SizeInput } from "~/components/basics/size-input";
import { compressAndLogState } from "~/utils/sharedfncs";
import { UrlCopy } from "~/components/basics/url-copy";

export default component$(() => {

  const location = useLocation();

  const StateContext = useStore(
    {
      'iconsColor': 'fill-primary',
      'iconsSize': '24',
      'BgColor': '#000000',
      'socials': []
    });
  const StateUrl = useSignal("")


  useContextProvider(SocialBannerContext, StateContext);
  useContextProvider(UrlSocialBannerContext, StateUrl);

  const state = useContext(SocialBannerContext);
  const urlstate = useContext(UrlSocialBannerContext);

  useTask$(({ track }) => {
    const nextState = track(state);
    const compressed = compressAndLogState<SocialBannerContextType>(nextState);
    urlstate.value = compressed;
  })

  return (
    <>
      <div class="flex items-center justify-center gap-4 p-4 font-mono">
        <FlexibleCard title="Icons" description="Select your icons">
          <div class="space-y-2 w-80">
            <div class="flex  gap-4">
              <span class="min-w-24">Icons size</span>
              <SizeInput onSizeChange={$((size: string) => {
                state.iconsSize = size;

              })} />
            </div>


            <div class="flex gap-4 ">
              <span class="min-w-24">Button color</span>
              <ColorInput onColorChange={$((color: string) => {
                state.iconsColor = color;
              })
              } />
            </div>


            <div class="flex gap-4">
              <span class="min-w-24">Icons color</span>
              <ColorInput onColorChange={$((color: string) => {
                state.iconsColor = color;
              })
              } />
            </div>

          </div>
          <hr class="w-full border-base-200 my-2" />
          <p class="underline" > Select your socials</p>
          <IconSelector />
        </FlexibleCard>

        <FlexibleCard title="Preview" description="Preview and copy your banner">
          <UrlCopy content={location.url + 'ui?state=' + urlstate.value} />
          <hr class="w-full border-base-200 my-2" />


        </FlexibleCard>
      </div>

    </>
  );
});
