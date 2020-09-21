import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const slideInOnScroll = (elementContainer, element1, element2) => {
  const tl = gsap
    .timeline({
      scrollTrigger: {
        trigger: elementContainer,
        scrub: 1,
        start: 'top 80%',
        end: 'top 40%',
      },
    })
    .from(element1, 0.1, {
      x: '17vw',
      y: '25vh',
      transformOrigin: '50% 50%',
      ease: 'Power3.out',
    })
    .from(
      [...element2.children].reverse(),
      0.1,
      {
        x: '-20vw',
        transformOrigin: '50% 50%',
        ease: 'Power3.out',
        stagger: {
          amount: 0.03,
        },
      },
      0
    )
    .from(
      [...element2.children].reverse(),
      0.1,
      {
        y: '-20vh',
        ease: 'Power1.out',
      },
      '<'
    )
    .from(
      [...element2.children].reverse(),
      0.1,
      {
        opacity: 0,
        ease: 'Power1.out',
      },
      '<'
    )

  return tl
}

export default slideInOnScroll
