import lzString from 'lz-string';

export function compressAndLogState<T>(state: T, label: string = "State"): string {
  const jsonString = JSON.stringify(state);
  console.log(`${label} - Original JSON:`, jsonString);

  const compressed = lzString.compressToEncodedURIComponent(jsonString);
  console.log(`${label} - Compressed URL parameter:`, compressed);

  console.log(`${label} - Size reduction: ${jsonString.length} → ${compressed.length} chars (${Math.round((1 - compressed.length / jsonString.length) * 100)}% reduction)`);

  const decompressedJson = lzString.decompressFromEncodedURIComponent(compressed);
  console.log(`${label} - Decompressed JSON:`, decompressedJson);

  return compressed;
}

export function decompressState<T>(compressed: string): T {
  const decompressedJson = lzString.decompressFromEncodedURIComponent(compressed);
  return JSON.parse(decompressedJson) as T;
}
