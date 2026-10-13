// Display-size WebP versions live under /images/thumbs/, mirroring the
// original path: /images/design/x.jpg -> /images/thumbs/design/x-720.webp.
// They're generated from the originals (which stay for lightboxes and
// sharing), so regenerate them when adding or replacing an image.
export function thumb(src: string, width: number) {
  return src.replace(/^\/images\//, '/images/thumbs/').replace(/\.jpe?g$/i, `-${width}.webp`)
}

/** srcSet for full-page screenshots, available at 800 and 1200 wide. */
export function screenshotSrcSet(src: string) {
  return `${thumb(src, 800)} 800w, ${thumb(src, 1200)} 1200w`
}
