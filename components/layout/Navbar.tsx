"use client"

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, ChevronDown } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";
import ThemeToggle from "@/components/ui/ThemeToggle";
import logo from "@/assets/logo.webp";
import {
  serviceItems
} from '@/constants/services.constants'
import { navLinks } from "@/constants/navlinks.constants";
import { APP_NAME } from "@/constants/app.constants";
import { usePathname } from "next/navigation";
import Link from "next/link";



const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  //* Close dropdown when route changes
  useEffect(() => {
    setServicesOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border" : ""
          }`}
      >
        <nav className="container mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <MagneticButton strength={0.2}>
              <Link href="/" className="relative z-50">
                <motion.img
                  src={logo.src}
                  alt={APP_NAME}
                  className="h-12 w-auto object-contain drop-shadow-[0_6px_16px_hsl(var(--foreground)/0.18)] dark:drop-shadow-none"
                  whileHover={{ scale: 1.05 }}
                />
              </Link>
            </MagneticButton>

            {/* Center nav links */}
            <div className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
              {navLinks.map((link) => (
                <div
                  key={link.path}
                  className="relative"
                  onMouseEnter={() => link.hasDropdown && setServicesOpen(true)}
                  onMouseLeave={() => link.hasDropdown && setServicesOpen(false)}
                >
                  <MagneticButton strength={0.1}>
                    <Link
                      href={link.path}
                      className={`relative px-5 py-2 text-sm tracking-wide transition-colors group inline-flex items-center gap-1 ${location.pathname === link.path || (link.hasDropdown && location.pathname.startsWith('/services'))
                        ? "text-accent"
                        : "text-foreground/70 hover:text-foreground"
                        }`}
                    >
                      <span className="relative z-10">{link.name}</span>
                      {link.hasDropdown && (
                        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
                      )}
                      {(location.pathname === link.path || (link.hasDropdown && location.pathname.startsWith('/services'))) && (
                        <motion.div
                          layoutId="activeNav"
                          className="absolute inset-0 bg-accent/10 border border-accent/20"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </Link>
                  </MagneticButton>

                  {/* Services Dropdown */}
                  {link.hasDropdown && (
                    <AnimatePresence>
                      {servicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 pt-2 w-64"
                        >
                          <div className="bg-background/95 backdrop-blur-xl border border-border shadow-xl">
                            {serviceItems.map((service, i) => (
                              <motion.div
                                key={service.path}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                              >
                                <Link
                                  href={service.path}
                                  className={`block px-5 py-4 group transition-colors border-b border-border/50 last:border-b-0 hover:bg-accent/10 ${location.pathname === service.path ? 'bg-accent/10' : ''
                                    }`}
                                >
                                  <span className={`block text-sm font-medium group-hover:text-accent transition-colors ${location.pathname === service.path ? 'text-accent' : ''
                                    }`}>
                                    {service.name}
                                  </span>
                                  <span className="block text-xs text-muted-foreground mt-0.5">
                                    {service.desc}
                                  </span>
                                </Link>
                              </motion.div>
                            ))}
                            <div className="p-3 border-t border-border/50 bg-muted/30">
                              <Link
                                href="/services"
                                className="flex items-center justify-between text-xs font-medium text-muted-foreground hover:text-accent transition-colors"
                              >
                                View all services
                                <ArrowUpRight className="h-3 w-3" />
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-6">
              <ThemeToggle />
              <MagneticButton strength={0.25}>
                <Link
                  href="/contact"
                  data-cursor-text="Go"
                  className="group inline-flex items-center gap-2 text-sm font-medium bg-foreground text-background px-6 py-3 hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                >
                  Start a Project
                  <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </MagneticButton>
            </div>

            <div className="lg:hidden flex items-center gap-4">
              <ThemeToggle />
              <MagneticButton strength={0.18}>
                <button
                  className="relative z-50 p-2"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </MagneticButton>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Fullscreen Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 40px) 40px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-foreground flex flex-col justify-center items-center overflow-y-auto py-24"
          >
            <nav className="flex flex-col items-center gap-4">
              {navLinks.map((link, i) => (
                <div key={link.path} className="text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                  >
                    <Link
                      href={link.path}
                      onClick={() => setIsOpen(false)}
                      className="text-5xl md:text-7xl font-display font-bold tracking-tight text-background hover:text-accent transition-colors"
                    >
                      {link.name}
                    </Link>
                  </motion.div>

                  {/* Mobile service sub-links */}
                  {link.hasDropdown && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 + i * 0.08 }}
                      className="flex flex-wrap justify-center gap-3 mt-3"
                    >
                      {serviceItems.map((service) => (
                        <Link
                          key={service.path}
                          href={service.path}
                          onClick={() => setIsOpen(false)}
                          className="text-sm text-background/60 hover:text-accent transition-colors"
                        >
                          {service.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + navLinks.length * 0.08 }}
              >
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="text-5xl md:text-7xl font-display font-bold tracking-tight text-background hover:text-accent transition-colors"
                >
                  Contact
                </Link>
              </motion.div>
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-12 text-background/50 text-sm tracking-widest"
            >
              hello@mohsindesigns.com
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;