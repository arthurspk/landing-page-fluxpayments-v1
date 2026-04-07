import { useState, useEffect } from 'react'
import { MessageCircle, X, ArrowUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function FloatButton() {
  const [showChat, setShowChat] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [message, setMessage] = useState('')

  const sendToWhatsApp = () => {
    const text = encodeURIComponent(message || 'Olá, quero saber mais sobre a Flux Payments!')
    window.open(`https://wa.me/16475755252?text=${text}`, '_blank')
    setMessage('')
  }

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 600)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <div className={`float-stack ${!showChat ? 'float-stack--closed' : ''}`}>
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              className="float-scroll-top"
              onClick={scrollToTop}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Voltar ao topo"
            >
              <ArrowUp size={20} />
            </motion.button>
          )}
        </AnimatePresence>

        <motion.button
          className="float-btn"
          onClick={() => setShowChat(!showChat)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Chat"
        >
          {showChat ? <X size={24} /> : <MessageCircle size={24} />}
        </motion.button>
      </div>

      <AnimatePresence>
        {showChat && (
          <motion.div
            className="float-chat"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
          >
            <div className="float-chat__header">
              <div className="float-chat__header-info">
                <div className="float-chat__avatar">F</div>
                <div>
                  <div className="float-chat__name">Flux Payments</div>
                  <div className="float-chat__status">Online agora</div>
                </div>
              </div>
              <button onClick={() => setShowChat(false)} className="float-chat__close">
                <X size={18} />
              </button>
            </div>
            <div className="float-chat__body">
              <div className="float-chat__message">
                <p>Olá! Como podemos ajudar você hoje? Estamos prontos para tirar todas as suas dúvidas sobre pagamentos internacionais.</p>
              </div>
            </div>
            <div className="float-chat__footer">
              <input
                type="text"
                placeholder="Digite sua mensagem..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendToWhatsApp()}
              />
              <button className="float-chat__send" onClick={sendToWhatsApp}>Enviar</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .float-stack {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 1001;
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 14px;
        }

        .float-stack--closed {
          flex-direction: column;
        }

        .float-scroll-top {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(15, 23, 42, 0.9);
          border: 1px solid var(--border-color);
          color: var(--blue-400);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          backdrop-filter: blur(10px);
        }

        .float-btn {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: var(--gradient-blue);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          box-shadow: 0 4px 20px rgba(59, 130, 246, 0.4);
          cursor: pointer;
        }

        .float-chat {
          position: fixed;
          bottom: 96px;
          right: 24px;
          z-index: 1000;
          width: 360px;
          max-width: calc(100vw - 48px);
          border-radius: 16px;
          background: rgba(10, 15, 30, 0.98);
          border: 1px solid var(--border-color);
          backdrop-filter: blur(20px);
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        }

        @media (max-width: 768px) {
          .float-stack {
            bottom: 16px;
            right: 16px;
          }

          .float-chat {
            bottom: 88px;
            right: 16px;
            max-width: calc(100vw - 32px);
          }

          .float-btn {
            width: 50px;
            height: 50px;
          }

          .float-scroll-top {
            width: 40px;
            height: 40px;
          }
        }

        .float-chat__header {
          padding: 16px 20px;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(30, 64, 175, 0.15));
          border-bottom: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .float-chat__header-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .float-chat__avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--gradient-blue);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 700;
          font-size: 14px;
        }

        .float-chat__name {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .float-chat__status {
          font-size: 12px;
          color: #22c55e;
        }

        .float-chat__close {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          padding: 4px;
        }

        .float-chat__body {
          padding: 20px;
          min-height: 120px;
        }

        .float-chat__message {
          background: rgba(59, 130, 246, 0.1);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 14px 16px;
        }

        .float-chat__message p {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .float-chat__footer {
          padding: 12px 16px;
          border-top: 1px solid var(--border-color);
          display: flex;
          gap: 8px;
        }

        .float-chat__footer input {
          flex: 1;
          padding: 10px 14px;
          border-radius: 8px;
          border: 1px solid var(--border-color);
          background: rgba(15, 23, 42, 0.6);
          color: var(--text-primary);
          font-size: 13px;
          font-family: var(--font-family);
          outline: none;
        }

        .float-chat__footer input:focus {
          border-color: var(--blue-500);
        }

        .float-chat__send {
          padding: 10px 18px;
          border-radius: 8px;
          background: var(--gradient-blue);
          color: white;
          font-size: 13px;
          font-weight: 600;
          border: none;
          cursor: pointer;
          font-family: var(--font-family);
        }
      `}</style>
    </>
  )
}
