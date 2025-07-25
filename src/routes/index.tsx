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
  const width = Math.min((icons) * (size + 66)); // Cap max width
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
    <div class="min-h-screen bg-gradient-to-br from-base-100 to-base-200 font-mono">
      <a href="./ui" style={{ display: 'none' }} aria-hidden="true" />
      <div class="container mx-auto px-4 py-8 max-w-6/12">
        <header class="text-center mb-8">
          <h1 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Social Banner Generator
          </h1>
          <p class="text-base-content/70 mt-2 text-lg">
            Create beautiful social media banners for your projects
          </p>
        </header>

        <div class="grid grid-cols-1 lg:grid-cols-8 gap-6 max-w-7xl mx-auto">
          {/* Configuration Card */}
          <FlexibleCard
            title="Customize Banner"
            description="Tweak colors, size & icons in real-time."
            class="bg-base-100 shadow-xl border border-base-300 lg:col-span-3"
          >
            <div class="space-y-8 p-6 lg:p-8">
              {/* Look & Feel Section */}
              <section>
                <h3 class="text-xl font-bold text-base-content mb-6 underline decoration-primary decoration-2 underline-offset-4">
                  🎨 Look & Feel
                </h3>

                <div class="space-y-5">
                  {/* Icon Size */}
                  <div class="flex flex-col sm:flex-row sm:items-center gap-3">
                    <label class="font-semibold text-sm sm:text-base text-base-content w-full sm:w-32 shrink-0">
                      Icon Size
                    </label>
                    <SizeInput
                      onSizeChange={$((size: string) => {
                        state.iconsSize = size;
                      })}
                    />
                  </div>

                  {/* Background */}
                  <div class="flex flex-col sm:flex-row sm:items-center gap-3">
                    <label class="font-semibold text-sm sm:text-base text-base-content w-full sm:w-32 shrink-0">
                      Background
                    </label>
                    <ColorInput
                      onColorChange={$((color: string) => {
                        state.BgColor = color;
                      })}
                    />
                  </div>

                  {/* Icon Color */}
                  <div class="flex flex-col sm:flex-row sm:items-center gap-3">
                    <label class="font-semibold text-sm sm:text-base text-base-content w-full sm:w-32 shrink-0">
                      Icon Color
                    </label>
                    <ColorInput
                      onColorChange={$((color: string) => {
                        state.iconsColor = color;
                      })}
                    />
                  </div>
                </div>
              </section>

              <hr class="my-6 border-base-300" />

              {/* Social Links Section */}
              <section>
                <h3 class="text-xl font-bold text-base-content mb-6 underline decoration-primary decoration-2 underline-offset-4">
                  🔗 Social Links
                </h3>

                <div class="space-y-4">
                  <IconSelector />
                </div>
              </section>
            </div>
          </FlexibleCard>

          {/* Preview Card */}
          <FlexibleCard
            title="Live Preview"
            description="Your banner, rendered instantly."
            class="bg-base-100 shadow-xl border border-base-300 block lg:col-span-5"
          >
            <div class="space-y-8 p-6 lg:p-8">
              {/* Preview Area */}
              <section>
                <div class="transform scale-90 sm:scale-100 transition-transform">
                  <IframePreview
                    url={location.url + 'ui?state=' + urlstate.value}
                    width={dimensions.value.width}
                    height={dimensions.value.height}
                  />
                </div>
              </section>

              <hr class="my-6 border-base-300" />

              {/* Share & Embed Section */}
              <section>
                <h4 class="text-xl font-bold text-base-content mb-6 underline decoration-primary decoration-2 underline-offset-4">
                  📤 Share & Embed
                </h4>

                <div class="space-y-4">
                  <div>
                    <p class="text-sm font-semibold text-base-content/80 mb-2">Direct link</p>
                    <UrlCopy
                      content={location.url + 'ui?state=' + urlstate.value}
                      class="w-full"
                      title="Copy direct URL"
                    />
                  </div>

                  <div>
                    <p class="text-sm font-semibold text-base-content/80 mb-2">Copy-paste embed code</p>
                    <UrlCopy
                      content={buildTransparentIframe(location.url + 'ui?state=' + urlstate.value, dimensions.value.width, dimensions.value.height)}
                      class="w-full"
                      title="Copy embed code"
                    />
                  </div>
                </div>
              </section>
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
