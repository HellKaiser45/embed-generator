import { component$, useSignal, useTask$ } from '@builder.io/qwik';

export interface UrlCopyProps {
  content: string;
  class?: string;
  title?: string;
}

export const UrlCopy = component$<UrlCopyProps>(
  ({ content, class: extraClass = '', title = 'Copy' }) => {
    const copied = useSignal(false);

    useTask$(({ track }) => {
      track(() => copied.value);
      if (copied.value) {
        const t = setTimeout(() => (copied.value = false), 1500);
        return () => clearTimeout(t);
      }
    });

    return (
      <div
        class={[
          'relative bg-base-200 border border-base-300 rounded-md',
          'w-full max-w-md mx-auto',
          'group',
          extraClass,
        ]}
      >
        {/* Subtle copy button - only visible on hover */}
        <button
          type="button"
          class={[
            'absolute top-1 right-1 btn btn-xs btn-circle btn-ghost',
            'opacity-0 group-hover:opacity-60 hover:!opacity-100',
            'transition-opacity duration-200',
            'z-10',
          ]}
          aria-label={title}
          onClick$={async () => {
            try {
              await navigator.clipboard.writeText(content);
              copied.value = true;
            } catch (err) {
              // Fallback for older browsers
              const textArea = document.createElement('textarea');
              textArea.value = content;
              document.body.appendChild(textArea);
              textArea.select();
              try {
                document.execCommand('copy');
                copied.value = true;
              } catch {}
              document.body.removeChild(textArea);
            }
          }}
        >
          <span class="text-xs">{copied.value ? '✓' : '📋'}</span>
        </button>

        {/* Scrollable content area - limited height */}
        <div class="p-2">
          <pre
            class={[
              'text-xs font-mono text-base-content',
              'bg-transparent border-0 p-0 m-0',
              'max-h-32 overflow-auto whitespace-pre-wrap break-all',
              'scrollbar-thin scrollbar-thumb-base-300 scrollbar-track-transparent',
            ]}
          >
            {content}
          </pre>
        </div>

        {/* Subtle success indicator - appears briefly */}
        {copied.value && (
          <div class={[
            'absolute -top-1 -right-1',
            'w-2 h-2 bg-success rounded-full',
            'animate-ping',
          ]}></div>
        )}
      </div>
    );
  }
);
