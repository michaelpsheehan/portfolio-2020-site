import { gsap } from 'gsap'

const staggerItemsIn = (
  items: HTMLCollection,
  currentEase: string = 'Power2.out',
  staggerAmount: number = 0.3
): gsap.core.Timeline  => {

    const tl = gsap.timeline().from(items, {
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

export default staggerItemsIn
