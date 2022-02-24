import { useEffect, useState } from "react";
import Genre from "../models/Genre";
import Movie from "../models/Movie";
import { api } from "../services/api";
import { MovieCard } from "./MovieCard";

interface ContentProps {
  selectedGenreId: number
};

export function Content(props: ContentProps) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<Genre>({} as Genre);
  
  useEffect(() => {
    api.get<Movie[]>(`movies/?Genre_id=${props.selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

    api.get<Genre>(`genres/${props.selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [props.selectedGenreId]);

  return (
    <div className="container">
      <header>
        <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
      </header>

      <main>
        <div className="movies-list">
          {movies.map(movie => (
            <MovieCard key={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
          ))}
        </div>
      </main>
    </div>
  )
}