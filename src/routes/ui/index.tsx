import { component$, useSignal, useTask$, useVisibleTask$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { decompressState } from '~/utils/sharedfncs';
import Button from '~/components/basics/button';
import { SocialBannerContextType } from '~/contexts/social-banner-context';
import { Icon } from '~/components/basics/icons';
import type { IconName } from '~/components/icons-registry/icons.types';

export default component$(() => {
  const loc = useLocation();

  const decompressed = useSignal<SocialBannerContextType | null>()

  useVisibleTask$(() => {
  });


  useTask$(({ track }) => {
    track(() => loc.url);          // re-run if the URL changes         
    const compressed = loc.url.searchParams.get('state') ?? '';
    if (compressed) {
      try {
        decompressed.value =
          decompressState<SocialBannerContextType>(compressed);
      } catch {
        decompressed.value = null;
      }
    } else {
      decompressed.value = null;
    }
  });


  return (
    <>
      <style dangerouslySetInnerHTML="html,body{background:transparent!important}" />
      <div class="flex h-screen items-center justify-center gap-4 self-center flex-wrap">
        {decompressed && (
          <>
            {decompressed.value?.socials.map((social, i) => (
              <Button
                key={i}
                class="aspect-square"
                style={{ backgroundColor: decompressed.value?.BgColor, borderColor: decompressed.value?.iconsColor }}
              >
                <Icon
                  name={social.name as IconName}
                  size={decompressed.value?.iconsSize}
                  style={{ fill: decompressed.value?.iconsColor }}
                />
              </Button>
            ))}
          </>
        )}
      </div>
    </>
  );
});
