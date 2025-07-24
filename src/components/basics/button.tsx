import { component$, Slot, type ClassList } from '@builder.io/qwik';

interface ButtonProps {
  class?: ClassList;
  onClick$?: () => void;
  [key: string]: any; // Allow any other button attributes
}

export default component$<ButtonProps>(({ class: className, onClick$, ...props }) => {
  return (
    <button
      class={['btn h-fit min-h-8', className]}
      onClick$={onClick$}
      {...props}
    >
      <Slot />
    </button>
  );
});
