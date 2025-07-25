import { component$, useSignal, useOnWindow, $ } from '@builder.io/qwik';
import { decompressState } from '~/utils/sharedfncs';
import Button from '~/components/basics/button';
import { Icon } from '~/components/basics/icons';
import type { IconName } from '~/components/icons-registry/icons.types';
import type { SocialBannerContextType } from '~/contexts/social-banner-context';

export default component$(() => {
  const decompressed = useSignal<SocialBannerContextType | null>(null);

  useOnWindow(
    'load',
    $(() => {
      const params = new URLSearchParams(window.location.search);
      const state = params.get('state');
      if (state) {
        try {
          decompressed.value = decompressState<SocialBannerContextType>(state);
        } catch (e) {
          console.error(e);
        }
      }
    })
  );

  return (
    <>
      <style dangerouslySetInnerHTML="html,body{background:transparent!important}" />
      <div class="flex h-screen items-center justify-center gap-4 self-center flex-wrap">
        {decompressed.value?.socials.map((social, i) => (
          <Button
            key={i}
            class="aspect-square"
            style={{
              backgroundColor: decompressed.value?.BgColor,
              borderColor: decompressed.value?.iconsColor,
            }}
          >
            <Icon
              name={social.name as IconName}
              size={decompressed.value?.iconsSize}
              style={{ fill: decompressed.value?.iconsColor }}
            />
          </Button>
        ))}
      </div>
    </>
  );
});
