import { component$, useSignal, useComputed$ } from '@builder.io/qwik';
import { Icon } from '../basics/icons';
import { iconRegistry } from '../icons-registry/icons.data';
import { type IconName } from '../icons-registry/icons.types';
import BetterButton from '~/components/basics/button';

interface SocialLink {
  icon: IconName;
  url: string;
  label: string;
}

interface IconSelectorProps {
  selectedLinks?: SocialLink[];
  onLinksChange?: (links: SocialLink[]) => void;
  maxLinks?: number;
  filterable?: boolean;
}

// Wrapper component for BetterButton
export const IconButton = component$<{
  icon: IconName;
  isSelected: boolean;
  onClick$: () => void;
  size?: number;
}>(({ icon, isSelected, onClick$, size = 24 }) => {
  return (
    <BetterButton
      class={[
        "btn btn-square btn-sm",
        isSelected ? "btn-primary" : "btn-ghost"
      ]}
      onClick$={onClick$}
      title={isSelected ? "Remove" : "Add"}
    >
      <Icon name={icon} size={size} />
      {isSelected && (
        <span class="absolute -top-1 -right-1 badge badge-xs badge-success">✓</span>
      )}
    </BetterButton>
  );
});

export const IconSelector = component$<IconSelectorProps>((props) => {
  const searchTerm = useSignal('');

  const availableIcons = useComputed$(() => {
    const icons = Object.keys(iconRegistry) as IconName[];
    
    if (!props.filterable || !searchTerm.value) {
      return icons;
    }

    return icons.filter(name =>
      name.toLowerCase().includes(searchTerm.value.toLowerCase())
    );
  });

  const isIconSelected = (iconName: IconName) => {
    return props.selectedLinks?.some(link => link.icon === iconName) ?? false;
  };

  const handleIconToggle = (iconName: IconName) => {
    const currentLinks = props.selectedLinks ?? [];
    
    if (isIconSelected(iconName)) {
      const filtered = currentLinks.filter(link => link.icon !== iconName);
      props.onLinksChange?.(filtered);
    } else {
      if (props.maxLinks && currentLinks.length >= props.maxLinks) return;
      
      const newLink: SocialLink = {
        icon: iconName,
        url: '',
        label: iconName
      };
      props.onLinksChange?.([...currentLinks, newLink]);
    }
  };

  const handleLinkUpdate = (index: number, field: keyof SocialLink, value: string) => {
    const currentLinks = props.selectedLinks ?? [];
    const updated = [...currentLinks];
    updated[index] = { ...updated[index], [field]: value };
    props.onLinksChange?.(updated);
  };

  const handleRemoveLink = (index: number) => {
    const currentLinks = props.selectedLinks ?? [];
    const filtered = currentLinks.filter((_, i) => i !== index);
    props.onLinksChange?.(filtered);
  };

  return (
    <div class="space-y-4">
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">Available Icons</h2>
          
          {props.filterable && (
            <input
              type="text"
              placeholder="Search icons..."
              class="input input-bordered w-full mb-4"
              bind:value={searchTerm}
            />
          )}
          
          <div class="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2 max-h-64 overflow-y-auto">
            {availableIcons.value.map((iconName) => (
              <IconButton
                key={iconName}
                icon={iconName}
                isSelected={isIconSelected(iconName)}
                onClick$={() => handleIconToggle(iconName)}
                size={20}
              />
            ))}
          </div>
          
          {props.maxLinks && (
            <div class="text-sm text-base-content/70 mt-2">
              {props.selectedLinks?.length ?? 0} / {props.maxLinks} selected
            </div>
          )}
        </div>
      </div>

      {props.selectedLinks && props.selectedLinks.length > 0 && (
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title">Your Social Links</h2>
            
            <div class="space-y-3">
              {props.selectedLinks.map((link, index) => (
                <div key={`${link.icon}-${index}`} class="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
                  <Icon name={link.icon} size={24} />
                  
                  <div class="flex-1 space-y-2">
                    <input
                      type="text"
                      placeholder="Label (e.g., GitHub)"
                      class="input input-sm input-bordered w-full"
                      value={link.label}
                      onInput$={(e) => handleLinkUpdate(index, 'label', (e.target as HTMLInputElement).value)}
                    />
                    
                    <input
                      type="url"
                      placeholder="https://example.com"
                      class="input input-sm input-bordered w-full"
                      value={link.url}
                      onInput$={(e) => handleLinkUpdate(index, 'url', (e.target as HTMLInputElement).value)}
                    />
                  </div>
                  
                  <BetterButton
                    class="btn btn-square btn-sm btn-ghost"
                    onClick$={() => handleRemoveLink(index)}
                    title="Remove"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                    </svg>
                  </BetterButton>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

export default IconSelector;
