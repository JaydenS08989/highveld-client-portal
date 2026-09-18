import Image from 'next/image'

const imageUrl =
  'https://images.unsplash.com/photo-1630572546386-ab5c5978cafe?auto=format&fit=crop&w=2000&q=88'

export function MarketingPanel() {
  return (
    <div className="relative flex min-h-full w-full overflow-hidden bg-brand-50">
      <Image
        alt="Corporate building in Johannesburg beneath a clear blue sky"
        className="object-cover object-center"
        fill
        priority
        sizes="(min-width: 1024px) 56vw, 100vw"
        src={imageUrl}
      />
    </div>
  )
}
