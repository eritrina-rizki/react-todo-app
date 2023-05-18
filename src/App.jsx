import './App.css';
import { useEffect, useState } from 'react';
import Form from './components/Form';
import Header from './components/header';
import TodoList from './components/TodoList';

function App() {
    // Create empty array state to be able to update data (todos) and get data from Local Storage key "item"
    const [todos, setTodos] = useState(() => {
        const localValue = localStorage.getItem("items")
        if (localValue == null) return []
        
        return JSON.parse(localValue)
    })
    
    // Save data (todos) to Local Storage
    useEffect(() => {
        localStorage.setItem("items", JSON.stringify(todos))
    }, [todos])
  
    // Function for add todo, spread operator (...) allows us to quickly copy all of an existing array into another array
    const addTodo = (title) => {
        setTodos(currentTodos => {
            return [
              ...currentTodos, {
                id: crypto.randomUUID(),
                title,
                date: new Date(),
                completed: false,
                edited: false,
            }]
        })
    }
  
    // Function for change the todo status to completed
    const toggleTodo = (id, completed) => {
        setTodos(currentTodos => {
            return currentTodos.map(todo => {
                if (todo.id === id) {
                  return {...todo, completed}
                }

                return todo
            })
        })
    }
  
    // Function for change the todo status to edited
    const editTodo = (id) => {
        setTodos(currentTodos => {
            return currentTodos.map(todo => todo.id === id ? {...todo, edited: !todo.edited}: todo)
        })
    }

    // Function for save the new title and display the new title in interface after updating or editing todo
    const saveTodo = (id, title) => {
        setTodos(currentTodos => {
            return currentTodos.map(todo => todo.id === id ? {...todo, title, edited: !todo.edited}: todo)
        })
    }

    // Function for delete todo
    const deleteTodo = (id) => {
        setTodos(currentTodos => {
            return currentTodos.filter(todo => todo.id !== id)
        })
    }

    return (
        <>
            <div className='App'>
                <Header />
                <Form addTodo={addTodo} />
                <TodoList todos={todos} toggleTodo={toggleTodo} editTodo={editTodo} saveTodo={saveTodo} deleteTodo={deleteTodo} />
            </div>
        </>
    )
}

export default App;