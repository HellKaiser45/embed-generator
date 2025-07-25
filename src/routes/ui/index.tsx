import { component$ } from '@builder.io/qwik';
import { decompressState } from '~/utils/sharedfncs';
import Button from '~/components/basics/button';
import { Icon } from '~/components/basics/icons';
import type { IconName } from '~/components/icons-registry/icons.types';
import type { SocialBannerContextType } from '~/contexts/social-banner-context';

export default component$(() => {
  // read & decompress once, at SSR time
  const params = new URLSearchParams(
    typeof window === 'undefined'
      ? (globalThis as any).location?.search ?? ''
      : window.location.search
  );
  const stateParam = params.get('state');

  console.log('[ui] raw url:', typeof window === 'undefined' ? 'SSR' : window.location.href);
  console.log('[ui] compressed param:', stateParam);

  const decompressed: SocialBannerContextType | null = stateParam
    ? decompressState<SocialBannerContextType>(stateParam)
    : null;

  console.log('[ui] decompressed:', decompressed);

  return (
    <>
      <style dangerouslySetInnerHTML="html,body{background:transparent!important}" />
      <div class="flex h-screen items-center justify-center gap-4 self-center flex-wrap">
        {decompressed?.socials.map((social, i) => (
          <Button
            key={i}
            class="aspect-square"
            style={{
              backgroundColor: decompressed.BgColor,
              borderColor: decompressed.iconsColor,
            }}
          >
            <Icon
              name={social.name as IconName}
              size={decompressed.iconsSize}
              style={{ fill: decompressed.iconsColor }}
            />
          </Button>
        ))}
      </div>
    </>
  );
});
