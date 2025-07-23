import { component$, useContext } from '@builder.io/qwik';
import { Icon } from '../basics/icons';
import { iconRegistry } from '../icons-registry/icons.data';
import { type IconName } from '../icons-registry/icons.types';
import BetterButton from '~/components/basics/button';
import { SocialBannerContext } from "~/contexts/social-banner-context";

export const IconSelector = component$(() => {
  const state = useContext(SocialBannerContext);

  return (
    <ul class="list bg-base-100 rounded-box shadow-md max-w-fit">
      {Object.entries(iconRegistry).map(([name, _]) => {
        const isSelected = state.socials.some(social => social.name === name);
        const socialIndex = state.socials.findIndex(social => social.name === name);
        return (
          <li class="list-row" key={name}>
            <label class="relative flex-col items-center cursor-pointer">
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
              {isSelected && (
                <>
                  <label class="mt-2 input validator">
                    <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <g
                        stroke-linejoin="round"
                        stroke-linecap="round"
                        stroke-width="2.5"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                      </g>
                    </svg>
                    <input
                      type="url"
                      placeholder="https://"
                      pattern="^(https?://)?([a-zA-Z0-9]([a-zA-Z0-9\-].*[a-zA-Z0-9])?\.)+[a-zA-Z].*$"
                      title='Must be a vaild link'
                      value={state.socials[socialIndex]?.link || 'https://'}
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
                    />
                  </label >
                  <p class="validator-hint">Must be a valid link</p>
                </>
              )}
            </label>
          </li>
        );
      })}
    </ul>
  );
});

export default IconSelector;
