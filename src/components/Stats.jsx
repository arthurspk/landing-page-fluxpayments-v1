import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Users, TrendingUp, ShoppingCart, Percent } from 'lucide-react'
import { useTranslation } from '../i18n/useTranslation'

const localeMap = { pt: 'pt-BR', en: 'en-US', es: 'es-ES' }

function AnimatedNumber({ value, suffix, prefix, locale }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const end = value
    const duration = 2000
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = start + (end - start) * eased
      setDisplay(Number.isInteger(value) ? Math.floor(current) : parseFloat(current.toFixed(1)))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [isInView, value])

  return (
    <span ref={ref}>
      {prefix}{display.toLocaleString(locale)}{suffix}
    </span>
  )
}

export default function Stats() {
  const { t, language } = useTranslation()
  const locale = localeMap[language] || 'pt-BR'
  const stats = [
    { icon: Users, value: 50000, suffix: '+', label: t('stats.items.clients'), prefix: '' },
    { icon: TrendingUp, value: 10, suffix: 'M+', label: t('stats.items.transactions'), prefix: '' },
    { icon: ShoppingCart, value: 180, suffix: '+', label: t('stats.items.countries'), prefix: '' },
    { icon: Percent, value: 99.9, suffix: '%', label: t('stats.items.uptime'), prefix: '' },
  ]
  return (
    <section className="stats">
      <div className="container">
        <div className="stats__header">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="section-badge">{t('stats.badge')}</div>
            <h2 className="section-title">
              {t('stats.titleLine1')}
              <br />
              <span className="gradient-text">{t('stats.titleLine2')}</span>
            </h2>
            <p className="section-subtitle">
              {t('stats.subtitle')}
            </p>
          </motion.div>
        </div>

        <div className="stats__grid">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="stats__card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="stats__icon">
                <stat.icon size={24} />
              </div>
              <div className="stats__value">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} prefix={stat.prefix} locale={locale} />
              </div>
              <div className="stats__label">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .stats {
          padding: 100px 0;
          position: relative;
        }

        .stats__header {
          text-align: center;
          margin-bottom: 48px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .stats__header .section-subtitle {
          margin: 0 auto;
        }

        .stats::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--border-color), transparent);
        }

        .stats::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--border-color), transparent);
        }

        .stats__grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        .stats__card {
          text-align: center;
          padding: 32px 20px;
          border-radius: 16px;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }

        .stats__card:hover {
          border-color: var(--border-hover);
          background: var(--bg-card-hover);
          transform: translateY(-4px);
          box-shadow: var(--shadow-blue);
        }

        .stats__icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(30, 64, 175, 0.15));
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
          color: var(--blue-400);
        }

        .stats__value {
          font-size: 36px;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 4px;
          letter-spacing: -1px;
        }

        .stats__label {
          font-size: 14px;
          color: var(--text-muted);
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .stats {
            padding: 60px 0;
          }

          .stats__grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }

          .stats__card {
            padding: 24px 16px;
          }

          .stats__value {
            font-size: 28px;
          }
        }

        @media (max-width: 400px) {
          .stats__grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}
