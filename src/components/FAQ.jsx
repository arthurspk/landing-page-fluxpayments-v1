import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'O que e a Flux Payments e para quem ela serve?',
    answer: 'A Flux Payments e um gateway internacional de pagamentos que permite que empresas e empreendedores aceitem pagamentos de clientes em mais de 180 paises. Ideal para e-commerces, SaaS, marketplaces e qualquer negocio que queira vender globalmente.',
  },
  {
    question: 'Quais formas de pagamento sao aceitas?',
    answer: 'Aceitamos cartoes de credito internacionais (Visa, Mastercard, Amex), Pix, boleto bancario, e-wallets, transferencias bancarias e pagamentos recorrentes. Suportamos mais de 35 moedas diferentes.',
  },
  {
    question: 'Preciso ter um CNPJ ou e necessario CNPJ?',
    answer: 'Sim, para operar como empresa e receber pagamentos, e necessario possuir um CNPJ ativo. Aceitamos desde MEI ate grandes corporacoes.',
  },
  {
    question: 'Qual o prazo de liquidacao dos valores?',
    answer: 'O prazo padrao de liquidacao e de D+1 para Pix e D+2 para cartoes de credito. Oferecemos tambem opcoes de antecipacao com taxas competitivas.',
  },
  {
    question: 'A Flux Payments e segura?',
    answer: 'Sim! Possuimos certificacao PCI-DSS Level 1, criptografia de ponta a ponta, sistema anti-fraude com inteligencia artificial e monitoramento 24/7. Seus dados e os dados dos seus clientes estao sempre protegidos.',
  },
  {
    question: 'Como funciona a integracao via API?',
    answer: 'Nossa API RESTful e simples e bem documentada. Oferecemos SDKs para as principais linguagens (Python, Node.js, PHP, Ruby) e plugins para plataformas como Shopify, WooCommerce e Magento. A integracao pode ser feita em minutos.',
  },
  {
    question: 'Quanto tempo demora para minha conta ser verificada?',
    answer: 'O processo de verificacao e rapido. Apos enviar a documentacao necessaria, sua conta e analisada em ate 24 horas uteis. Em muitos casos, a aprovacao acontece em poucas horas.',
  },
]

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div className={`faq__item ${isOpen ? 'faq__item--open' : ''}`}>
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
    </div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

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
            <div className="section-badge">Duvidas Frequentes</div>
            <h2 className="section-title">
              Tem duvidas?
              <br />
              <span className="gradient-text">Nos temos as respostas.</span>
            </h2>
            <p className="section-subtitle">
              Respondemos as perguntas mais frequentes sobre nossos servicos.
              Caso precise de mais ajuda, entre em contato.
            </p>
          </motion.div>

          <motion.div
            className="faq__list"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {faqs.map((faq, i) => (
              <FAQItem
                key={i}
                faq={faq}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
              />
            ))}
          </motion.div>
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
        }
      `}</style>
    </section>
  )
}
