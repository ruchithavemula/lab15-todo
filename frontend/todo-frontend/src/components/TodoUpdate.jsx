import { useState } from 'react';
import API_URL from '../config';

function TodoUpdate({ todo, onUpdate, onCancel }) {
    const [title, setTitle] = useState(todo.title);

    const save = async () => {
        const res = await fetch(`${API_URL}/${todo.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...todo, title })
        });
        const updated = await res.json();
        onUpdate(updated);
    };

    return (
        <div className="update-box">
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
            <button onClick={save}>Save</button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    );
}

export default TodoUpdate;
