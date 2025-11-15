import { useState } from 'react';
import API_URL from '../config';

function TodoForm({ onAdd }) {
    const [title, setTitle] = useState('');

    const submit = async (e) => {
        e.preventDefault();
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, completed: false })
        });
        const data = await res.json();
        onAdd(data);
        setTitle('');
    };

    return (
        <form onSubmit={submit} className="todo-form">
            <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter task"
            />
            <button>Add</button>
        </form>
    );
}

export default TodoForm;
