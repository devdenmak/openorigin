import animateScrollTo from 'animated-scroll-to'

export const scrollToId = async (id: string) => {
  const element = document.getElementById(id)

  if (!element) return

  await animateScrollTo(element, {
    speed: 100,
    verticalOffset: -150,
  })
}
