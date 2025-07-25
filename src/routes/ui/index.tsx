import { component$, useOnDocument } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { decompressState } from '~/utils/sharedfncs';
import Button from '~/components/basics/button';
import { SocialBannerContextType } from '~/contexts/social-banner-context';
import { Icon } from '~/components/basics/icons';
import type { IconName } from '~/components/icons-registry/icons.types';

export default component$(() => {
  const location = useLocation();

  // pull the "state" query parameter
  const compressed = location.url.searchParams.get('state') ?? '';
  const decompressed = compressed
    ? decompressState<SocialBannerContextType>(compressed)
    : null;

  // mark this route so the global CSS can target it
  useOnDocument(() => {
    document.documentElement.setAttribute('data-route', 'ui');
  });

  return (
    <>
      <style dangerouslySetInnerHTML="html,body{background:transparent!important}" />
      <div class="flex h-screen items-center justify-center gap-4 self-center flex-wrap">
        {decompressed && (
          <>
            {decompressed.socials.map((social, i) => (
              <Button
                key={i}
                class="aspect-square"
                style={{ backgroundColor: decompressed.BgColor, borderColor: decompressed.iconsColor }}
              >
                <Icon
                  name={social.name as IconName}
                  size={decompressed.iconsSize}
                  style={{ fill: decompressed.iconsColor }}
                />
              </Button>
            ))}
          </>
        )}
      </div>
    </>
  );
});
