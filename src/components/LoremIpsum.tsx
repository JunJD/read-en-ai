import { motion, useMotionTemplate, useMotionValue, useScroll, useSpring } from "framer-motion";
import { data } from './../mock/data'
import { useEffect, useState } from "react";
import { throttle } from 'lodash-es'

export function LoremIpsum() {

  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 15,
    restDelta: 0.002
  });

  const [showIndex, setShowIndex] = useState(0)
  const current = useMotionValue(0)
  useEffect(() => {
    const fn = throttle((v) => {
      if (v >= 0.96) {
        const motionRefs = document.querySelectorAll('.motionKey')
        document.documentElement.scrollTop = 0;
        setShowIndex(prev => {
          if (prev >= data.length - 1) return prev
          current.set(prev + 1)
          console.dir((motionRefs[prev] as any).offsetTop, 'motionRefs[prev]')
          return prev + 1
        })
      }
    }, 1000)
    scaleX.onChange(fn)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const background = useMotionTemplate`radial-gradient(12px circle at calc(${scaleX} * 100vw - 40px) calc(${current} * 75px + 200px), red 0%, transparent 165%)`
  window.onscroll = throttle(function () {
  })
  return (
    <>
      <motion.article
        style={{ background }}
      >
        <h1>
          <code>useScroll</code> with spring smoothing
        </h1>
        {
          data.map((item, index) => {
            if (item.tag === 'p') {
              return (
                <p
                  className='motionKey'
                  key={index}
                >
                  {item.content}
                </p>
              )
            } else {
              return (
                <div
                  key={index}
                >
                  {item.content}
                </div>
              )
            }
          })
        }

      </motion.article>
    </>
  );
}
