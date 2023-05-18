import { useState } from 'react';
import { animate, motion } from 'framer-motion';

// Animation for form when users entering the page
const forms = {
    hidden: { scale: 0.8 },
    visible: { scale: 1 },
}

// Animation for add button
const button = () => {
    animate([
      [".btn", { scale: 0.8 }, { duration: 0.08, at: "<" }],
      [".btn", { scale: 1 }, { duration: 0.08 }],
    ])
}


const Form = ({addTodo}) => {
    const [newTodo, setNewTodo] = useState("")

    // Function for submit the form, save new todo to Local Storage, display the title in interface, and set the form to empty string
    const handleSubmit = (e) => {
        e.preventDefault()
        if (newTodo === " ") return
    
        addTodo(newTodo)
    
        setNewTodo("")
    }

    // Function for create a radial gradient mouse hover effect
    const [cursorX, setCursorX] = useState()
    const [cursorY, setCursorY] = useState()

    window.addEventListener('mousemove', (e) => {
        setCursorX(e.pageX)
        setCursorY(e.pageY)

        return window.removeEventListener('mousemove', (e))
    })

    return (
        <form onSubmit={handleSubmit} className='new-item-form'>
            <div className="new-item-container">
                <motion.div className="radial-gradient" style={{ left: cursorX - 75, top: cursorY - 75 }} />
                <motion.div className="form-row" layout variants={forms} initial="hidden" animate="visible">
                    <input value={newTodo} onChange={({target}) => setNewTodo(target.value)} type='text' id='item' className='item' placeholder='What to do?' autoComplete='off' required />
                    <motion.button className='btn' whileTap={button}>Add</motion.button>
                </motion.div>
            </div>
        </form>   
    )
}

export default Form;