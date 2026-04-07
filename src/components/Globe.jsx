import { useEffect, useRef } from 'react'
import createGlobe from 'cobe'
import { motion } from 'framer-motion'

export default function GlobeSection() {
  const canvasRef = useRef(null)
  const pointerInteracting = useRef(null)
  const pointerInteractionMovement = useRef(0)
  const phiRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const isMobile = window.innerWidth <= 768
    const globeSize = isMobile ? 600 : 1400
    const globeOffset = [0, 0]

    const globeInstance = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: globeSize,
      height: globeSize,
      phi: 0,
      theta: 0.2,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 20000,
      mapBrightness: 6,
      mapBaseBrightness: 0.05,
      baseColor: [0.02, 0.05, 0.2],
      markerColor: [0.3, 0.55, 1.0],
      glowColor: [0.04, 0.1, 0.3],
      markers: [
        { location: [37.7749, -122.4194], size: 0.04 },
        { location: [40.7128, -74.006], size: 0.04 },
        { location: [51.5074, -0.1278], size: 0.03 },
        { location: [48.8566, 2.3522], size: 0.03 },
        { location: [35.6762, 139.6503], size: 0.03 },
        { location: [-23.5505, -46.6333], size: 0.05 },
        { location: [1.3521, 103.8198], size: 0.03 },
        { location: [55.7558, 37.6173], size: 0.03 },
        { location: [-33.8688, 151.2093], size: 0.03 },
        { location: [19.4326, -99.1332], size: 0.03 },
        { location: [28.6139, 77.209], size: 0.04 },
        { location: [-34.6037, -58.3816], size: 0.03 },
        { location: [31.2304, 121.4737], size: 0.04 },
        { location: [-22.9068, -43.1729], size: 0.04 },
        { location: [-15.7801, -47.9292], size: 0.04 },
        { location: [52.52, 13.405], size: 0.03 },
        { location: [22.3193, 114.1694], size: 0.03 },
        { location: [34.0522, -118.2437], size: 0.03 },
      ],
      arcs: [
        { from: [-23.5505, -46.6333], to: [40.7128, -74.006] },
        { from: [-15.7801, -47.9292], to: [48.8566, 2.3522] },
        { from: [51.5074, -0.1278], to: [35.6762, 139.6503] },
        { from: [37.7749, -122.4194], to: [22.3193, 114.1694] },
        { from: [40.7128, -74.006], to: [51.5074, -0.1278] },
        { from: [-33.8688, 151.2093], to: [1.3521, 103.8198] },
        { from: [28.6139, 77.209], to: [1.3521, 103.8198] },
        { from: [52.52, 13.405], to: [-22.9068, -43.1729] },
        { from: [-34.6037, -58.3816], to: [19.4326, -99.1332] },
        { from: [31.2304, 121.4737], to: [55.7558, 37.6173] },
        { from: [34.0522, -118.2437], to: [48.8566, 2.3522] },
        { from: [-23.5505, -46.6333], to: [28.6139, 77.209] },
        { from: [22.3193, 114.1694], to: [-33.8688, 151.2093] },
        { from: [37.5665, 126.978], to: [35.6762, 139.6503] },
        { from: [41.9028, 12.4964], to: [34.0522, -118.2437] },
      ],
      arcColor: [0.2, 0.5, 1.0],
      offset: globeOffset,
    })

    let animationId
    const animate = () => {
      animationId = requestAnimationFrame(animate)
      if (!pointerInteracting.current) {
        phiRef.current += 0.003
      }
      globeInstance.update({
        phi: phiRef.current + pointerInteractionMovement.current,
      })
    }
    animate()

    return () => {
      cancelAnimationFrame(animationId)
      globeInstance.destroy()
    }
  }, [])

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
              Seu negócio conectado
              <br />
              <span className="gradient-text">ao mundo inteiro</span>
            </h2>
            <p className="section-subtitle">
              Com a Flux Payments, você aceita pagamentos de mais de 180 países,
              em múltiplas moedas, com conversão automática e as melhores taxas
              do mercado internacional.
            </p>

            <div className="globe-section__highlights">
              <div className="globe-section__highlight">
                <div className="globe-section__highlight-dot" />
                <span>Américas, Europa e Ásia</span>
              </div>
              <div className="globe-section__highlight">
                <div className="globe-section__highlight-dot" />
                <span>+35 moedas suportadas</span>
              </div>
              <div className="globe-section__highlight">
                <div className="globe-section__highlight-dot" />
                <span>Conversão automática</span>
              </div>
              <div className="globe-section__highlight">
                <div className="globe-section__highlight-dot" />
                <span>Liquidação em até 24h</span>
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
              onPointerDown={(e) => {
                pointerInteracting.current = e.clientX - pointerInteractionMovement.current
                canvasRef.current.style.cursor = 'grabbing'
              }}
              onPointerUp={() => {
                pointerInteracting.current = null
                canvasRef.current.style.cursor = 'grab'
              }}
              onPointerOut={() => {
                pointerInteracting.current = null
                canvasRef.current.style.cursor = 'grab'
              }}
              onPointerMove={(e) => {
                if (pointerInteracting.current !== null) {
                  const delta = e.clientX - pointerInteracting.current
                  pointerInteractionMovement.current = delta / 200
                }
              }}
              className="globe-canvas"
            />
          </motion.div>
        </div>
      </div>

      <style>{`
        .globe-section {
          padding: 80px 0;
          position: relative;
          overflow: hidden;
        }

        .globe-section__glow {
          display: none;
        }

        .globe-section__content {
          display: flex;
          align-items: center;
          gap: 0;
          min-height: 600px;
        }

        .globe-section__text {
          flex: 0 0 42%;
          position: relative;
          z-index: 2;
        }

        .globe-section__text .section-title {
          font-size: clamp(32px, 3.5vw, 48px);
        }

        .globe-section__text .section-subtitle {
          margin-bottom: 32px;
          font-size: 15px;
          max-width: 480px;
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
          white-space: nowrap;
        }

        .globe-section__highlight-dot {
          width: 10px;
          height: 10px;
          min-width: 10px;
          border-radius: 50%;
          background: var(--blue-400);
          box-shadow: 0 0 12px rgba(59, 130, 246, 0.6);
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .globe-section__highlight:nth-child(2) .globe-section__highlight-dot {
          animation-delay: 0.5s;
        }
        .globe-section__highlight:nth-child(3) .globe-section__highlight-dot {
          animation-delay: 1s;
        }
        .globe-section__highlight:nth-child(4) .globe-section__highlight-dot {
          animation-delay: 1.5s;
        }

        @keyframes pulse-glow {
          0%, 100% {
            opacity: 1;
            box-shadow: 0 0 12px rgba(59, 130, 246, 0.6);
            transform: scale(1);
          }
          50% {
            opacity: 0.4;
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.9);
            transform: scale(1.3);
          }
        }

        .globe-section__canvas-wrapper {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }

        .globe-canvas {
          width: 720px;
          height: 720px;
          cursor: grab;
          margin-right: -40px;
        }

        @media (max-width: 768px) {
          .globe-section {
            padding: 60px 0;
          }

          .globe-section__content {
            flex-direction: column;
            gap: 20px;
          }

          .globe-section__text {
            flex: none;
            width: 100%;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .globe-section__highlight {
            white-space: normal;
          }

          .globe-section__highlights {
            justify-items: start;
          }

          .globe-section__canvas-wrapper {
            width: 100%;
            justify-content: center;
          }

          .globe-canvas {
            width: min(300px, 90vw);
            height: min(300px, 90vw);
          }
        }
      `}</style>
    </section>
  )
}
