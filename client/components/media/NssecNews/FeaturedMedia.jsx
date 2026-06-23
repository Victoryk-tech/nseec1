import Image from 'next/image'

export default function FeaturedMedia({post}) {
  const {featuredMediaType, featuredImageCloudinaryUrl, featuredImage, featuredVideo} = post

  if (featuredMediaType === 'video' && featuredVideo?.url) {
    return <FeaturedVideo video={featuredVideo} />
  }

  const imgSrc = featuredImageCloudinaryUrl || featuredImage?.url || post.imageUrl
  if (!imgSrc) return null

  return (
    <figure className="relative w-full h-[55vh] min-h-[380px] max-h-[640px] overflow-hidden bg-gray-100">
      <Image
        src={imgSrc}
        alt={featuredImage?.alt || post.title}
        fill
        className="object-cover"
        priority
        unoptimized={!!(featuredImageCloudinaryUrl || post.imageUrl)}
      />
      {featuredImage?.caption && (
        <figcaption className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs text-center py-2 px-4">
          {featuredImage.caption}
        </figcaption>
      )}
    </figure>
  )
}

function FeaturedVideo({video}) {
  if (video.provider === 'youtube') {
    const id = extractYouTubeId(video.url)
    if (id) {
      return (
        <div className="relative w-full aspect-video max-h-[640px] bg-black">
          <iframe
            src={`https://www.youtube.com/embed/${id}`}
            title={video.caption || 'Featured Video'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>
      )
    }
  }

  if (video.provider === 'vimeo') {
    const id = extractVimeoId(video.url)
    if (id) {
      return (
        <div className="relative w-full aspect-video max-h-[640px] bg-black">
          <iframe
            src={`https://player.vimeo.com/video/${id}`}
            title={video.caption || 'Featured Video'}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>
      )
    }
  }

  // Cloudinary or direct URL
  return (
    <div className="relative w-full max-h-[640px] bg-black">
      <video
        src={video.url}
        controls
        poster={video.thumbnail}
        className="w-full max-h-[640px] object-contain"
      >
        <source src={video.url} />
      </video>
      {video.caption && (
        <p className="text-xs text-center text-gray-500 mt-2 pb-2">{video.caption}</p>
      )}
    </div>
  )
}

function extractYouTubeId(url) {
  try {
    const u = new URL(url)
    return u.searchParams.get('v') || u.pathname.split('/').pop()
  } catch {
    return null
  }
}

function extractVimeoId(url) {
  try {
    const u = new URL(url)
    return u.pathname.split('/').filter(Boolean).pop()
  } catch {
    return null
  }
}
