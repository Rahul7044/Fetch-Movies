import React, { useState } from "react";
import MoviesList from "./components/MoviesList";
import "./App.css";
function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const FetchMovieHandler =  async () => {
    setIsLoading(true);
    setError(null);
    try{
      const response = await fetch("https://swapi.dev/api/film/");
      if(!response.ok){
        throw new Error('Something went wrong!');
      }
      const data = await response.json();
          const transformedMovies = data.results.map((movie) => {
            return {
              id: movie.episode_id,
              title: movie.title,
              openingText: movie.opening_crawl,
              releaseDate: movie.release_date,
            };
          });
          setMovies(transformedMovies);
          
    }
    catch(error){
      setError(error.message);
    }
    setIsLoading(false);
    

  };

  return (
    <React.Fragment>
      <section>
        <button onClick={FetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        { !isLoading &&movies.length>0 && <MoviesList movies={movies} /> }
        {!isLoading && movies.length === 0 && !error && <p>Found no movies</p>}
        {!isLoading && error && <p>{error}</p>}
        {isLoading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}
export default App;