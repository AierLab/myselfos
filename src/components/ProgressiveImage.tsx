import { useEffect, useMemo, useState } from 'react';

type ProgressiveImageProps = {
    src: string;
    alt: string;
    className?: string;
    wrapperClassName?: string;
    sizes?: string;
    loading?: 'eager' | 'lazy';
    fetchPriority?: 'high' | 'low' | 'auto';
};

let lowResTotal = 0;
let lowResSettled = 0;
let lowResPhaseDone = false;
const lowResRegistry = new Set<string>();
const lowResSubscribers = new Set<() => void>();

function notifyLowResDone() {
    lowResSubscribers.forEach((fn) => fn());
}

function markLowResSettled() {
    lowResSettled += 1;
    if (!lowResPhaseDone && lowResSettled >= lowResTotal) {
        lowResPhaseDone = true;
        notifyLowResDone();
    }
}

function registerLowResPath(path: string) {
    if (!path || lowResRegistry.has(path)) return false;
    lowResRegistry.add(path);
    lowResTotal += 1;
    return true;
}

function toLqipPath(src: string) {
    if (!src.startsWith('/assets/') || src.includes('/assets/lqip/')) return src;
    return src.replace('/assets/', '/assets/lqip/');
}

function toLqipWebpPath(src: string) {
    if (!/\.(jpe?g|png)$/i.test(src)) return src;
    return src.replace(/\.(jpe?g|png)$/i, '.webp');
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
    fetchPriority = 'auto',
}: ProgressiveImageProps) {
    const [loaded, setLoaded] = useState(false);
    const placeholderJpgSrc = useMemo(() => toLqipPath(src), [src]);
    const placeholderWebpSrc = useMemo(() => toLqipWebpPath(placeholderJpgSrc), [placeholderJpgSrc]);
    const webpSrc = useMemo(() => toWebpPath(src), [src]);

    useEffect(() => {
        if (placeholderJpgSrc === src || lowResPhaseDone) {
            return;
        }

        const didRegister = registerLowResPath(placeholderWebpSrc);
        if (!didRegister) return;

        let settled = false;
        const settle = () => {
            if (settled) return;
            settled = true;
            markLowResSettled();
        };

        const img = new Image();
        img.decoding = 'async';
        img.onload = settle;
        img.onerror = () => {
            const fallback = new Image();
            fallback.decoding = 'async';
            fallback.onload = settle;
            fallback.onerror = settle;
            fallback.src = placeholderJpgSrc;
        };
        img.src = placeholderWebpSrc;

        return settle;
    }, [placeholderJpgSrc, placeholderWebpSrc, src]);

    return (
        <div className={`relative overflow-hidden ${wrapperClassName ?? ''}`}>
            {placeholderJpgSrc !== src && (
                <picture>
                    <source srcSet={placeholderWebpSrc} type="image/webp" />
                    <img
                        src={placeholderJpgSrc}
                        alt=""
                        aria-hidden="true"
                        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${loaded ? 'opacity-0' : 'opacity-100'}`}
                        loading="eager"
                        decoding="async"
                        fetchPriority="high"
                    />
                </picture>
            )}

            <picture>
                {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
                <img
                    src={src}
                    alt={alt}
                    sizes={sizes}
                    loading="lazy"
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