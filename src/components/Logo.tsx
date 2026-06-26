import { Link } from 'wouter'

// Becker's script wordmark. `onDark` serves the cream knockout (over hero
// imagery / plum surfaces); the light surfaces get the plum version.
export default function Logo({
  onDark = false,
  className = 'h-12 sm:h-14',
}: {
  readonly onDark?: boolean
  readonly className?: string
}) {
  return (
    <Link href="/" aria-label="Becker's Restaurant, home" className={`inline-flex ${className}`}>
      <img
        src={onDark ? '/images/logo-cream.png' : '/images/logo-plum.png'}
        alt="Becker's Restaurant"
        width={472}
        height={301}
        className="h-full w-auto"
      />
    </Link>
  )
}
