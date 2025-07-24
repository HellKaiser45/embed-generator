import { component$ } from '@builder.io/qwik';
import { iconRegistry } from '~/components/icons-registry/icons.data';
import type { IconName } from '~/components/icons-registry/icons.types';
import type { IconProps } from '~/components/icons-registry/icons.types';

export const Icon = component$<{ name: IconName } & IconProps>(({ name, size = 24, ...props }) => {
  const path = iconRegistry[name];

  if (!path) {
    console.warn(`Icon "${name}" not found`);
    return <FallbackIcon size={`${size}`} {...props} />;
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d={path} />
    </svg>
  );
});

const FallbackIcon = (props: IconProps) => (
  <svg width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2L4 7v10l8 5 8-5V7z" />
  </svg>
);
