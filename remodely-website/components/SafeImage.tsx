import Image from 'next/image'
import { useState } from 'react'

interface SafeImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  fill?: boolean
  sizes?: string
  priority?: boolean
  fallbackSrc?: string
}

const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  fill,
  sizes,
  priority,
  fallbackSrc
}) => {
  const [imgSrc, setImgSrc] = useState(src)
  const [hasError, setHasError] = useState(false)

  const handleError = () => {
    if (!hasError) {
      setHasError(true)
      if (fallbackSrc) {
        setImgSrc(fallbackSrc)
      } else {
        // Use a simple placeholder SVG for fallback
        setImgSrc(`data:image/svg+xml;base64,${btoa(`
          <svg width="${width || 150}" height="${height || 150}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder">
            <rect width="100%" height="100%" fill="#f3f4f6"/>
            <text x="50%" y="50%" font-family="sans-serif" font-size="14" fill="#9ca3af" text-anchor="middle" dy=".3em">Image</text>
          </svg>
        `)}`)
      }
    }
  }

  // In production, use regular img tag to avoid Next.js image optimization issues
  if (process.env.NODE_ENV === 'production') {
    return (
      <img
        src={imgSrc}
        alt={alt}
        width={width}
        height={height}
        className={className}
        onError={handleError}
        loading={priority ? 'eager' : 'lazy'}
      />
    )
  }

  // In development, use Next.js Image component
  const imageProps: any = {
    src: imgSrc,
    alt,
    className,
    onError: handleError,
    priority
  }

  if (fill) {
    imageProps.fill = true
    imageProps.sizes = sizes
  } else {
    imageProps.width = width
    imageProps.height = height
  }

  return <Image {...imageProps} />
}

export default SafeImage
