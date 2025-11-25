import React, { useEffect, useRef, useState } from "react";

/**
 * VideoPlayer
 * - lazy-loads video sources with IntersectionObserver
 * - shows poster fallback image until loaded
 * - sets `playsInline` and `muted` to enable autoplay on mobile previews
 * - in modal (`isModal`) it preloads and enables controls and autoplay where appropriate
 */
function VideoPlayer({ src, poster, isModal = false, controls = false, className = "", style = {}, autoPlayPreview = true }) {
  const wrapperRef = useRef(null);
  const videoRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(Boolean(isModal));
  const [error, setError] = useState(null);

  useEffect(() => {
    if (shouldLoad) return;

    if (isModal) {
      setShouldLoad(true);
      return;
    }

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      // Server-side or old browser: load immediately
      setShouldLoad(true);
      return;
    }

    const node = wrapperRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: "200px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [isModal, shouldLoad]);

  useEffect(() => {
    if (!shouldLoad || !videoRef.current) return;

    const v = videoRef.current;
    // Reset error state when (re)loading a source
    setError(null);

    // For preview (non-modal) attempt muted autoplay/loop
    if (!isModal && autoPlayPreview) {
      v.muted = true;
      v.playsInline = true;
      v.loop = true;
      const p = v.play?.();
      if (p && typeof p.then === "function") p.catch(() => {});
    }

    // When the video is ready to play, clear loading and try play if autoplay intended
    const handleCanPlay = () => {
      if (isModal) {
        // ensure muted for autoplay policy
        v.muted = true;
        const p = v.play?.();
        if (p && typeof p.then === "function") p.catch(() => {});
      }
    };

    const handleError = () => setError("Erreur de chargement de la vidéo");

    v.addEventListener("canplay", handleCanPlay);
    v.addEventListener("loadeddata", handleCanPlay);
    v.addEventListener("error", handleError);

    return () => {
      v.removeEventListener("canplay", handleCanPlay);
      v.removeEventListener("loadeddata", handleCanPlay);
      v.removeEventListener("error", handleError);
    };
  }, [shouldLoad, isModal, autoPlayPreview]);

  // Determine whether the video should be muted for autoplay to be allowed by browsers.
  // Autoplay with sound is commonly blocked, so when we intend to autoplay (e.g. in modal previews)
  // we mute the video. For non-autoplay previews we keep behaviour as before.
  const mutedForAutoplay = isModal || !controls;

  // If no video source provided, show poster image only
  if (!src) {
    return (
      <div ref={wrapperRef} className={className} style={{ ...style }}>
        <img src={poster} alt="project" style={{ width: "100%", display: "block" }} />
      </div>
    );
  }

  return (
    <div ref={wrapperRef} className={className} style={{ width: "100%", ...style }}>
      {shouldLoad ? (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          controls={controls}
          preload={isModal ? "metadata" : "metadata"}
          playsInline
          muted={mutedForAutoplay}
          loop={!controls}
          autoPlay={isModal ? true : undefined}
          style={{ width: "100%", height: "auto", borderRadius: "12px", background: "#181824" }}
        >
          <source src={src} type="video/mp4" />
        </video>
      ) : (
        <img src={poster} alt="project" style={{ width: "100%", display: "block" }} />
      )}

      {error && (
        <div style={{ padding: 12, color: "#fff", background: "#b00020", borderRadius: 8, marginTop: 8 }}>
          {error}. <a href={src} target="_blank" rel="noreferrer" style={{ color: "#fff", textDecoration: "underline" }}>Ouvrir la vidéo</a>
        </div>
      )}

      {/* Fallback link in case the browser can't play the video */}
      <div style={{ display: shouldLoad ? "none" : "block" }}>
        <noscript>
          <img src={poster} alt="project" style={{ width: "100%" }} />
        </noscript>
      </div>
    </div>
  );
}

export default VideoPlayer;
