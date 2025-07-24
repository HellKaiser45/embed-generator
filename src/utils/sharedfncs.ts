import lzString from 'lz-string';

export function compressAndLogState<T>(state: T): string {
  const jsonString = JSON.stringify(state);

  const compressed = lzString.compressToEncodedURIComponent(jsonString);

  return compressed;
}

export function decompressState<T>(compressed: string): T {
  const decompressedJson = lzString.decompressFromEncodedURIComponent(compressed);
  return JSON.parse(decompressedJson) as T;
}

export function buildTransparentIframe(
  url: string,
  width: number | string,
  height: number | string
): string {
  const w = typeof width === 'number' ? `${width}px` : width;
  const h = typeof height === 'number' ? `${height}px` : height;

  return `<iframe
  src="${url}"
  width="${w}"
  height="${h}"
  
></iframe>`;
}
