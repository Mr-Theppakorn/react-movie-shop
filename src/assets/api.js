import axios from 'axios';

const apiKey = '6fc9531219d02e61b90c2a54a09ba7a2';

export const getMovie = async (name) => {
    return await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${name}`);
}
