import { cn } from '@/lib/utils'
import { useTheme } from '@/contexts/ThemeContext'
import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

type DottedSurfaceProps = Omit<React.ComponentProps<'div'>, 'ref'>

export function DottedSurface({ className, ...props }: DottedSurfaceProps) {
  const { theme } = useTheme()
  const [isMobile, setIsMobile] = useState(false)

  const containerRef = useRef<HTMLDivElement | null>(null)
  const sceneRef = useRef<{
    scene: THREE.Scene
    camera: THREE.PerspectiveCamera
    renderer: THREE.WebGLRenderer
    particles: THREE.Points[]
    animationId: number
    count: number
  } | null>(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (!containerRef.current) return
    
    const container = containerRef.current

    // Optimized particles for both mobile and web performance
    const SEPARATION = isMobile ? 200 : 180
    const AMOUNTX = isMobile ? 20 : 30
    const AMOUNTY = isMobile ? 30 : 45

    // Scene setup
    const scene = new THREE.Scene()
    // Reduced fog for better visibility
    scene.fog = new THREE.Fog(0x0a0a0f, 1000, 8000)

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      10000,
    )
    camera.position.set(0, 355, 1220)

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile, // Enable antialiasing on web for smooth appearance
      powerPreference: 'high-performance',
    })
    // Limit pixel ratio for performance but keep smooth appearance
    renderer.setPixelRatio(isMobile ? Math.min(window.devicePixelRatio, 1.5) : Math.min(window.devicePixelRatio, 2.5))
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(scene.fog.color, 0)

    container.appendChild(renderer.domElement)

    // Create particles
    const positions: number[] = []
    const colors: number[] = []

    // Create geometry for all particles
    const geometry = new THREE.BufferGeometry()

    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        const x = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2
        const y = 0 // Will be animated
        const z = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2

        positions.push(x, y, z)
        if (theme === 'dark') {
          // Using the new primary blue colors (#0066FF)
          colors.push(0, 102, 255) // Primary blue #0066FF
        } else {
          colors.push(0, 102, 255) // Primary blue for light theme too
        }
      }
    }

    geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(positions, 3),
    )
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))

    // Create material - original smooth appearance with performance optimization
    const material = new THREE.PointsMaterial({
      size: isMobile ? 6 : 8, // Original size for smooth appearance
      vertexColors: true,
      transparent: true,
      opacity: isMobile ? 0.6 : 0.8, // Original opacity for smooth glow
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending, // Additive blending for glow effect
    })

    // Create points object
    const points = new THREE.Points(geometry, material)
    scene.add(points)

    let count = 0
    let animationId = 0

    // Animation function - optimized for performance on all devices
    let lastFrameTime = 0
    const targetFPS = 60 // Target 60 FPS for smooth animation
    const frameInterval = 1000 / targetFPS

    const animate = (currentTime: number) => {
      animationId = requestAnimationFrame(animate)

      // Throttle animation for consistent performance
      if (currentTime - lastFrameTime < frameInterval) {
        return
      }
      lastFrameTime = currentTime

      const positionAttribute = geometry.attributes.position
      const positions = positionAttribute.array as Float32Array

      let i = 0
      const speed = isMobile ? 0.05 : 0.1 // Original smooth speed
      const amplitude = isMobile ? 30 : 50 // Original smooth amplitude
      
      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          const index = i * 3

          // Animate Y position with sine waves
          positions[index + 1] =
            Math.sin((ix + count) * 0.3) * amplitude +
            Math.sin((iy + count) * 0.5) * amplitude

          i++
        }
      }

      positionAttribute.needsUpdate = true

      renderer.render(scene, camera)
      count += speed
    }

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    // Start animation
    animate(0)

    // Store references
    sceneRef.current = {
      scene,
      camera,
      renderer,
      particles: [points],
      animationId: animationId,
      count,
    }

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize)
      
      cancelAnimationFrame(animationId)

      if (sceneRef.current) {
        // Clean up Three.js objects
        sceneRef.current.scene.traverse((object: THREE.Object3D) => {
          if (object instanceof THREE.Points) {
            object.geometry.dispose()
            if (Array.isArray(object.material)) {
              object.material.forEach((material: THREE.Material) => material.dispose())
            } else {
              object.material.dispose()
            }
          }
        })

        sceneRef.current.renderer.dispose()

        if (container && sceneRef.current.renderer.domElement) {
          container.removeChild(sceneRef.current.renderer.domElement)
        }
      }
    }
  }, [theme, isMobile])

  return (
    <div
      ref={containerRef}
      className={cn('pointer-events-none fixed inset-0 -z-10', className)}
      {...props}
    />
  )
}
