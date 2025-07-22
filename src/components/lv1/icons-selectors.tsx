import { component$, useSignal, useComputed$ } from '@builder.io/qwik';
import { Icon } from '../basics/icons';
import { iconRegistry, } from '../icons-registry/icons.data';
import { type IconName } from '../icons-registry/icons.types';
import BetterButton from '~/components/basics/button';


interface IconSelectorProps {
  selectedIcon?: IconName;
  onIconSelect?: (icon: IconName) => void;
  filterable?: boolean;
  size?: number;
}

export const IconSelector = component$<IconSelectorProps>((props) => {
  const searchTerm = useSignal('');

  const filteredIcons = useComputed$(() => {
    const icons = Object.keys(iconRegistry) as IconName[];

    if (!props.filterable || !searchTerm.value) {
      return icons;
    }

    return icons.filter(name =>
      name.toLowerCase().includes(searchTerm.value.toLowerCase())
    );
  });

  return (
    <div class="icon-selector">
      {props.filterable && (
        <div class="mb-4">
          <input
            type="text"
            placeholder="Search icons..."
            class="input input-bordered w-full"
            bind:value={searchTerm}
          />
        </div>
      )}

      <div class="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2 max-h-96 overflow-y-auto">
        {filteredIcons.value.map((iconName) => (
          <BetterButton
            key={iconName}
            class={[
              "btn btn-ghost btn-square",
              props.selectedIcon === iconName && "btn-primary"
            ].join(' ')}
            onClick$={() => props.onIconSelect?.(iconName)}
            title={iconName}
          >
            <Icon name={iconName} size={props.size || 24} />
          </BetterButton>
        ))}
      </div>

      {filteredIcons.value.length === 0 && (
        <div class="text-center py-8 text-gray-500">
          <p>No icons found matching "{searchTerm.value}"</p>
        </div>
      )}
    </div>
  );
});

export default IconSelector;
