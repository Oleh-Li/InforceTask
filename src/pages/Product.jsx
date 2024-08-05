import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import EditProductModal from '../components/modal/EditProductModal.jsx';
import AddCommentModal from '../components/modal/AddCommentModal.jsx';

export const Product = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddCommentModalOpen, setIsAddCommentModalOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/products/${id}`);
                setData(response.data);
            } catch (err) {
                setError("Product not found");
            }
        };

        if (id) {
            fetchData();
        }
    }, [id]);

    const handleEditClick = () => {
        setIsEditModalOpen(true);
    };

    const handleAddCommentClick = () => {
        setIsAddCommentModalOpen(true);
    };

    const handleSave = async (updatedData) => {
        try {
            await axios.put(`http://localhost:3000/products/${id}`, updatedData);
            setData(updatedData);
        } catch (err) {
            console.error("Error updating product:", err);
        }
    };

    const handleAddComment = async (newComment) => {
        const updatedProduct = {
            ...data,
            comments: [...data.comments, { id: Date.now(), description: newComment, date: new Date().toISOString() }]
        };
        try {
            await axios.put(`http://localhost:3000/products/${id}`, updatedProduct);
            setData(updatedProduct);
        } catch (err) {
            console.error("Error adding comment:", err);
        }
    };

    if (error) {
        return <p>{error}</p>;
    }

    if (!data) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>{data.name}</h1>
            <img src={data.imageUrl} alt={data.name} />
            <p>Weight: {data.weight}</p>
            <p>Size: {data.size.width}x{data.size.height}</p>
            <button onClick={handleEditClick}>Edit</button>
            {data.comments.length > 0 &&
                <>
                    <h3>Comments:</h3>
                    {data.comments.map(({ description, date }, index) => (
                        <div key={index}>
                            <p>{description}</p>
                            <p>{date}</p>
                            <hr />
                        </div>
                    ))}
                </>
            }

            <button onClick={handleAddCommentClick}>Add Comment</button>

            <EditProductModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSave={handleSave}
                productData={data}
            />

            <AddCommentModal
                isOpen={isAddCommentModalOpen}
                onClose={() => setIsAddCommentModalOpen(false)}
                onAddComment={handleAddComment}
            />
        </div>
    );
};
