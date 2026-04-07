import { Globe, Link2, Send, MessageSquare } from 'lucide-react'
import logoPrincipal from '../assets/logos/logo-principal.png'

const footerLinks = {
  Produto: ['Checkout', 'Pagamentos', 'Recorrência', 'Split', 'Link de Pagamento'],
  Empresa: ['Sobre nós', 'Carreiras', 'Blog', 'Contato'],
  Suporte: ['Central de Ajuda', 'Documentação', 'Status da API', 'Comunidade'],
  Legal: ['Termos de Uso', 'Privacidade', 'Compliance', 'PCI-DSS'],
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <a href="#hero" className="footer__logo">
              <img src={logoPrincipal} alt="Flux Payments" className="footer__logo-img" />
            </a>
            <p className="footer__description">
              A plataforma internacional de pagamentos para transformar seu negócio em uma operação global, segura e escalável.
            </p>
            <div className="footer__social">
              <a href="#" aria-label="Instagram"><Globe size={18} /></a>
              <a href="#" aria-label="LinkedIn"><Link2 size={18} /></a>
              <a href="#" aria-label="Twitter"><Send size={18} /></a>
              <a href="#" aria-label="Contato"><MessageSquare size={18} /></a>
            </div>
          </div>

          <div className="footer__links">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title} className="footer__column">
                <h4>{title}</h4>
                <ul>
                  {links.map(link => (
                    <li key={link}><a href="#">{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="footer__bottom">
          <div className="footer__copyright">
            <p>&copy; {new Date().getFullYear()} Flux Payments. Todos os direitos reservados.</p>
            <p className="footer__cnpj">CNPJ: 64.776.265/0001-69</p>
          </div>
          <div className="footer__bottom-links">
            <a href="#">Termos de Uso</a>
            <a href="#">Privacidade</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </div>

      <style>{`
        .footer {
          padding: 80px 0 0;
          border-top: 1px solid var(--border-color);
          background: linear-gradient(180deg, var(--bg-primary) 0%, rgba(10, 15, 30, 1) 100%);
        }

        .footer__top {
          display: grid;
          grid-template-columns: 1.2fr 2fr;
          gap: 60px;
          padding-bottom: 60px;
        }

        .footer__logo {
          display: flex;
          align-items: center;
          margin-bottom: 16px;
        }

        .footer__logo-img {
          height: 36px;
          width: auto;
        }

        .footer__description {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 20px;
          max-width: 300px;
        }

        .footer__social {
          display: flex;
          gap: 12px;
        }

        .footer__social a {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: rgba(59, 130, 246, 0.08);
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          transition: all 0.3s ease;
        }

        .footer__social a:hover {
          color: var(--blue-400);
          border-color: var(--blue-500);
          background: rgba(59, 130, 246, 0.15);
        }

        .footer__links {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px;
        }

        .footer__column h4 {
          font-size: 14px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 16px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .footer__column ul {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .footer__column a {
          font-size: 14px;
          color: var(--text-muted);
          transition: color 0.2s ease;
        }

        .footer__column a:hover {
          color: var(--blue-400);
        }

        .footer__bottom {
          border-top: 1px solid var(--border-color);
          padding: 24px 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }

        .footer__copyright p {
          font-size: 13px;
          color: var(--text-muted);
        }

        .footer__cnpj {
          font-size: 12px !important;
          margin-top: 4px;
          color: var(--text-muted);
          opacity: 0.7;
        }

        .footer__bottom-links {
          display: flex;
          gap: 24px;
        }

        .footer__bottom-links a {
          font-size: 13px;
          color: var(--text-muted);
          transition: color 0.2s ease;
        }

        .footer__bottom-links a:hover {
          color: var(--blue-400);
        }

        @media (max-width: 768px) {
          .footer {
            padding: 60px 0 0;
          }

          .footer__top {
            grid-template-columns: 1fr;
            gap: 40px;
            padding-bottom: 40px;
          }

          .footer__links {
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
          }

          .footer__description {
            max-width: 100%;
          }

          .footer__bottom {
            flex-direction: column;
            text-align: center;
          }

          .footer__bottom-links {
            gap: 16px;
          }
        }

        @media (max-width: 400px) {
          .footer__links {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </footer>
  )
}
