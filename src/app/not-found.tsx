/**
 * 404 Not Found page
 */
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, ArrowRight } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="section-padding flex flex-col items-center justify-center text-center min-h-[60vh]">
      <p className="font-display text-9xl font-bold text-primary/10 leading-none mb-4">404</p>
      <h1 className="font-display text-4xl font-semibold mb-4">Stránka nenalezena</h1>
      <p className="text-lg text-muted-foreground max-w-md mb-8">
        Požadovaná stránka neexistuje nebo byla přesunuta.
      </p>
      <div className="flex gap-4">
        <Button asChild size="lg" leftIcon={<Home className="h-4 w-4" />}>
          <Link href="/">Zpět domů</Link>
        </Button>
        <Button asChild size="lg" variant="outline" rightIcon={<ArrowRight className="h-4 w-4" />}>
          <Link href="/kontakt">Kontaktovat nás</Link>
        </Button>
      </div>
    </div>
  )
}
