import React from "react";
import { Player } from '@lottiefiles/react-lottie-player';
import { AnimatePresence, motion } from "framer-motion";

// Animation for no todo state when users entering the page
const noTodo = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, delay: 0.5 },
}

const NoTodo = () => {
    return (
        <AnimatePresence>
            <motion.div className='noTodoContainer' variants={noTodo} initial="hidden" animate="visible" exit="hidden">
                <motion.div className="illustration" variants={noTodo}>
                    <Player className="illustrationSvg"
                        autoplay
                        loop
                        src="https://assets1.lottiefiles.com/packages/lf20_p6oR0LIPXr.json"
                        >
                    </Player>
                </motion.div>
                <motion.div className="noTodoText" variants={noTodo}>
                    <h2 className="noTodoTitle">Nothing to do for today</h2>
                    <p className="noTodoDes">Grab coffee. Play music. Just relax.</p>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )

}

export default NoTodo;