import { component$ } from '@builder.io/qwik';
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

  console.log('decompressed state:', decompressed);

  return (
    <div class="flex items-center justify-center gap-4 font-mono">
      {decompressed && (
        <>
          {
            decompressed.socials.map((social, i) => (
              <Button key={i} style={`background-color:${decompressed.BgColor}`}>
                <Icon name={social.name as IconName} size={decompressed.iconsSize} class={`fill-[${decompressed.iconsColor}]`} />
              </Button>

            ))
          }
        </>
      )}
    </div>
  );
});
