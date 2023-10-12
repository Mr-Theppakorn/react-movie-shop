import * as React from 'react';
import { useState } from 'react';

const MovieCard = ({ movie, handleUpdate, handleCart }) => {
    const { title, price, poster_path, id } = movie;

    const [onEdit, setOnEdit] = useState(false);
    const [newPrice, setNewPrice] = useState(price);

    const changePrice = (e) => {
        setNewPrice(e.target.value);
    }

    const handlePrice = () => {
        handleUpdate(id, newPrice);
        setOnEdit(false);
    }

    const handleAddToCart = () => {
        handleCart(movie);
    }


    return (
        <div className="card  bg-base-100 shadow-xl cursor-pointer">
            <figure><img className='w-96' src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <div className="card-actions justify-between">
                    <div className='text-2xl'>
                        {onEdit ? <input className="input input-bordered input-accent w-full" type="text" value={newPrice} onChange={changePrice} /> : <div>{price}$</div>}
                    </div>
                    {onEdit ? <button className="btn btn-primary" onClick={handlePrice}>Update</button> :
                        <button className="btn btn-primary" onClick={() => setOnEdit(!onEdit)}>Edit</button>}
                    <button className="btn btn-primary" onClick={handleAddToCart}>Add to Cart</button>
                </div>
            </div>
        </div >
    )
}

export default MovieCard;