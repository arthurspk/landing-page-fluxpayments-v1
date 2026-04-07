import { motion } from 'framer-motion'
import { CreditCard, QrCode, Receipt, Repeat, Smartphone, Building2 } from 'lucide-react'

const solutions = [
  {
    icon: CreditCard,
    title: 'Cartao de Credito Internacional',
    description: 'Aceite Visa, Mastercard, Amex e mais bandeiras internacionais com processamento instantaneo.',
  },
  {
    icon: QrCode,
    title: 'Pix & QR Code',
    description: 'Pagamentos instantaneos via Pix com geracao automatica de QR Code para seus clientes.',
  },
  {
    icon: Receipt,
    title: 'Boleto Bancario',
    description: 'Gere boletos com registro automatico e conciliacao bancaria integrada ao seu sistema.',
  },
  {
    icon: Repeat,
    title: 'Pagamentos Recorrentes',
    description: 'Assinaturas e cobrancas recorrentes automatizadas com gestao completa de planos.',
  },
  {
    icon: Smartphone,
    title: 'Link de Pagamento',
    description: 'Crie links de pagamento personalizados e compartilhe por WhatsApp, e-mail ou redes sociais.',
  },
  {
    icon: Building2,
    title: 'Split de Pagamento',
    description: 'Divida pagamentos entre multiplos recebedores de forma automatica e transparente.',
  },
]

export default function Solutions() {
  return (
    <section id="solutions" className="solutions">
      <div className="solutions__glow" />
      <div className="container">
        <div className="solutions__header">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="section-badge">Solucoes de Pagamento</div>
            <h2 className="section-title">
              Mais do que uma plataforma,
              <br />
              <span className="gradient-text">um parceiro de sucesso</span>
            </h2>
            <p className="section-subtitle">
              Entendemos que vender online vai alem de colocar um produto no ar.
              E sobre ter estrutura, apoio e ferramentas que realmente funcionam.
            </p>
          </motion.div>
        </div>

        <div className="solutions__grid">
          {solutions.map((solution, i) => (
            <motion.div
              key={i}
              className="solutions__card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div className="solutions__card-top">
                <div className="solutions__card-icon">
                  <solution.icon size={22} />
                </div>
                <h3>{solution.title}</h3>
              </div>
              <p>{solution.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .solutions {
          padding: 100px 0;
          position: relative;
          overflow: hidden;
        }

        .solutions__glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 800px;
          height: 600px;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.06) 0%, transparent 60%);
          pointer-events: none;
        }

        .solutions__header {
          text-align: center;
          margin-bottom: 60px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .solutions__header .section-subtitle {
          margin: 0 auto;
        }

        .solutions__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .solutions__card {
          padding: 28px;
          border-radius: 16px;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          transition: all 0.3s ease;
        }

        .solutions__card:hover {
          border-color: var(--border-hover);
          transform: translateY(-4px);
          box-shadow: var(--shadow-blue);
        }

        .solutions__card-top {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 12px;
        }

        .solutions__card-icon {
          width: 44px;
          height: 44px;
          min-width: 44px;
          border-radius: 12px;
          background: var(--gradient-blue);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .solutions__card-top h3 {
          font-size: 16px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .solutions__card p {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.7;
        }

        @media (max-width: 768px) {
          .solutions__grid {
            grid-template-columns: 1fr;
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .solutions__grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </section>
  )
}
