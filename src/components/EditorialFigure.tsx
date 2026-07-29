import Image from 'next/image'

import type { EditorialImage } from '@/content/types'

export function EditorialFigure({
  image,
  priority = false,
  variant = 'inline',
}: {
  image: EditorialImage
  priority?: boolean
  variant?: 'inline' | 'lead'
}) {
  const sizes = variant === 'lead' ? '(max-width: 780px) 100vw, 1200px' : '(max-width: 780px) 100vw, 730px'

  return (
    <figure className={`editorial-figure editorial-figure-${variant}`}>
      <div className="editorial-image-frame">
        <Image alt={image.alt} fill priority={priority} sizes={sizes} src={image.src} />
      </div>
      <figcaption>
        <span>{image.caption}</span>
        <span className="image-credit">
          Photo: <a href={image.sourceUrl} target="_blank" rel="noopener noreferrer">{image.credit}</a>
          <span aria-hidden="true"> / </span>
          <a href={image.licenseUrl} target="_blank" rel="noopener noreferrer">{image.licenseName}</a>
        </span>
      </figcaption>
    </figure>
  )
}
