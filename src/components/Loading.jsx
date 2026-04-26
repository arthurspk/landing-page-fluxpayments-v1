import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import logoPrincipal from '../assets/logos/logo-principal.png'
import { useTranslation } from '../i18n/useTranslation'

export default function Loading({ onFinish }) {
  const { t } = useTranslation()
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const duration = 2200
    const interval = 20
    const step = 100 / (duration / interval)
    let current = 0

    const timer = setInterval(() => {
      current += step + Math.random() * step * 0.5
      if (current >= 100) {
        current = 100
        clearInterval(timer)
        setTimeout(() => {
          setVisible(false)
          setTimeout(() => onFinish?.(), 600)
        }, 400)
      }
      setProgress(Math.min(current, 100))
    }, interval)

    return () => clearInterval(timer)
  }, [onFinish])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="loading"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <div className="loading__bg">
            <div className="loading__orb loading__orb--1" />
            <div className="loading__orb loading__orb--2" />
            <div className="loading__orb loading__orb--3" />
            <div className="loading__grid" />
          </div>

          <div className="loading__content">
            <motion.div
              className="loading__logo-wrapper"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <div className="loading__logo-ring">
                <svg viewBox="0 0 180 180" className="loading__ring-svg">
                  <circle
                    cx="90" cy="90" r="84"
                    fill="none"
                    stroke="rgba(59, 130, 246, 0.1)"
                    strokeWidth="2"
                  />
                  <circle
                    cx="90" cy="90" r="84"
                    fill="none"
                    stroke="url(#ring-gradient)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeDasharray={`${progress * 5.28} 528`}
                    className="loading__ring-progress"
                  />
                  <defs>
                    <linearGradient id="ring-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#60a5fa" />
                      <stop offset="50%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#1d4ed8" />
                    </linearGradient>
                  </defs>
                </svg>
                <img src={logoPrincipal} alt="Flux Payments" className="loading__logo-img" />
              </div>
            </motion.div>

            <motion.div
              className="loading__bar-container"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 200, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <div className="loading__bar-track">
                <motion.div
                  className="loading__bar-fill"
                  style={{ width: `${progress}%` }}
                />
                <div className="loading__bar-glow" style={{ left: `${progress}%` }} />
              </div>
            </motion.div>

            <motion.p
              className="loading__text"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              {progress < 100 ? t('loading.loading') : t('loading.ready')}
            </motion.p>
          </div>

          <style>{`
            .loading {
              position: fixed;
              inset: 0;
              z-index: 99999;
              display: flex;
              align-items: center;
              justify-content: center;
              background: #030712;
            }

            .loading__bg {
              position: absolute;
              inset: 0;
              overflow: hidden;
            }

            .loading__orb {
              position: absolute;
              border-radius: 50%;
              filter: blur(80px);
            }

            .loading__orb--1 {
              width: 400px;
              height: 400px;
              top: -10%;
              left: 50%;
              transform: translateX(-50%);
              background: radial-gradient(circle, rgba(37, 99, 235, 0.25) 0%, transparent 70%);
              animation: loading-float 4s ease-in-out infinite;
            }

            .loading__orb--2 {
              width: 300px;
              height: 300px;
              bottom: 10%;
              left: 10%;
              background: radial-gradient(circle, rgba(29, 78, 216, 0.2) 0%, transparent 70%);
              animation: loading-float 5s ease-in-out infinite reverse;
            }

            .loading__orb--3 {
              width: 250px;
              height: 250px;
              top: 30%;
              right: 10%;
              background: radial-gradient(circle, rgba(96, 165, 250, 0.15) 0%, transparent 70%);
              animation: loading-float 6s ease-in-out infinite;
            }

            @keyframes loading-float {
              0%, 100% { transform: translate(0, 0); }
              50% { transform: translate(20px, -15px); }
            }

            .loading__grid {
              position: absolute;
              inset: 0;
              background-image:
                linear-gradient(rgba(59, 130, 246, 0.04) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59, 130, 246, 0.04) 1px, transparent 1px);
              background-size: 40px 40px;
              mask-image: radial-gradient(ellipse at 50% 50%, black 20%, transparent 70%);
              -webkit-mask-image: radial-gradient(ellipse at 50% 50%, black 20%, transparent 70%);
            }

            .loading__content {
              position: relative;
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 28px;
            }

            .loading__logo-wrapper {
              position: relative;
            }

            .loading__logo-ring {
              position: relative;
              width: 180px;
              height: 180px;
              display: flex;
              align-items: center;
              justify-content: center;
            }

            .loading__ring-svg {
              position: absolute;
              inset: 0;
              width: 100%;
              height: 100%;
              transform: rotate(-90deg);
            }

            .loading__ring-progress {
              transition: stroke-dasharray 0.1s ease;
            }

            .loading__logo-img {
              height: 42px;
              width: auto;
              position: relative;
              z-index: 1;
              animation: loading-pulse 2s ease-in-out infinite;
            }

            @keyframes loading-pulse {
              0%, 100% { opacity: 0.8; filter: brightness(1); }
              50% { opacity: 1; filter: brightness(1.3); }
            }

            .loading__bar-container {
              display: flex;
              justify-content: center;
            }

            .loading__bar-track {
              width: 200px;
              height: 3px;
              background: rgba(59, 130, 246, 0.1);
              border-radius: 10px;
              overflow: visible;
              position: relative;
            }

            .loading__bar-fill {
              height: 100%;
              border-radius: 10px;
              background: linear-gradient(90deg, #1d4ed8, #3b82f6, #60a5fa);
              transition: width 0.1s ease;
              position: relative;
            }

            .loading__bar-glow {
              position: absolute;
              top: 50%;
              transform: translate(-50%, -50%);
              width: 8px;
              height: 8px;
              border-radius: 50%;
              background: #60a5fa;
              box-shadow: 0 0 12px #3b82f6, 0 0 24px rgba(59, 130, 246, 0.4);
              transition: left 0.1s ease;
            }

            .loading__text {
              font-family: 'Inter', sans-serif;
              font-size: 13px;
              font-weight: 500;
              color: rgba(148, 163, 184, 0.7);
              letter-spacing: 2px;
              text-transform: uppercase;
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
