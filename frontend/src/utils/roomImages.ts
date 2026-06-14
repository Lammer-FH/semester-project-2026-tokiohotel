export function resolveRoomImage(
  images: string[] | string | undefined,
  fallbackTitle: string = 'Room',
): string {
  if (Array.isArray(images) && images.length > 0) {
    return images[0];
  }

  if (typeof images === 'string' && images.length > 0) {
    const first = images.split(',')[0]?.trim();
    if (first) {
      return first.startsWith('/') ? first : `/${first}`;
    }
  }

  return `https://placehold.co/800x400?text=${encodeURIComponent(fallbackTitle)}`;
}
