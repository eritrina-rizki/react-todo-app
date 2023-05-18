import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Animation for all of elements in the list when changed to edit mode
const editList = {
    hidden: { opacity: 0.8 },
    visible: { opacity: 1 },
}


const EditTodo = ({id, title, editTodo, saveTodo, deleteTodo}) => {
    const [updateTodo, setUpdateTodo] = useState(title)

    // Function for submit the updated data, save to Local Storage, and display the title to the new title in interface
    const handleSubmit = (e) => {
        e.preventDefault()
        if (updateTodo === " ") return
    
        saveTodo(id, updateTodo)
    
        setUpdateTodo(updateTodo)
    }

    // Set the targeted component to activate the close outside function below
    const editRef = useRef()

    // Function for close the edit mode when users click outside the targeted component
    useEffect(() => {
        const handler = (e) => {
            if (!editRef.current.contains(e.target)) {
              editTodo(id)
            }
        }

        document.addEventListener("mousedown", handler)

        // Avoid re-render the event listener when we don't use it
        return() => {
            document.removeEventListener("mousedown", handler)
        }
    })

    return (
        <motion.li ref={editRef} exit={{ opacity: 0, scale: 0.5, duration: 0.3 }}>
            <form onSubmit={handleSubmit} className='edit-item-form'>
                <AnimatePresence>
                    <motion.label initial="hidden" animate="visible" exit="hidden" variants={editList}>
                        <motion.button id="backtTodo" type='button' className="back-todo" onClick={() => editTodo(id)} variants={editList}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="80 0 512 512" fill='currentColor'>
                                <path d="M213.7 256L380.9 81.9c4.2-4.3 4.1-11.4-.2-15.8l-29.9-30.6c-4.3-4.4-11.3-4.5-15.5-.2L131.1 247.9c-2.2 2.2-3.2 5.2-3 8.1-.1 3 .9 5.9 3 8.1l204.2 212.7c4.2 4.3 11.2 4.2 15.5-.2l29.9-30.6c4.3-4.4 4.4-11.5.2-15.8L213.7 256z"></path>
                            </svg>
                        </motion.button>
                        <motion.input type='text' id='todoTitle' defaultValue={updateTodo} onChange={({target}) => setUpdateTodo(target.value)} autoFocus autoComplete='off' required variants={editList} />
                    </motion.label>
                    <motion.div className="actions" initial="hidden" animate="visible" exit="hidden" variants={editList}>
                        <motion.button id="editTodo" className="save-todo" type="submit" variants={editList}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" fill="currentColor" className="w-5 h-5">
                                <path fillRule="evenodd" d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5z"></path>
                            </svg>
                        </motion.button>
                        <motion.button id="deleteTodo" className="delete-todo" onClick={() => deleteTodo(id)} variants={editList}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                            </svg>
                        </motion.button>
                    </motion.div>      
                </AnimatePresence>
            </form>   
        </motion.li>
    )
}

export default EditTodo;