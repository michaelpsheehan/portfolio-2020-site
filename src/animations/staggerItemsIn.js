import { gsap } from 'gsap'

const staggerItemsIn = (
  items,
  currentEase = 'Power2.out',
  staggerAmount = 0.3
) => {
  if (items) {
    let tl = gsap.timeline().from(items, {
      delay: 0.5,
      y: 100,
      opacity: 0,
      ease: currentEase,
      stagger: {
        amount: staggerAmount,
      },
    })
    return tl
  }
}

export default staggerItemsIn
