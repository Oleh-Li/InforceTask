import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/slices/products';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AddProductModal from '../components/modal/AddProductModal.jsx';

export const Home = () => {
    const dispatch = useDispatch();
    const { products: { items, status } } = useSelector(state => state.products);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleAddProductClick = () => {
        setIsModalOpen(true);
    };

    const handleAddProduct = async (newProduct) => {
        try {
            await axios.post('http://localhost:3000/products', newProduct);
            dispatch(fetchProducts());
        } catch (err) {
            console.error("Error adding product:", err);
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
                        {/* <button>Remove</button> */}
                    </div>
                ))}
            </ul>

            <AddProductModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAddProduct={handleAddProduct}
            />
        </>
    );
};
