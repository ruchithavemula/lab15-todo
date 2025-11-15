import { useEffect, useState } from 'react';
import API_URL from '../config';
import TodoForm from './TodoForm';
import TodoUpdate from './TodoUpdate';

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [editing, setEditing] = useState(null);

    const loadTodos = async () => {
        const res = await fetch(API_URL);
        const data = await res.json();
        setTodos(data);
    };

    const addTodo = (todo) => {
        setTodos([...todos, todo]);
    };

    const startEdit = (todo) => {
        setEditing(todo);
    };

    const updateTodo = (updated) => {
        setTodos(todos.map(t => t.id === updated.id ? updated : t));
        setEditing(null);
    };

    const toggle = async (todo) => {
        const res = await fetch(`${API_URL}/${todo.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...todo, completed: !todo.completed })
        });
        const updated = await res.json();
        setTodos(todos.map(t => t.id === updated.id ? updated : t));
    };

    const remove = async (id) => {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        setTodos(todos.filter(t => t.id !== id));
    };

    useEffect(() => { loadTodos(); }, []);

    return (
        <div className="todo-container">
            <h2>To-Do Tracker</h2>
            <TodoForm onAdd={addTodo} />

            {editing && (
                <TodoUpdate 
                    todo={editing} 
                    onUpdate={updateTodo} 
                    onCancel={() => setEditing(null)} 
                />
            )}

            <ul>
                {todos.map(todo => (
                    <li key={todo.id} className={todo.completed ? 'done' : ''}>
                        <span onClick={() => toggle(todo)}>{todo.title}</span>
                        <button onClick={() => startEdit(todo)}>Edit</button>
                        <button onClick={() => remove(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoList;
