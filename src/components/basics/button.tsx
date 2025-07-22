import { component$, Slot, type ClassList, type QwikIntrinsicElements } from '@builder.io/qwik';

interface ButtonProps extends QwikIntrinsicElements['button'] {
  class?: ClassList;
  onClick$?: () => void;
}

export default component$<ButtonProps>(({ class: className, onClick$, ...props }) => {
  return (
    <button 
      class={['btn btn-outline h-fit min-h-8', className]} 
      onClick$={onClick$}
      {...props}
    >
      <Slot />
    </button>
  );
});
