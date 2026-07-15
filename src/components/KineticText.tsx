import { motion, type Variants } from 'framer-motion'

type KineticTextProps = {
  text: string
  className?: string
  delay?: number
}

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0 },
  },
}

const wordVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function KineticText({ text, className, delay = 0 }: KineticTextProps) {
  const words = text.split(' ')

  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={container}
      transition={{ delayChildren: delay }}
    >
      {words.map((word, i) => (
        <motion.span key={i} variants={wordVariant} className="inline-block mr-[0.28em]">
          {word}
        </motion.span>
      ))}
    </motion.span>
  )
}