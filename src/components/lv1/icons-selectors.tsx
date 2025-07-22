import { component$, useContext } from '@builder.io/qwik';
import { Icon } from '../basics/icons';
import { iconRegistry } from '../icons-registry/icons.data';
import { type IconName } from '../icons-registry/icons.types';
import BetterButton from '~/components/basics/button';
import { SocialBannerContext } from "~/contexts/social-banner-context";


export const IconSelector = component$(() => {
  const state = useContext(SocialBannerContext);


  return (
    <ul class="list bg-base-100 rounded-box shadow-md">
      {Object.entries(iconRegistry).map(([name, _]) => (
        <li class="list-row" key={name}>
          <label class="relative flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={false}
              class="checkbox checkbox-primary peer absolute top-0 left-0 w-full h-full opacity-0"
            />
            <BetterButton class="peer-checked:bg-secondary">
              <span class="text-primary min-w-24 justify-start flex">{name} :</span>
              <Icon name={name as IconName} />
            </BetterButton>
          </label>
        </li>
      ))}
    </ul>
  );
});

export default IconSelector;
