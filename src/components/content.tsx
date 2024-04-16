import { motion, useMotionTemplate, useMotionValue, useScroll, useSpring } from "framer-motion";
import { useEffect } from "react";


interface IContent {
    showIndex: number,
    index: number,
    item: {
        content: string,
        tag: string
    },
}

export function Content(props: IContent) {
    const { showIndex, index, item } = props
    const { scrollYProgress } = useScroll();

    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const width = useMotionValue((item.content.length - 1) * 10 + 'px')

    useEffect(() => {
        if (showIndex !== index) {
            width.set(0 + 'px')
        } else {
            width.set((item.content.length - 1) * 10 + 'px')
        }
    }, [index, item.content.length, showIndex, width])

    const initBackground = 'transparent'
    const background = useMotionTemplate`radial-gradient(20px circle at calc(${scaleX} * ${width}) 12px, red 0%, transparent 165%)`
    return (
        <motion.p
            key={index}
            style={{ background: showIndex === index ? background : initBackground }}
        >
            {item.content}
        </motion.p>
    )
}
