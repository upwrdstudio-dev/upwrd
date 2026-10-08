import SEO from '../components/SEO'
import Button from '../components/Button'
import { LogoMark } from '../components/Logo'

export default function NotFoundPage() {
  return (
    <section className="flex min-h-[100svh] flex-col items-center justify-center gap-8 bg-paper px-5 text-center">
      <SEO title="Page not found" description="This page doesn't exist." path="/404" />
      <LogoMark intro className="h-20 w-20 text-ink" />
      <h1 className="text-6xl font-medium tracking-tightest md:text-8xl">
        Wrong way<span className="font-serif font-normal italic text-accent">,</span> up&nbsp;is&nbsp;this&nbsp;way.
      </h1>
      <p className="max-w-sm text-ink/65">The page you were looking for doesn't exist or has moved.</p>
      <Button to="/" variant="dark">
        Back to home
      </Button>
    </section>
  )
}
