import { Star } from 'lucide-react'
import { ratingSummary } from '../data/site'

// A single trust chip for the hero (social proof). Address, phone, and hours
// live in the Visit/Hours band directly below the hero, so they're not
// repeated here.
export default function HeroChips() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="inline-flex items-center gap-2 rounded-full border border-cream/25 bg-black/25 px-4 py-2 font-sans text-[13px] font-medium text-cream backdrop-blur-sm">
        <Star size={15} className="text-gold-light" fill="currentColor" />
        {ratingSummary.value} · {ratingSummary.count}+ Google reviews
      </span>
    </div>
  )
}
