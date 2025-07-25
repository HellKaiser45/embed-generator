import { component$, useSignal, useTask$ } from '@builder.io/qwik';
import { decompressState } from '~/utils/sharedfncs';
import Button from '~/components/basics/button';
import { SocialBannerContextType } from '~/contexts/social-banner-context';
import { Icon } from '~/components/basics/icons';
import type { IconName } from '~/components/icons-registry/icons.types';

export default component$(() => {

  const decompressed = useSignal<SocialBannerContextType | null>()

  useTask$(() => {
    const toloc = document.location
    const state = new URLSearchParams(toloc.search).get('state');
    console.log('[ui] state:', state);

    if (state) {
      try {
        decompressed.value =
          decompressState<SocialBannerContextType>(state);
        console.log('[ui] decompressed:', decompressed.value);
      } catch (e) {
        console.warn('[ui] decompression failed:', e);
        decompressed.value = null;
      }
    } else {
      console.log('[ui] no state param');
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
