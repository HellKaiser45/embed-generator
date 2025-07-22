import { component$ } from '@builder.io/qwik';
import { iconRegistry, IconName } from '~/components/icons-registry/icons.data';
import type { IconProps } from '~/components/icons-registry/icons.types';

export const Icon = component$<{ name: IconName } &
  IconProps>(({ name, ...props }) => {
    const icon = iconRegistry[name];

    if (!icon) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Icon "${name}" not found in registry`);
      }
      return <FallbackIcon {...props} />;
    }

    // Type-safe check for icon variant
    const hasPath = 'path' in icon && typeof icon.path === 'string';
    const hasPaths = 'paths' in icon && Array.isArray(icon.paths);
    const hasMarkup = 'markup' in icon;

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={props.size || 24}
        height={props.size || 24}
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        {...props}
      >
        {hasPath ? (
          <path d={icon.path} />
        ) : hasPaths && 'paths' in icon && Array.isArray(icon.paths) ? (
          icon.paths.map((path, index) => <path key={index} d={path} />)
        ) : hasMarkup && icon.markup ? (
          icon.markup
        ) : (
          <path d="M12 2L4 7v10l8 5 8-5V7z" />
        )}
      </svg>
    );
  });

// Fallback remains unchanged
const FallbackIcon = (props: IconProps) => (
  <svg {...props}>
    <path d="M12 2L4 7v10l8 5 8-5V7z" />
  </svg>
);
