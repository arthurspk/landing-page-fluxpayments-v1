import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useTranslation } from '../i18n/useTranslation'

function FAQItem({ faq, isOpen, onToggle, index }) {
  return (
    <motion.div
      className={`faq__item ${isOpen ? 'faq__item--open' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
    >
      <button className="faq__question" onClick={onToggle}>
        <span>{faq.question}</span>
        <ChevronDown
          size={20}
          className={`faq__chevron ${isOpen ? 'faq__chevron--open' : ''}`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="faq__answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p>{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  const { t } = useTranslation()
  const [openIndex, setOpenIndex] = useState(0)
  const faqs = t('faq.items') || []

  return (
    <section id="faq" className="faq">
      <div className="container">
        <div className="faq__layout">
          <motion.div
            className="faq__header"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="section-badge">{t('faq.badge')}</div>
            <h2 className="section-title">
              {t('faq.titleLine1')}
              <br />
              <span className="gradient-text">{t('faq.titleLine2')}</span>
            </h2>
            <p className="section-subtitle">
              {t('faq.subtitle')}
            </p>
          </motion.div>

          <div className="faq__list">
            {faqs.map((faq, i) => (
              <FAQItem
                key={i}
                faq={faq}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .faq {
          padding: 100px 0;
          position: relative;
        }

        .faq__layout {
          display: grid;
          grid-template-columns: 1fr 1.3fr;
          gap: 60px;
          align-items: start;
        }

        .faq__list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .faq__item {
          border-radius: 14px;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          overflow: hidden;
          transition: border-color 0.3s ease;
        }

        .faq__item--open {
          border-color: var(--border-hover);
        }

        .faq__question {
          width: 100%;
          padding: 20px 24px;
          background: transparent;
          border: none;
          color: var(--text-primary);
          font-size: 15px;
          font-weight: 600;
          text-align: left;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          cursor: pointer;
          font-family: var(--font-family);
        }

        .faq__chevron {
          color: var(--blue-400);
          transition: transform 0.3s ease;
          flex-shrink: 0;
        }

        .faq__chevron--open {
          transform: rotate(180deg);
        }

        .faq__answer {
          overflow: hidden;
        }

        .faq__answer p {
          padding: 0 24px 20px;
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.7;
        }

        @media (max-width: 768px) {
          .faq {
            padding: 60px 0;
          }

          .faq__layout {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .faq__header {
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .faq__question {
            padding: 16px 20px;
            font-size: 14px;
          }
        }
      `}</style>
    </section>
  )
}
