import { useEffect, useRef, useCallback } from 'react'
import createGlobe from 'cobe'
import { motion } from 'framer-motion'

export default function GlobeSection() {
  const canvasRef = useRef(null)
  const pointerInteracting = useRef(null)
  const pointerInteractionMovement = useRef(0)
  const phiRef = useRef(0)
  const globeRef = useRef(null)
  const frameRef = useRef(null)

  const setupGlobe = useCallback(() => {
    if (!canvasRef.current) return

    if (globeRef.current) {
      globeRef.current.destroy()
    }

    const container = canvasRef.current.parentElement
    const size = container.clientWidth

    canvasRef.current.width = size * 2
    canvasRef.current.height = size * 2
    canvasRef.current.style.width = size + 'px'
    canvasRef.current.style.height = size + 'px'

    globeRef.current = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: size * 2,
      height: size * 2,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 3,
      mapSamples: 16000,
      mapBrightness: 1.2,
      baseColor: [0.15, 0.2, 0.35],
      markerColor: [0.23, 0.51, 0.96],
      glowColor: [0.1, 0.2, 0.4],
      markers: [
        { location: [37.7749, -122.4194], size: 0.08 },
        { location: [40.7128, -74.006], size: 0.08 },
        { location: [51.5074, -0.1278], size: 0.07 },
        { location: [48.8566, 2.3522], size: 0.06 },
        { location: [35.6762, 139.6503], size: 0.07 },
        { location: [-23.5505, -46.6333], size: 0.08 },
        { location: [1.3521, 103.8198], size: 0.06 },
        { location: [55.7558, 37.6173], size: 0.06 },
        { location: [-33.8688, 151.2093], size: 0.06 },
        { location: [19.4326, -99.1332], size: 0.06 },
        { location: [28.6139, 77.209], size: 0.07 },
        { location: [-34.6037, -58.3816], size: 0.05 },
        { location: [31.2304, 121.4737], size: 0.07 },
        { location: [-22.9068, -43.1729], size: 0.06 },
      ],
      onRender: (state) => {
        if (!pointerInteracting.current) {
          phiRef.current += 0.003
        }
        state.phi = phiRef.current + pointerInteractionMovement.current
      },
    })
  }, [])

  useEffect(() => {
    // Small delay to ensure the container has rendered with its full size
    frameRef.current = requestAnimationFrame(() => {
      setupGlobe()
    })

    const handleResize = () => {
      setupGlobe()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      if (globeRef.current) {
        globeRef.current.destroy()
      }
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
      window.removeEventListener('resize', handleResize)
    }
  }, [setupGlobe])

  const onPointerDown = (e) => {
    pointerInteracting.current = e.clientX - pointerInteractionMovement.current
    if (canvasRef.current) canvasRef.current.style.cursor = 'grabbing'
  }

  const onPointerUp = () => {
    pointerInteracting.current = null
    if (canvasRef.current) canvasRef.current.style.cursor = 'grab'
  }

  const onPointerMove = (e) => {
    if (pointerInteracting.current !== null) {
      const delta = e.clientX - pointerInteracting.current
      pointerInteractionMovement.current = delta / 200
    }
  }

  return (
    <section id="globe" className="globe-section">
      <div className="globe-section__glow" />
      <div className="container">
        <div className="globe-section__content">
          <motion.div
            className="globe-section__text"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="section-badge">Cobertura Global</div>
            <h2 className="section-title">
              Seu negocio conectado
              <br />
              <span className="gradient-text">ao mundo inteiro</span>
            </h2>
            <p className="section-subtitle">
              Com a Flux Payments, voce aceita pagamentos de mais de 180 paises,
              em multiplas moedas, com conversao automatica e as melhores taxas
              do mercado internacional.
            </p>

            <div className="globe-section__highlights">
              <div className="globe-section__highlight">
                <div className="globe-section__highlight-dot" />
                <span>Americas, Europa e Asia</span>
              </div>
              <div className="globe-section__highlight">
                <div className="globe-section__highlight-dot" />
                <span>+35 moedas suportadas</span>
              </div>
              <div className="globe-section__highlight">
                <div className="globe-section__highlight-dot" />
                <span>Conversao automatica</span>
              </div>
              <div className="globe-section__highlight">
                <div className="globe-section__highlight-dot" />
                <span>Liquidacao em ate 24h</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="globe-section__canvas-wrapper"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <canvas
              ref={canvasRef}
              onPointerDown={onPointerDown}
              onPointerUp={onPointerUp}
              onPointerOut={onPointerUp}
              onPointerMove={onPointerMove}
              style={{ cursor: 'grab' }}
            />
          </motion.div>
        </div>
      </div>

      <style>{`
        .globe-section {
          padding: 100px 0;
          position: relative;
          overflow: hidden;
        }

        .globe-section__glow {
          position: absolute;
          top: 50%;
          right: 10%;
          transform: translateY(-50%);
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 60%);
          pointer-events: none;
        }

        .globe-section__content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }

        .globe-section__text .section-subtitle {
          margin-bottom: 32px;
        }

        .globe-section__highlights {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .globe-section__highlight {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          color: var(--text-secondary);
          font-weight: 500;
        }

        .globe-section__highlight-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--blue-500);
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
        }

        .globe-section__canvas-wrapper {
          position: relative;
          width: 100%;
          max-width: 500px;
          aspect-ratio: 1;
          margin: 0 auto;
        }

        .globe-section__canvas-wrapper canvas {
          display: block;
        }

        @media (max-width: 768px) {
          .globe-section__content {
            grid-template-columns: 1fr;
            gap: 40px;
            text-align: center;
          }

          .globe-section__text {
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .globe-section__highlights {
            justify-items: start;
          }

          .globe-section__canvas-wrapper {
            max-width: 320px;
          }
        }
      `}</style>
    </section>
  )
}
