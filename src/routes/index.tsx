import { component$, useContextProvider, useStore, useContext, $, useTask$, useSignal, useComputed$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import IconSelector from "~/components/lv1/icons-selectors";
import { SocialBannerContext, SocialBannerContextType, UrlSocialBannerContext } from "~/contexts/social-banner-context";
import { FlexibleCard } from "~/components/basics/flexible-card";
import { ColorInput } from "~/components/basics/color-input";
import { SizeInput } from "~/components/basics/size-input";
import { compressAndLogState, buildTransparentIframe } from "~/utils/sharedfncs";
import { UrlCopy } from "~/components/basics/url-copy";
import { IframePreview } from "~/components/basics/iframe-preview";

const calculateiframeSize = (icons: number, size: number) => {
  const width = Math.min((icons) * (size + 66), 600); // Cap max width
  const height = size + 66;
  return { 'width': width, 'height': height };
};

export default component$(() => {
  const location = useLocation();

  const StateContext = useStore({
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

  const dimensions = useComputed$(() => calculateiframeSize(state.socials.length, parseInt(state.iconsSize)));

  useTask$(({ track }) => {
    const nextState = track(state);
    const compressed = compressAndLogState<SocialBannerContextType>(nextState);
    urlstate.value = compressed;
  })

  return (
    <div class="min-h-screen bg-gradient-to-br from-base-100 to-base-200">
      <div class="container mx-auto px-4 py-8">
        <header class="text-center mb-8">
          <h1 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Social Banner Generator
          </h1>
          <p class="text-base-content/70 mt-2 text-lg">
            Create beautiful social media banners for your projects
          </p>
        </header>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {/* Configuration Card */}
          <FlexibleCard
            title="Configuration"
            description="Customize your banner appearance"
            class="bg-base-100 shadow-xl border border-base-300  lg:col-span-1"
          >
            <div class="space-y-6">
              {/* Settings Section */}
              <div class="space-y-6">
                <h3 class="text-xl font-bold text-base-content mb-4">Appearance Settings</h3>

                <div class="space-y-4">
                  {/* Icon Size */}
                  <div class="flex items-center gap-4">
                    <label class="text-base font-semibold text-base-content w-28 shrink-0">Icon Size</label>
                    <SizeInput
                      onSizeChange={$((size: string) => {
                        state.iconsSize = size;
                      })}
                    />
                  </div>

                  {/* Background */}
                  <div class="flex items-center gap-4">
                    <label class="text-base font-semibold text-base-content w-28 shrink-0">Background</label>
                    <ColorInput
                      onColorChange={$((color: string) => {
                        state.BgColor = color;
                      })}
                    />
                  </div>

                  {/* Icon Color */}
                  <div class="flex items-center gap-4">
                    <label class="text-base font-semibold text-base-content w-28 shrink-0">Icon Color</label>
                    <ColorInput
                      onColorChange={$((color: string) => {
                        state.iconsColor = color;
                      })}
                    />
                  </div>
                </div>
              </div>

              <div class="divider"></div>

              {/* Icons Selection */}
              <div class="space-y-4">
                <h3 class="text-lg font-semibold text-base-content">Select Social Icons</h3>
                <IconSelector />
              </div>
            </div>
          </FlexibleCard>

          {/* Preview Card */}
          <FlexibleCard
            title="Live Preview"
            description="See your banner in real-time"
            class="bg-base-100 shadow-xl border border-base-300 block lg:col-span-2"
          >

            {/* Preview Area */}
            <div class="transform scale-90 sm:scale-100 transition-transform">
              <IframePreview
                url={location.url + 'ui?state=' + urlstate.value}
                width={dimensions.value.width}
                height={dimensions.value.height}
              />
            </div>

            {/* Copy URLs */}
            <div class="space-y-3">
              <h4 class="font-medium text-base-content/80">Share Your Banner</h4>

              <div class="space-y-2">
                <p class="text-sm text-base-content/70 mb-1">Direct URL:</p>
                <UrlCopy
                  content={location.url + 'ui?state=' + urlstate.value}
                  class="w-full"
                  title="Copy direct URL"
                />

                <p class="text-sm text-base-content/70 mb-1">Embed Code:</p>
                <UrlCopy
                  content={buildTransparentIframe(location.url + 'ui?state=' + urlstate.value, dimensions.value.width, dimensions.value.height)}
                  class="w-full"
                  title="Copy embed code"
                />
              </div>
            </div>

          </FlexibleCard>
        </div>

        {/* Footer */}
        <footer class="text-center mt-12 text-base-content/60">
          <p class="text-sm">
            Built with ❤️ using Qwik and Tailwind CSS
          </p>
        </footer>
      </div>
    </div>
  );
});
