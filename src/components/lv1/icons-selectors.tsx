import { component$, useContext } from '@builder.io/qwik';
import { Icon } from '../basics/icons';
import { iconRegistry } from '../icons-registry/icons.data';
import { type IconName } from '../icons-registry/icons.types';
import BetterButton from '~/components/basics/button';
import { SocialBannerContext } from "~/contexts/social-banner-context";

export const IconSelector = component$(() => {
  const state = useContext(SocialBannerContext);

  return (
    <ul class="list bg-base-100 rounded-box shadow-md w-fit">
      {Object.entries(iconRegistry).map(([name, _]) => {
        const isSelected = state.socials.some(social => social.name === name);
        const socialIndex = state.socials.findIndex(social => social.name === name);
        return (
          <li class="list-row" key={name}>
            <div class="flex flex-col items-center">
              <label class="relative cursor-pointer">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange$={() => {
                    const newSocials = [...state.socials];
                    const index = newSocials.findIndex(social => social.name === name);

                    if (index >= 0) {
                      newSocials.splice(index, 1);
                    } else {
                      newSocials.push({
                        name,
                        link: ''
                      });
                    }
                    state.socials = newSocials;
                  }}
                  class="checkbox checkbox-primary peer absolute top-0 left-0 w-full h-full opacity-0"
                />
                <BetterButton class="peer-checked:bg-secondary">
                  <span class="text-primary min-w-24 justify-start flex">{name} :</span>
                  <Icon name={name as IconName} />
                </BetterButton>
              </label>
              
              {isSelected && (
                <div class="mt-2 w-full max-w-[200px]">
                  <input
                    type="url"
                    placeholder="Link"
                    pattern="^(https?://)?([a-zA-Z0-9]([a-zA-Z0-9\-].*[a-zA-Z0-9])?\.)+[a-zA-Z].*$"
                    title='Must be a valid link'
                    value={state.socials[socialIndex]?.link || ''}
                    onInput$={(e: Event) => {
                      const target = e.target as HTMLInputElement;
                      const newSocials = [...state.socials];
                      const index = newSocials.findIndex(social => social.name === name);
                      if (index >= 0) {
                        newSocials[index] = {
                          ...newSocials[index],
                          link: target.value
                        };
                        state.socials = newSocials;
                      }
                    }}
                    class="input input-bordered input-sm w-full"
                  />
                </div>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
});

export default IconSelector;
