import { component$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { decompressState } from '~/utils/sharedfncs';
import Button from '~/components/basics/button';
import { SocialBannerContextType } from '~/contexts/social-banner-context';


export default component$(() => {
  const location = useLocation();

  // pull the "state" query parameter
  const compressed = location.url.searchParams.get('state') ?? '';
  const decompressed = compressed
    ? decompressState<SocialBannerContextType>(compressed)
    : null;

  console.log('decompressed state:', decompressed);

  return (
    <div class="flex flex-col items-center justify-center gap-4 font-mono">


      {decompressed && (
        <Button
          style={{
            backgroundColor: decompressed.BgColor || '#000000',
          }}
        >
          Click me
        </Button>
      )}
    </div>
  );
});
