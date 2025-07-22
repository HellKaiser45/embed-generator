import { component$, useSignal, useComputed$, $ } from '@builder.io/qwik';
import { Icon } from '../basics/icons';
import { iconRegistry } from '../icons-registry/icons.data';
import { type IconName } from '../icons-registry/icons.types';
import BetterButton from '~/components/basics/button';


export const IconSelector = component$(() => {


  return (
    <ul class="list bg-base-100 rounded-box shadow-md">
      {Object.entries(iconRegistry).map(([name, _]) => (
        <li class="list-row" key={name} >

          <BetterButton>
            <input type="checkbox" checked={false} class="checkbox checkbox-primary" />
            <Icon name={name as IconName} />
            <input />

          </BetterButton>
        </li>
      ))
      }

    </ul>
  );
});

export default IconSelector;
