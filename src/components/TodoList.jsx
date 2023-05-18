import { motion, AnimatePresence } from 'framer-motion';
import NoTodo from './NoTodo';
import Lists from './Lists';
import EditTodo from './EditList';

// Animation for header when users entering the page
const header = {
    hidden: { scale: 0.8 },
    visible: { scale: 1 },
}


const TodoList = ({todos, toggleTodo, editTodo, saveTodo, deleteTodo}) => {
    return (
        <div className="todo-container">
            <motion.h1 className="todo-header" variants={header} initial="hidden" animate="visible">To-do List</motion.h1>
            <ul className="list">
                <AnimatePresence>
                  {/* Display the empty state (no todo list) when there's no todo in the list */}
                    {todos.length === 0 && <NoTodo />}
                    
                    {/* Display between the edit mode when the todo status is edited and default mode when the edited is off */}
                    {todos.map((todo, i) => (
                        todo.edited ? (
                            <EditTodo id={todo.id} title={todo.title} key={todo.id} editTodo={editTodo} deleteTodo={deleteTodo} saveTodo={saveTodo} />
                        ) : (
                            <Lists id={todo.id} title={todo.title} completed={todo.completed} key={todo.id} toggleTodo={toggleTodo} editTodo={editTodo} deleteTodo={deleteTodo} i={i} />
                        )
                    ))}
                </AnimatePresence>
            </ul>
        </div>
    )
}

export default TodoList;