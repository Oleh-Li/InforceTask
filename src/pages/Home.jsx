import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/slices/products';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AddProductModal from '../components/modal/AddProductModal.jsx';
import ConfirmDeleteModal from '../components/modal/ConfirmDeleteModal.jsx';

export const Home = () => {
    const dispatch = useDispatch();
    const { products: { items, status } } = useSelector(state => state.products);
    const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
    const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleAddProductClick = () => {
        setIsAddProductModalOpen(true);
    };

    const handleAddProduct = async (newProduct) => {
        try {
            await axios.post('http://localhost:3000/products', newProduct);
            dispatch(fetchProducts());
        } catch (err) {
            console.error("Error adding product:", err);
        }
    };

    const handleRemoveClick = (product) => {
        setProductToDelete(product);
        setIsConfirmDeleteModalOpen(true);
    };

    const handleDeleteProduct = async () => {
        try {
            if (productToDelete) {
                await axios.delete(`http://localhost:3000/products/${productToDelete.id}`);
                dispatch(fetchProducts());
            }
        } catch (err) {
            console.error("Error deleting product:", err);
        } finally {
            setIsConfirmDeleteModalOpen(false);
            setProductToDelete(null);
        }
    };

    return (
        <>
            <button onClick={handleAddProductClick}>Add Product</button>
            <ul>
                {items.map(({ id, name, imageUrl }) => (
                    <div key={id}>
                        <Link to={`/products/${id}`}>
                            <h3>{name}</h3>
                        </Link>
                        {imageUrl ? <img height={200} src={imageUrl} alt={name} /> : <p>No Image</p>}
                        <hr />
                        <button onClick={() => handleRemoveClick({ id, name })}>Remove</button>
                    </div>
                ))}
            </ul>

            <AddProductModal
                isOpen={isAddProductModalOpen}
                onClose={() => setIsAddProductModalOpen(false)}
                onAddProduct={handleAddProduct}
            />

            <ConfirmDeleteModal
                isOpen={isConfirmDeleteModalOpen}
                onClose={() => setIsConfirmDeleteModalOpen(false)}
                onConfirm={handleDeleteProduct}
                productName={productToDelete?.name}
            />
        </>
    );
};
