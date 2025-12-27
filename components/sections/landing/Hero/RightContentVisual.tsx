import { serviceItems } from '@/constants/services.constants'
import { CheckCircle2, Star } from 'lucide-react'
import { useScroll, motion, useTransform } from 'motion/react'
import Link from 'next/link'
import { FC, RefObject } from 'react'


type Props = {
  containerRef: RefObject<HTMLDivElement | null>
}

const RightContentVisual: FC<Props> = ({ containerRef }) => {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  //* Sleek Parallax
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.4 }}
      className="relative hidden lg:block"
    >
      {/* Main showcase card */}
      <div className="relative">
        <motion.div
          style={{ y }}
          className="relative z-10 bg-card border border-border p-8"
        >
          {/* Logo */}
          <div className="relative flex items-center justify-center mb-8">
            <motion.div
              animate={{
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute w-40 h-40 bg-accent/15 rounded-full blur-3xl"
            />
            <img
              src={'/assets/logo.webp'}
              alt="Mohsin Designs"
              className="w-36 h-36 object-contain relative z-10 drop-shadow-[0_10px_22px_hsl(var(--foreground)/0.16)] dark:drop-shadow-none"
            />
          </div>

          {/* Services list */}
          <div className="space-y-2.5">
            {serviceItems.map((service, i) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={service.path}
                  className="flex items-center gap-3 p-3.5 bg-muted/50 border border-border hover:border-accent/30 hover:bg-accent/5 transition-all group"
                >
                  <div className="w-7 h-7 bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                  </div>
                  <span className="text-sm font-medium tracking-wide">{service.name}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Decorative frame */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="absolute -top-3 -right-3 w-full h-full border border-accent/40 -z-10"
        />

        {/* Accent square */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          className="absolute -bottom-5 -left-5 w-16 h-16 bg-accent flex items-center justify-center"
        >
          <Star className="w-6 h-6 fill-accent-foreground text-accent-foreground" />
        </motion.div>

        {/* Since badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="absolute -top-6 -left-6 bg-foreground text-background px-4 py-2 text-xs font-semibold tracking-wider uppercase"
        >
          Since 2019
        </motion.div>
      </div>
    </motion.div>
  )
}

export default RightContentVisual