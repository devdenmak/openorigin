import { cn } from '@/src/shared/lib/tailwindUtils'

import { emojiVariants } from './AvatarEmoji.variants'

export type IAvatarEmojiProps = {
  className?: string
  idx?: number | string
  emoji?: string
  size?: emojiVariants['size']
}

const backgroundColors = [
  'bg-red-soft',
  'bg-green-soft',
  'bg-yellow-soft',
  'bg-orange-soft',
  'bg-magenta-soft',
  'bg-purple-soft',
  'bg-blue-soft',
]

const AvatarEmoji = ({ className, size, emoji, idx }: IAvatarEmojiProps) => {
  const key = idx !== undefined ? Number(idx) % backgroundColors.length : 0

  return (
    <section className={cn(emojiVariants({ size, className }), backgroundColors[key])}>
      {emoji}
    </section>
  )
}

export default AvatarEmoji
