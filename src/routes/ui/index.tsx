import { component$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { decompressState } from "~/utils/sharedfncs";
import { SocialBannerContextType } from "~/contexts/social-banner-context";
import Button from "~/components/basics/button";



export default component$(() => {
  const location = useLocation();

  const decompressedParams = decompressState<SocialBannerContextType>(location.url.searchParams.get("state") ?? "");
  console.log(decompressedParams)


  return (
    <div class="flex flex-col items-center justify-center gap-4 p-4 font-mono">
      <Button>Click me</Button>



    </div>
  );
});

