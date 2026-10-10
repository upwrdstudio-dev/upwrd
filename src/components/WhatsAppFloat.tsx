import { useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import WhatsAppIcon from './WhatsAppIcon'
import { whatsappLink } from '../data/site'

// Always-reachable WhatsApp shortcut, shown once the visitor is past the
// hero so it doesn't compete with the hero's own call to action.
export default function WhatsAppFloat() {
  const { scrollY } = useScroll()
  const [visible, setVisible] = useState(false)
  useMotionValueEvent(scrollY, 'change', (y) => setVisible(y > 500))

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with UPWRD on WhatsApp"
          initial={{ opacity: 0, scale: 0.6, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 12 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 26 }}
          className="fixed bottom-[76px] right-5 z-[120] grid h-12 w-12 place-items-center rounded-full bg-[#25D366] text-[#062B16] shadow-lg shadow-black/20 md:bottom-[96px] md:right-8"
        >
          <WhatsAppIcon className="h-6 w-6" />
        </motion.a>
      )}
    </AnimatePresence>
  )
}
