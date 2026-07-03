import { Link } from 'react-router';
import { buttonVariants } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { motion } from 'framer-motion';

export function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-6 h-16 flex items-center justify-between border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center gap-2 font-bold text-xl">
          <span className="text-primary">Lineup</span> Tasks
        </div>
        <nav className="flex items-center gap-4">
          <ThemeToggle />
          <Link to="/login" className={buttonVariants({ variant: "ghost" })}>
            Login
          </Link>
          <Link to="/register" className={buttonVariants()}>
            Get Started
          </Link>
        </nav>
      </header>
      
      <main className="flex-1 flex flex-col items-center justify-center text-center p-6 bg-gradient-to-b from-background to-muted/20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl space-y-6"
        >
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight">
            Manage your work <br/>
            <span className="text-muted-foreground">with clarity.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A production-ready task manager built for modern teams. Secure, fast, and beautifully designed.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <Link to="/register" className={buttonVariants({ size: "lg" })}>
              Start for free
            </Link>
            <Link to="/login" className={buttonVariants({ size: "lg", variant: "outline" })}>
              Sign in
            </Link>
          </div>
        </motion.div>
      </main>
      
      <footer className="py-6 text-center text-sm text-muted-foreground border-t">
        Built with React 19, Vite, and Tailwind CSS.
      </footer>
    </div>
  );
}
