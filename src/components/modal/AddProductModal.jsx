import React, { useState } from 'react';
import '../modal.css';
import { nanoid } from 'nanoid';

const AddProductModal = ({ isOpen, onClose, onAddProduct }) => {
    const [productData, setProductData] = useState({
        name: '',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg',
        count: '',
        weight: '',
        width: '',
        height: ''
    });
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleAddProduct = () => {
        if (!productData.name || !productData.imageUrl || !productData.count || !productData.weight || !productData.width || !productData.height) {
            setError('All fields are required.');
            return;
        }

        const newProduct = {
            id: nanoid(),
            ...productData,
            size: {
                width: parseInt(productData.width, 10),
                height: parseInt(productData.height, 10)
            },
            comments: []
        };

        onAddProduct(newProduct);
        setProductData({
            name: '',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg',
            count: '',
            weight: '',
            width: '',
            height: ''
        });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Add New Product</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={productData.name}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Image URL:
                    <input
                        type="text"
                        name="imageUrl"
                        value={productData.imageUrl}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Count:
                    <input
                        type="number"
                        name="count"
                        value={productData.count}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Weight:
                    <input
                        type="text"
                        name="weight"
                        value={productData.weight}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Width:
                    <input
                        type="number"
                        name="width"
                        value={productData.width}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Height:
                    <input
                        type="number"
                        name="height"
                        value={productData.height}
                        onChange={handleInputChange}
                    />
                </label>
                <button onClick={handleAddProduct}>Add Product</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default AddProductModal;
