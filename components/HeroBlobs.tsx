/**
 * HeroBlobs – decorative animated background blobs.
 *
 * Place this inside any container that has `position: relative`.
 * The blobs use `position: absolute` and will fill the parent's dimensions.
 */
export default function HeroBlobs() {
  return (
    <>
      <div className="hero-blob hero-blob-1" />
      <div className="hero-blob hero-blob-2" />
      <div className="hero-blob hero-blob-3" />
    </>
  )
}