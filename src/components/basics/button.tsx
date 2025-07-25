import { component$, Slot, type ClassList, type QRL } from '@builder.io/qwik';

interface ButtonProps {
  class?: ClassList;
  onClick$?: QRL<() => void>;
  [key: string]: any; // Allow any other button attributes
}

export default component$<ButtonProps>(({ class: className, onClick$, ...props }) => {
  return (
    <button
      class={['btn h-auto w-auto', className]}
      onClick$={onClick$}
      {...props}
    >
      <Slot />
    </button>
  );
});
