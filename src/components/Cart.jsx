import React, { useState, useEffect } from 'react'

const Cart = ({ cart, removeCartById, totalPrice, removeCart }) => {
    const [total, setTotal] = useState();
    const [seconds, setSeconds] = useState(0);
    const [discount, setDiscount] = useState('');
    const [isCounting, setIsCounting] = useState(false);

    const handleRemove = (id) => {
        removeCartById(id);
    }

    const clearCart = () => {
        removeCart();
        setTotal();
    }

    useEffect(() => {
        applyDiscount();
    }, [totalPrice]);

    useEffect(() => {
        let timer;
        if (isCounting && seconds > 0) {
            timer = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds - 1);
            }, 1000);
        }
        if (seconds === 0) {
            setIsCounting(false);
        }
        return () => {
            clearInterval(timer);
        };
    }, [isCounting, seconds]);


    const applyDiscount = () => {
        if (cart.length > 3 && cart.length <= 5) {
            const discount = 0.2 * totalPrice;
            const discountedPrice = totalPrice - discount;
            setTotal(discountedPrice.toFixed(2));
            setDiscount('10%')
        } else if (cart.length > 5) {
            const discount = 0.2 * totalPrice;
            const discountedPrice = totalPrice - discount;
            setTotal(discountedPrice.toFixed(2));
            setDiscount('20%')
        } else {
            setTotal(totalPrice);
        }

    }

    const handleStartTimer = () => {
        setSeconds(60);
        document.getElementById('my_modal_1').showModal()
        setIsCounting(true);
    };

    return (
        <div className='container mx-auto'>
            <div className='text-3xl font-bold mt-5'>Cart</div>
            <div className="divider"></div>
            <div className='flex my-5'>
                <div className="overflow-x-auto w-2/3">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map(c => (
                                <tr key={c.id}>
                                    <td><img className='w-12' src={`https://image.tmdb.org/t/p/w500/${c.poster_path}`} /></td>
                                    <td>{c.title}</td>
                                    <td>{c.price}$</td>
                                    <td><button className='btn btn-error' onClick={() => handleRemove(c.id)}>Remove</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div>
                    <div className='w-96 p-10 mx-auto border border-base-300 rounded shadow-md'>
                        <h1 className='text-2xl font-bold text-center'>Order Summary</h1>
                        <div className='mt-5'>Total Price : {totalPrice}</div>
                        {cart.length > 3 && <div className=''>Total Price After Discount {discount} : {total}</div>}
                        <div className='flex justify-around mt-5'>
                            <button className='btn btn-error' onClick={clearCart}>Clear Cart</button>
                            <button className='btn btn-success' onClick={handleStartTimer}>Checkout</button>
                        </div>
                    </div>
                </div>
            </div>
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-2xl text-center">กรุณาชำระเงิน</h3>
                    <p className="py-4 text-1xl text-center ">โอนเงินไปที่หมายเลข : 0123456789 ภายใน 1 นาที </p>
                    <p className="py-4 text-2xl text-center ">{seconds !== 0 ? `${seconds}S` : 'หมดเวลา'}</p>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default Cart;