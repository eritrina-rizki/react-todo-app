import { motion } from "framer-motion";

// Animation for header when users entering the page
const header = {
    hidden: { scale: 0.8 },
    visible: { scale: 1 },
}


const Header = () => {
    return (
        <div className="headerContainer">
            <motion.h1 className="headerTitle" initial="hidden" animate="visible" variants={header}>My To-do List ✏️</motion.h1>
        </div>
    )
}

export default Header;