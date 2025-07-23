import { component$, useSignal, useTask$ } from '@builder.io/qwik';

export interface ShareSnippetProps {
  content: string;          // full string to copy
  type?: 'url' | 'code';    // visual hint
  class?: string;           // extra wrapper classes
}

export const UrlCopy = component$<ShareSnippetProps>(
  ({ content, type = 'code', class: extraClass = '' }) => {
    const copied = useSignal(false);

    // auto-reset the “copied” state
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
          'card bg-base-200 border border-base-300 rounded-box p-3 w-full',
          extraClass,
        ]}
      >
        <div class="flex items-start gap-2">
          {/* scrollable preview */}
          <pre
            class={[
              'flex-1 text-sm font-mono text-base-content bg-transparent',
              'max-h-32 overflow-auto whitespace-pre-wrap break-all',
            ]}
          >
            {content}
          </pre>

          {/* copy button */}
          <button
            type="button"
            class="btn btn-sm btn-ghost btn-square shrink-0"
            aria-label="Copy to clipboard"
            onClick$={async () => {
              await navigator.clipboard.writeText(content);
              copied.value = true;
            }}
          >
            {copied.value ? '✅' : '📋'}
          </button>

          {/* optional “open” for URLs */}
          {type === 'url' && (
            <a
              href={content}
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-sm btn-ghost btn-square shrink-0"
              aria-label="Open in new tab"
            >
              🔗
            </a>
          )}
        </div>

        {/* inline toast */}
        {copied.value && (
          <div class="alert alert-success py-1 px-2 mt-2 text-xs">
            Copied to clipboard!
          </div>
        )}
      </div>
    );
  }
);
