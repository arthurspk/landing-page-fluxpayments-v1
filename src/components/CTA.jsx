import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Headphones, Clock } from 'lucide-react'

export default function CTA() {
  return (
    <section id="cta" className="cta">
      <div className="cta__glow-1" />
      <div className="cta__glow-2" />
      <div className="container">
        <motion.div
          className="cta__card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="cta__content">
            <div className="section-badge">Comece Hoje Mesmo</div>
            <h2 className="section-title">
              Pronto para começar
              <br />
              <span className="gradient-text">sua jornada global?</span>
            </h2>
            <p className="section-subtitle">
              Junte-se a mais de <strong>50.000 empresas</strong> que já estão
              faturando alto com a Flux Payments.
            </p>

            <a href="#" className="btn-primary cta__btn">
              Falar com Especialista <ArrowRight size={18} />
            </a>

            <div className="cta__features">
              <div className="cta__feature">
                <CheckCircle2 size={16} />
                <span>Sem taxas de setup</span>
              </div>
              <div className="cta__feature">
                <Clock size={16} />
                <span>Comece quando quiser</span>
              </div>
              <div className="cta__feature">
                <Headphones size={16} />
                <span>Suporte 24/7</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        .cta {
          padding: 100px 0;
          position: relative;
          overflow: hidden;
        }

        .cta__glow-1 {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          max-width: 800px;
          height: 400px;
          background: radial-gradient(ellipse, rgba(59, 130, 246, 0.12) 0%, transparent 70%);
          pointer-events: none;
        }

        .cta__glow-2 {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 600px;
          height: 300px;
          background: radial-gradient(circle, rgba(30, 64, 175, 0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        .cta__card {
          position: relative;
          padding: 80px 40px;
          border-radius: 24px;
          background: linear-gradient(135deg, rgba(15, 23, 42, 0.8), rgba(30, 41, 59, 0.4));
          border: 1px solid var(--border-color);
          text-align: center;
          overflow: hidden;
        }

        .cta__card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--gradient-blue);
        }

        .cta__content {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .cta__content .section-subtitle {
          margin: 0 auto 32px;
        }

        .cta__content .section-subtitle strong {
          color: var(--blue-400);
        }

        .cta__btn {
          margin-bottom: 32px;
          padding: 16px 40px !important;
          font-size: 16px !important;
        }

        .cta__features {
          display: flex;
          gap: 32px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .cta__feature {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: var(--text-secondary);
        }

        .cta__feature svg {
          color: var(--blue-400);
        }

        @media (max-width: 768px) {
          .cta__card {
            padding: 48px 24px;
          }

          .cta__features {
            gap: 20px;
          }
        }
      `}</style>
    </section>
  )
}
