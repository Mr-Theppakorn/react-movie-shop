import React from 'react'
import { useState, useEffect } from 'react'
import { getMovie } from '../assets/api';
import MovieCard from '../components/MovieCard';

const Home = ({ cart, updateCart }) => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        loadMovies();
    }, []);

    useEffect(() => {
        let searchTimeout;
        const delay = 1000;
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }
        searchTimeout = setTimeout(() => {
            handleSearch(searchTerm);
        }, delay);

        return () => {
            clearTimeout(searchTimeout);
        };
    }, [searchTerm]);


    const loadMovies = () => {
        setLoading(true);
        getMovie('Star Wars')
            .then((res) => {
                const data = res.data.results;
                const movieData = data.map(item => ({
                    ...item,
                    price: (item.vote_average + 10).toFixed(2)
                }));
                setMovies(movieData);
                setLoading(false);
            }).catch((err) => {
                console.log(err);
            });
    }

    const handleCart = (movie) => {
        const isItemInCart = cart.some(item => item.id === movie.id);
        if (isItemInCart) {
            alert("This item is already in your cart.");
        } else {
            updateCart(movie);
        }
    }


    const handleSearch = (searchTerm) => {
        if (searchTerm) {
            getMovie(searchTerm)
                .then((res) => {
                    const data = res.data.results;
                    const movieData = data.map(item => ({
                        ...item,
                        price: (item.vote_average + 10).toFixed(0)
                    }));
                    setMovies(movieData);
                }).catch((err) => {
                    console.log(err);
                });
        }
    }

    const handleUpdate = (id, newPrice) => {
        const formattedPrice = parseFloat(newPrice).toFixed(2);
        const movieData = movies.map(item => {
            if (item.id === id) {
                return { ...item, price: formattedPrice };
            }
            return item;
        });
        setMovies(movieData);
    }

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    }

    return (
        <div className='container mx-auto'>
            <div className='flex my-5 w-full'>
                <input
                    type="text"
                    placeholder="Search..."
                    className="input input-bordered input-info w-full"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />

            </div>
            <div className="grid grid-cols-4 justify-around gap-4">
                {loading ? <div>Loading...</div> :
                    movies.map((m, i) => (
                        <MovieCard key={i} movie={m} handleUpdate={handleUpdate} handleCart={handleCart} />
                    ))
                }
            </div>
        </div>
    )
}

export default Home