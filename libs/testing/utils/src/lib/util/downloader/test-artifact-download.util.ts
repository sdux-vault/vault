/**
 * Downloads a JSON test artifact as a timestamped file via a temporary anchor element.
 *
 * @param filename - Base name for the downloaded file.
 * @param fileExtension - File extension appended to the filename.
 * @param data - Data payload serialized as JSON.
 */
export function testArtifactDownloader(
  filename: string,
  fileExtension: string,
  data: unknown
): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: 'application/json'
  });

  const url = URL.createObjectURL(blob);

  const anchor = document.createElement('a');
  anchor.href = url;

  anchor.download = `${filename}-${Date.now()}.${fileExtension}`;

  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);

  URL.revokeObjectURL(url);
}
