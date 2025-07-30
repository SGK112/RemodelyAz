'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import clsx from 'clsx'

interface SafeImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  className?: string
  sizes?: string
  priority?: boolean
  onClick?: () => void
  fallbackSrc?: string
  showPlaceholder?: boolean
  aspectRatio?: string
}

const SafeImage = ({
  src,
  alt,
  width,
  height,
  fill = false,
  className = '',
  sizes,
  priority = false,
  onClick,
  fallbackSrc,
  showPlaceholder = true,
  aspectRatio = 'aspect-[4/3]'
}: SafeImageProps) => {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [currentSrc, setCurrentSrc] = useState(src)

  // Check if this is a CDN image that might cause 502 errors
  const isCDNImage = src.includes('cdn.prod.website-files.com')
  const shouldUseDirectImage = isCDNImage && process.env.NODE_ENV === 'production'

  useEffect(() => {
    setCurrentSrc(src)
    setHasError(false)
    setIsLoading(true)
  }, [src])

  const handleLoad = () => {
    // Add small delay to prevent flickering
    setTimeout(() => {
      setIsLoading(false)
    }, 50)
  }
  const handleError = () => {
    setIsLoading(false)
    setHasError(true)

    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc)
      setHasError(false)
      setIsLoading(true)
    }
  }

  // Generate a simple placeholder based on dimensions
  const placeholderDataUrl = `data:image/svg+xml;base64,${btoa(`
    <svg width="${width || 400}" height="${height || 300}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f3f4f6"/>
      <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#9ca3af" font-family="Arial, sans-serif" font-size="14">
        ${hasError ? 'Failed to load' : 'Loading...'}
      </text>
    </svg>
  `)}`

  // For CDN images that might cause 502 errors, use direct img tag
  if (shouldUseDirectImage) {
    return (
      <div
        className={clsx('relative overflow-hidden bg-gray-100', aspectRatio, className)}
        onClick={onClick}
      >
        {/* Loading/Error Placeholder */}
        {(isLoading || hasError) && showPlaceholder && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            {isLoading ? (
              <div className="animate-pulse bg-gray-200 w-full h-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-gray-400 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              </div>
            ) : (
              <div className="text-center p-4">
                <svg
                  className="w-8 h-8 text-gray-400 mx-auto mb-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L4.316 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
                <p className="text-xs text-gray-500">Image not available</p>
              </div>
            )}
          </div>
        )}

        {/* Direct img tag for CDN images */}
        {!hasError && (
          <img
            src={currentSrc}
            alt={alt}
            className={clsx(
              'transition-opacity duration-300 w-full h-full object-cover',
              isLoading ? 'opacity-0' : 'opacity-100'
            )}
            onLoad={handleLoad}
            onError={handleError}
          />
        )}
      </div>
    )
  }

  return (
    <div
      className={clsx('relative overflow-hidden bg-gray-100', aspectRatio, className)}
      onClick={onClick}
    >
      {/* Loading/Error Placeholder */}
      {(isLoading || hasError) && showPlaceholder && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          {isLoading ? (
            <div className="animate-pulse bg-gray-200 w-full h-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-gray-400 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </div>
          ) : (
            <div className="text-center p-4">
              <svg
                className="w-8 h-8 text-gray-400 mx-auto mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L4.316 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
              <p className="text-xs text-gray-500">Image not available</p>
            </div>
          )}
        </div>
      )}

      {/* Next.js Image for other sources */}
      {!hasError && (
        <Image
          src={currentSrc}
          alt={alt}
          width={width}
          height={height}
          fill={fill}
          sizes={sizes}
          priority={priority}
          className={clsx(
            'transition-opacity duration-300',
            isLoading ? 'opacity-0' : 'opacity-100',
            fill ? 'object-cover' : ''
          )}
          onLoad={handleLoad}
          onError={handleError}
          placeholder="blur"
          blurDataURL={placeholderDataUrl}
        />
      )}
    </div>
  )
}

export default SafeImage
