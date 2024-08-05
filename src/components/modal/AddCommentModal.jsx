import React, { useState } from 'react';
import '../modal.css';

const AddCommentModal = ({ isOpen, onClose, onAddComment }) => {
    const [newComment, setNewComment] = useState("");
    const [error, setError] = useState("");

    const handleAddComment = () => {
        if (!newComment) {
            setError("Comment cannot be empty.");
            return;
        }
        onAddComment(newComment);
        setNewComment("");
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Add Comment</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <label>
                    Comment:
                    <input
                        type="text"
                        value={newComment}
                        onChange={e => setNewComment(e.target.value)}
                    />
                </label>
                <button onClick={handleAddComment}>Add Comment</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default AddCommentModal;
