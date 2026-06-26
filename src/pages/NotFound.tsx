import Button from '../components/Button'

export default function NotFound() {
  return (
    <section className="steel-panel relative flex min-h-[80vh] items-center justify-center overflow-hidden px-5 pt-20 text-center">
      <div className="relative z-10">
        <p className="eyebrow text-gold">404</p>
        <h1 className="mt-4 font-display text-display-lg-mobile font-bold text-cream md:text-display-lg">
          We couldn&rsquo;t find that plate
        </h1>
        <p className="mx-auto mt-5 max-w-md text-body-lg text-cream-dim">
          The page you were looking for isn&rsquo;t on the menu. Let&rsquo;s get you back to the good
          stuff.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href="/" variant="cream">
            Back Home
          </Button>
          <Button href="/menu" variant="ghost">
            See the Menu
          </Button>
        </div>
      </div>
    </section>
  )
}
