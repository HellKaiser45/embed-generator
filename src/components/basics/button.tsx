import { component$, Slot, type ClassList } from '@builder.io/qwik';

interface ButtonProps {
  class?: ClassList;
}

export default component$<ButtonProps>(({ class: className }) => {
  return (
    <button class={['btn btn-outline h-fit min-h-8', className]}>
      <Slot />
    </button>
  );
});
