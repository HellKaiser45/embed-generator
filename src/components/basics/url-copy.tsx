import { component$, useSignal, useTask$ } from '@builder.io/qwik';

export interface UrlCopyProps {
  content: string;
  class?: string;
}

export const UrlCopy = component$<UrlCopyProps>(
  ({ content, class: extraClass = '' }) => {
    const copied = useSignal(false);

    useTask$(({ track }) => {
      track(() => copied.value);
      if (copied.value) {
        const t = setTimeout(() => (copied.value = false), 2000);
        return () => clearTimeout(t);
      }
    });

    return (
      <div
        class={[
          'relative card bg-base-200 border border-base-300 rounded-box',
          'w-full max-w-md mx-auto',
          extraClass,
        ]}
      >
        {/* subtle copy button */}
        <button
          type="button"
          class={[
            'absolute top-2 right-2 btn btn-xs btn-circle btn-ghost',
            'opacity-60 hover:opacity-100 hover:ring-2 hover:ring-primary',
            'transition-opacity duration-200',
          ]}
          aria-label="Copy to clipboard"
          onClick$={async () => {
            await navigator.clipboard.writeText(content);
            copied.value = true;
          }}
        >
          {copied.value ? '✅' : '📋'}
        </button>

        {/* scrollable code block */}
        <pre
          class={[
            'block text-sm font-mono text-base-content',
            'p-4 pt-10 max-h-48 overflow-auto whitespace-pre-wrap break-words',
          ]}
        >
          {content}
        </pre>

        {/* inline toast */}
        {copied.value && (
          <div class="alert alert-success py-1 px-2 mt-0 text-xs">
            Copied to clipboard!
          </div>
        )}
      </div>
    );
  }
);
