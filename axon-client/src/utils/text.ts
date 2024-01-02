export function truncateMiddle(text: string, maxLength: number) {
  if (text.length <= maxLength) {
    return text;
  }

  const halfLength = Math.floor(maxLength / 2);

  return `${text.substring(0, halfLength)}...${text.substring(
    text.length - halfLength
  )}`;
}

export const copyToClipboard = (text: string): void => {
  if (!navigator.clipboard) {
    console.error("Clipboard API not supported.");
    return;
  }
  navigator.clipboard
    .writeText(text)
    .then(() => {})
    .catch((_) => {});
};
