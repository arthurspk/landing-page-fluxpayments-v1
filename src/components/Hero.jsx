import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Play, Shield, Zap, Globe } from 'lucide-react'

const typewriterWords = [
  'CRESÇA SEM LIMITES',
  'VENDA PARA O MUNDO',
  'ESCALE SEU NEGÓCIO',
  'RECEBA DE QUALQUER LUGAR',
]

function Typewriter() {
  const [wordIndex, setWordIndex] = useState(0)
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentWord = typewriterWords[wordIndex]
    let timeout

    if (!isDeleting) {
      if (text.length < currentWord.length) {
        timeout = setTimeout(() => setText(currentWord.slice(0, text.length + 1)), 80)
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2000)
      }
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(text.slice(0, -1)), 40)
      } else {
        setIsDeleting(false)
        setWordIndex((prev) => (prev + 1) % typewriterWords.length)
      }
    }

    return () => clearTimeout(timeout)
  }, [text, isDeleting, wordIndex])

  return (
    <span className="hero__title-gradient">
      {text}
      <span className="hero__cursor">|</span>
    </span>
  )
}

export default function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero__bg">
        <div className="hero__gradient-1" />
        <div className="hero__gradient-2" />
        <div className="hero__gradient-3" />
        <div className="hero__grid" />
      </div>

      <div className="container hero__content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="hero__badge-wrapper"
        >
          <div className="section-badge">Sua plataforma de pagamentos</div>
        </motion.div>

        <motion.h1
          className="hero__title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          RECEBA GLOBAL,
          <br />
          <Typewriter />
        </motion.h1>

        <motion.p
          className="hero__subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          A plataforma de pagamentos internacionais que conecta seu negócio ao mundo.
          Aceite pagamentos de qualquer lugar com segurança, rapidez e as melhores taxas.
        </motion.p>

        <motion.div
          className="hero__buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <a href="#cta" className="btn-primary">
            Entrar em Contato <ArrowRight size={18} />
          </a>
          <a href="#features" className="btn-secondary">
            <Play size={16} /> Começar Agora
          </a>
        </motion.div>

        <motion.div
          className="hero__badges"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="hero__badge-item">
            <Shield size={16} />
            <span>100% Seguro</span>
          </div>
          <div className="hero__badge-item">
            <Zap size={16} />
            <span>Saque Rápido</span>
          </div>
          <div className="hero__badge-item">
            <Globe size={16} />
            <span>+180 Países</span>
          </div>
        </motion.div>
      </div>

      <style>{`
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-top: var(--nav-height);
          overflow: hidden;
        }

        .hero__bg {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }

        .hero__gradient-1 {
          position: absolute;
          top: -20%;
          left: 50%;
          transform: translateX(-50%);
          width: 900px;
          height: 700px;
          background: radial-gradient(ellipse, rgba(37, 99, 235, 0.3) 0%, rgba(29, 78, 216, 0.15) 40%, transparent 70%);
          filter: blur(40px);
        }

        .hero__gradient-2 {
          position: absolute;
          top: 15%;
          left: -10%;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(30, 64, 175, 0.25) 0%, transparent 65%);
          filter: blur(60px);
          animation: float 8s ease-in-out infinite;
        }

        .hero__gradient-3 {
          position: absolute;
          bottom: -10%;
          right: -5%;
          width: 700px;
          height: 500px;
          background: radial-gradient(circle, rgba(37, 99, 235, 0.2) 0%, transparent 65%);
          filter: blur(50px);
          animation: float 10s ease-in-out infinite reverse;
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, -20px); }
        }

        .hero__grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(59, 130, 246, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.03) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse at 50% 50%, black 30%, transparent 70%);
          -webkit-mask-image: radial-gradient(ellipse at 50% 50%, black 30%, transparent 70%);
        }

        .hero__content {
          position: relative;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 60px;
          padding-bottom: 80px;
        }

        .hero__badge-wrapper {
          margin-bottom: 8px;
        }

        .hero__title {
          font-size: clamp(36px, 6vw, 72px);
          font-weight: 900;
          line-height: 1.05;
          letter-spacing: -2px;
          margin-bottom: 24px;
          color: var(--text-primary);
          min-height: 2.2em;
        }

        .hero__title-gradient {
          background: linear-gradient(135deg, #93c5fd 0%, #60a5fa 30%, #3b82f6 60%, #2563eb 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero__cursor {
          -webkit-text-fill-color: var(--blue-400);
          animation: blink 0.8s step-end infinite;
          font-weight: 300;
          margin-left: 2px;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        .hero__subtitle {
          font-size: clamp(15px, 1.8vw, 18px);
          color: var(--text-secondary);
          max-width: 580px;
          line-height: 1.7;
          margin-bottom: 40px;
        }

        .hero__buttons {
          display: flex;
          gap: 16px;
          margin-bottom: 48px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .hero__badges {
          display: flex;
          gap: 24px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .hero__badge-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          border-radius: 100px;
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          font-size: 13px;
          font-weight: 500;
          backdrop-filter: blur(10px);
        }

        .hero__badge-item svg {
          color: var(--blue-400);
        }

        @media (max-width: 768px) {
          .hero__content {
            padding-top: 40px;
            padding-bottom: 40px;
          }

          .hero__title {
            letter-spacing: -1px;
            min-height: 3em;
          }

          .hero__badges {
            gap: 12px;
          }
        }
      `}</style>
    </section>
  )
}
