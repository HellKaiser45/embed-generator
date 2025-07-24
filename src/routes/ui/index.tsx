import { component$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { decompressState } from '~/utils/sharedfncs';
import Button from '~/components/basics/button';

interface DecompressedState {
  iconsColor?: string;
  iconsSize?: string;
  BgColor?: string;
  socials?: Array<{ name: string; link: string }>;
}

export default component$(() => {
  const location = useLocation();

  // pull the "state" query parameter
  const compressed = location.url.searchParams.get('state') ?? '';
  const decompressed = compressed 
    ? decompressState<DecompressedState>(compressed) 
    : null;

  console.log('decompressed state:', decompressed);

  return (
    <div class="flex flex-col items-center justify-center gap-4 p-4 font-mono">
      <h1>Qwik UI</h1>
      <p>This is a Qwik UI app.</p>

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
