import MagneticButton from '@/components/MagneticButton'
import HighlightedBrandname from '@/components/ui/highlighted-brandname'
import { NumberTicker } from '@/components/ui/number-ticker'
import { stats } from '@/constants/stats.constants'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'motion/react'

const HeroBottonSection = () => {
  return (
       <div className="space-y-8">
          {/* Description paragraphs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="space-y-4 max-w-3xl"
          >
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              At <HighlightedBrandname />, we don't believe in surface-level design or short-term
              trends. We believe in thoughtful branding, strategic creativity, and
              digital experiences that support real business growth.
            </p>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              In a world where businesses compete for attention across countless
              platforms, standing out requires more than good visuals. It requires a
              brand that communicates clearly, connects emotionally, and performs
              consistently. That's where we come in.
            </p>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              We partner with startups, growing companies, and established brands to
              create logos, digital platforms, and brand identities that feel
              intentional, professional, and future-ready. Every project we take on
              is shaped by research, guided by strategy, and refined through creative
              execution.
            </p>
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="flex flex-wrap gap-4"
          >
            <MagneticButton strength={0.12}>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 border-2 border-transparent bg-accent text-accent-foreground px-8 py-4 font-semibold text-sm uppercase tracking-wider hover:bg-foreground hover:text-background transition-all duration-300 shadow-lg shadow-accent/20"
              >
                Start Your Project
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </MagneticButton>

            <MagneticButton strength={0.12}>
              <Link
                href="/portfolio"
                className="group inline-flex items-center gap-3 border-2 border-border hover:border-accent px-8 py-4 font-semibold text-sm uppercase tracking-wider hover:text-accent transition-all duration-300"
              >
                View Our Work
                <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </MagneticButton>
          </motion.div>

          {/* Quick stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-wrap gap-10 md:gap-14 pt-8 border-t border-border/50"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                className="space-y-1"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + i * 0.1 }}
              >
                <NumberTicker
                  className="text-3xl md:text-4xl font-display font-bold text-accent dark:text-accent"
                  value={stat.value}
                  suffix={stat.suffix}
                />
                <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
  )
}

export default HeroBottonSection