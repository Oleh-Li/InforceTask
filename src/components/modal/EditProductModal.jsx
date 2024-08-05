import React from 'react';
import '../modal.css';

const EditProductModal = ({ isOpen, onClose, onSave, productData }) => {
    const [formData, setFormData] = React.useState(productData);

    React.useEffect(() => {
        setFormData(productData);
    }, [productData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSave = () => {
        onSave(formData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Edit Product</h2>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Image URL:
                    <input
                        type="text"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Weight:
                    <input
                        type="text"
                        name="weight"
                        value={formData.weight}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Width:
                    <input
                        type="number"
                        name="sizeWidth"
                        value={formData.size.width}
                        onChange={e => handleChange({ target: { name: 'sizeWidth', value: e.target.value } })}
                    />
                </label>
                <label>
                    Height:
                    <input
                        type="number"
                        name="sizeHeight"
                        value={formData.size.height}
                        onChange={e => handleChange({ target: { name: 'sizeHeight', value: e.target.value } })}
                    />
                </label>
                <button onClick={handleSave}>Save</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default EditProductModal;
