import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Maria Silva',
    role: 'CEO, Digital Commerce',
    text: 'A plataforma transformou meu negocio digital. Em 3 meses, multipliquei meus resultados por 5x. O suporte internacional e excepcional.',
    rating: 5,
  },
  {
    name: 'Joao Santos',
    role: 'CTO, TechPay Solutions',
    text: 'Melhor decisao que tomei foi migrar para a Flux Payments. Suporte excepcional, ferramentas incriveis e taxas muito competitivas.',
    rating: 5,
  },
  {
    name: 'Ana Costa',
    role: 'Fundadora, ShopGlobal',
    text: 'Consegui automatizar todo meu processo de vendas internacionais. A integracao via API e realmente impecavel e o suporte 24/7 faz toda diferenca.',
    rating: 5,
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="testimonials">
      <div className="container">
        <div className="testimonials__header">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="section-badge">Avaliacao de Clientes</div>
            <h2 className="section-title">
              O que nossos
              <br />
              <span className="gradient-text">clientes dizem</span>
            </h2>
            <p className="section-subtitle">
              Milhares de empresas ja transformaram seus negocios com nossa plataforma de pagamentos internacionais.
            </p>
          </motion.div>
        </div>

        <div className="testimonials__grid">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              className="testimonials__card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <div className="testimonials__stars">
                {Array.from({ length: testimonial.rating }).map((_, j) => (
                  <Star key={j} size={16} fill="#3b82f6" color="#3b82f6" />
                ))}
              </div>
              <p className="testimonials__text">&ldquo;{testimonial.text}&rdquo;</p>
              <div className="testimonials__author">
                <div className="testimonials__avatar">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="testimonials__name">{testimonial.name}</div>
                  <div className="testimonials__role">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .testimonials {
          padding: 100px 0;
          position: relative;
        }

        .testimonials__header {
          text-align: center;
          margin-bottom: 60px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .testimonials__header .section-subtitle {
          margin: 0 auto;
        }

        .testimonials__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .testimonials__card {
          padding: 32px;
          border-radius: 16px;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          transition: all 0.3s ease;
        }

        .testimonials__card:hover {
          border-color: var(--border-hover);
          transform: translateY(-4px);
        }

        .testimonials__stars {
          display: flex;
          gap: 4px;
          margin-bottom: 20px;
        }

        .testimonials__text {
          font-size: 15px;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 24px;
          font-style: italic;
        }

        .testimonials__author {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .testimonials__avatar {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: var(--gradient-blue);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 700;
          font-size: 16px;
        }

        .testimonials__name {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .testimonials__role {
          font-size: 12px;
          color: var(--text-muted);
        }

        @media (max-width: 768px) {
          .testimonials__grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}
