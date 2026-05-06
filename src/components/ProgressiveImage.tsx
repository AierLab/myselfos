import { useMemo, useState } from 'react';

type ProgressiveImageProps = {
    src: string;
    alt: string;
    className?: string;
    wrapperClassName?: string;
    sizes?: string;
    loading?: 'eager' | 'lazy';
    fetchPriority?: 'high' | 'low' | 'auto';
};

function toLqipPath(src: string) {
    if (!src.startsWith('/assets/') || src.includes('/assets/lqip/')) return src;
    return src.replace('/assets/', '/assets/lqip/');
}

function toWebpPath(src: string) {
    if (!/\.(jpe?g|png)$/i.test(src)) return undefined;
    return src.replace(/\.(jpe?g|png)$/i, '.webp');
}

export default function ProgressiveImage({
    src,
    alt,
    className,
    wrapperClassName,
    sizes,
    loading = 'lazy',
    fetchPriority = 'auto',
}: ProgressiveImageProps) {
    const [loaded, setLoaded] = useState(false);
    const placeholderSrc = useMemo(() => toLqipPath(src), [src]);
    const webpSrc = useMemo(() => toWebpPath(src), [src]);

    return (
        <div className={`relative overflow-hidden ${wrapperClassName ?? ''}`}>
            {placeholderSrc !== src && (
                <img
                    src={placeholderSrc}
                    alt=""
                    aria-hidden="true"
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${loaded ? 'opacity-0' : 'opacity-100'}`}
                    loading="eager"
                    decoding="async"
                />
            )}

            <picture>
                {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
                <img
                    src={src}
                    alt={alt}
                    sizes={sizes}
                    loading={loading}
                    decoding="async"
                    fetchPriority={fetchPriority}
                    onLoad={() => setLoaded(true)}
                    onError={() => setLoaded(true)}
                    className={`block transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'} ${className ?? ''}`}
                />
            </picture>
        </div>
    );
}