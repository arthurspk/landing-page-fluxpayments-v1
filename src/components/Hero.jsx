import { motion } from 'framer-motion'
import { ArrowRight, Play, Shield, Zap, Globe } from 'lucide-react'

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
          <span className="hero__title-gradient">CRESÇA SEM LIMITES</span>
        </motion.h1>

        <motion.p
          className="hero__subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          A plataforma de pagamentos internacionais que conecta seu negocio ao mundo.
          <br />
          Aceite pagamentos de qualquer lugar com seguranca, rapidez e as melhores taxas.
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
            <Play size={16} /> Comecar Agora
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
            <span>Saque Rapido</span>
          </div>
          <div className="hero__badge-item">
            <Globe size={16} />
            <span>+180 Paises</span>
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
          top: -30%;
          left: 50%;
          transform: translateX(-50%);
          width: 800px;
          height: 600px;
          background: radial-gradient(ellipse, rgba(59, 130, 246, 0.15) 0%, transparent 70%);
          filter: blur(40px);
        }

        .hero__gradient-2 {
          position: absolute;
          top: 20%;
          left: -10%;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(30, 64, 175, 0.12) 0%, transparent 70%);
          filter: blur(60px);
          animation: float 8s ease-in-out infinite;
        }

        .hero__gradient-3 {
          position: absolute;
          bottom: -10%;
          right: -5%;
          width: 600px;
          height: 400px;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%);
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
        }

        .hero__title-gradient {
          background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 40%, #2563eb 70%, #1d4ed8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
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
          }

          .hero__badges {
            gap: 12px;
          }
        }
      `}</style>
    </section>
  )
}
