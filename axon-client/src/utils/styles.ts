export function applyOpacity(
  hexColor: string | undefined,
  opacity: number
): string | undefined {
  // Remove the "#" character from the beginning of the hex color
  if (hexColor) {
    hexColor = hexColor.replace(/^#/, "");

    // Parse the hex color to its RGB components
    const r = parseInt(hexColor.slice(0, 2), 16);
    const g = parseInt(hexColor.slice(2, 4), 16);
    const b = parseInt(hexColor.slice(4, 6), 16);

    // Return the color in rgba format with the specified opacity
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  return;
}

export function validateHexColor(hexColor: string): boolean {
  return /^#[0-9A-F]{6}([0-9A-F]{2})?$/i.test(hexColor);
}

