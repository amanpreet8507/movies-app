import axios from "axios";
import { useEffect, useState } from "react";
import Movie from "../../components/Movie/Movie";
// import MoviesList from "../../components/MoviesList/MoviesList";


// Fetching Movies: https://api.themoviedb.org/3/discover/movie/?api_key=a05e7d6beb2f7a3517a89a11bbe7d381
// Genre id to fetch Genre: https://api.themoviedb.org/3/genre/movie/list?api_key=a05e7d6beb2f7a3517a89a11bbe7d381   

const HomePage = () => {
    const [movies, setMovies] = useState([])
    
    const fetchMovies = async () => {
        const moviesData = await axios.get('https://api.themoviedb.org/3/discover/movie/?api_key=a05e7d6beb2f7a3517a89a11bbe7d381')
        const finalMovieData = moviesData.data.results
        setMovies(finalMovieData)
    }

    useEffect(()=>{
        fetchMovies()
    }, [])
    console.log(movies)
        return (
            <ul> 
                {movies.map((movie) => {
                    return(
                        <Movie key={movie.id}
                            title = {movie.title}
                            image = {`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            releaseDate = {movie.release_date}
                            overview = {movie.overview}
                        />
                    )
                })}
            </ul>
        )}  



export default HomePage
