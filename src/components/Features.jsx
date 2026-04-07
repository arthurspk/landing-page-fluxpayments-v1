import { motion } from 'framer-motion'
import {
  CreditCard,
  ShieldCheck,
  Globe,
  BarChart3,
  FileCheck,
  Code2
} from 'lucide-react'

const features = [
  {
    icon: CreditCard,
    title: 'Checkout Otimizado',
    description: 'Conversão de alto nível com múltiplas formas de pagamento, aceite cartões e e-wallets internacionais.',
    color: '#3b82f6',
  },
  {
    icon: ShieldCheck,
    title: 'Pagamentos Seguros',
    description: 'Processamento seguro com criptografia de ponta, certificação PCI-DSS e proteção contra fraudes.',
    color: '#60a5fa',
  },
  {
    icon: Globe,
    title: 'Vendas Globais',
    description: 'Alcance clientes em mais de 180 países com suporte a múltiplas moedas e métodos de pagamento locais.',
    color: '#2563eb',
  },
  {
    icon: BarChart3,
    title: 'Analytics Completo',
    description: 'Dashboard detalhado para acompanhar todas as suas métricas de vendas e conversão em tempo real.',
    color: '#1d4ed8',
  },
  {
    icon: FileCheck,
    title: 'Conformidade Regulatória',
    description: 'Esteja sempre em conformidade com as principais normas e leis financeiras internacionais.',
    color: '#1e40af',
  },
  {
    icon: Code2,
    title: 'API Escalável',
    description: 'Integração fácil com as principais plataformas e-commerce e sistemas personalizados via API RESTful.',
    color: '#3b82f6',
  },
]

export default function Features() {
  return (
    <section id="features" className="features">
      <div className="container">
        <div className="features__header">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="section-badge">Recursos Completos</div>
            <h2 className="section-title">
              Tudo que você precisa para
              <br />
              <span className="gradient-text">escalar seu negócio</span>
            </h2>
            <p className="section-subtitle">
              Uma suite completa de ferramentas para aceitar pagamentos internacionais
              com segurança e eficiência.
            </p>
          </motion.div>
        </div>

        <div className="features__grid">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              className="features__card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="features__card-icon" style={{ '--icon-color': feature.color }}>
                <feature.icon size={24} />
              </div>
              <h3 className="features__card-title">{feature.title}</h3>
              <p className="features__card-desc">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .features {
          padding: 100px 0;
          position: relative;
        }

        .features__header {
          text-align: center;
          margin-bottom: 60px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .features__header .section-subtitle {
          margin: 0 auto;
        }

        .features__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .features__card {
          padding: 32px;
          border-radius: 16px;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .features__card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--icon-color, var(--blue-500)), transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .features__card:hover::before {
          opacity: 1;
        }

        .features__card:hover {
          border-color: var(--border-hover);
          background: var(--bg-card-hover);
          transform: translateY(-4px);
        }

        .features__card-icon {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.12), rgba(30, 64, 175, 0.12));
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          color: var(--icon-color, var(--blue-400));
        }

        .features__card-title {
          font-size: 18px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 10px;
        }

        .features__card-desc {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.7;
        }

        @media (max-width: 768px) {
          .features {
            padding: 60px 0;
          }

          .features__header {
            margin-bottom: 40px;
          }

          .features__grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .features__card {
            padding: 24px;
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .features__grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </section>
  )
}
