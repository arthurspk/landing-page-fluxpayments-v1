import { motion } from "framer-motion";
import { Globe, Link2, MessageSquare, Send } from "lucide-react";
import logoPrincipal from "../assets/logos/logo-principal.png";
import { useTranslation } from "../i18n/useTranslation";

const sectionKeys = ["product", "company", "support", "legal"];

export default function Footer() {
  const { t } = useTranslation();
  const bottomLinks = t("footer.bottomLinks") || [];
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <motion.div
            className="footer__brand"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <a href="#hero" className="footer__logo">
              <img
                src={logoPrincipal}
                alt="Flux Payments"
                className="footer__logo-img"
              />
            </a>
            <p className="footer__description">
              {t("footer.description")}
            </p>
            <div className="footer__social">
              <a href="#" aria-label={t("footer.social.instagram")}>
                <Globe size={18} />
              </a>
              <a href="#" aria-label={t("footer.social.linkedin")}>
                <Link2 size={18} />
              </a>
              <a href="#" aria-label={t("footer.social.twitter")}>
                <Send size={18} />
              </a>
              <a href="#" aria-label={t("footer.social.contact")}>
                <MessageSquare size={18} />
              </a>
            </div>
          </motion.div>

          <div className="footer__links">
            {sectionKeys.map((key, i) => {
              const links = t(`footer.sections.${key}.links`) || [];
              return (
                <motion.div
                  key={key}
                  className="footer__column"
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                >
                  <h4>{t(`footer.sections.${key}.title`)}</h4>
                  <ul>
                    {links.map((link) => (
                      <li key={link}>
                        <a href="#">{link}</a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div
          className="footer__bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="footer__copyright">
            <p>
              &copy; {new Date().getFullYear()} Flux Payments - {t("footer.copyright")}
            </p>
            <p className="footer__cnpj">{t("footer.cnpj")}</p>
          </div>
          <div className="footer__bottom-links">
            {bottomLinks.map((link) => (
              <a key={link} href="#">{link}</a>
            ))}
          </div>
        </motion.div>
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

          .footer__brand {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
          }

          .footer__description {
            max-width: 100%;
          }

          .footer__social {
            justify-content: center;
          }

          .footer__links {
            grid-template-columns: repeat(2, 1fr);
            gap: 32px 24px;
            text-align: center;
          }

          .footer__column h4 {
            margin-bottom: 12px;
          }

          .footer__column ul {
            align-items: center;
          }

          .footer__bottom {
            flex-direction: column;
            text-align: center;
            align-items: center;
          }

          .footer__bottom-links {
            gap: 16px;
            justify-content: center;
          }
        }

        @media (max-width: 400px) {
          .footer__links {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </footer>
  );
}
