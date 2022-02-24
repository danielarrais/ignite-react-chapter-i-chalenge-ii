import { useEffect, useState } from "react";
import Genre from "../models/Genre";
import { api } from "../services/api";
import { Button } from "./Button";

interface SideBarProps {
  requestChangeGenre: Function;
  selectedGenreId: number;
}

export function SideBar(props: SideBarProps) {
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    api.get<Genre[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => props.requestChangeGenre(genre.id)}
            selected={props.selectedGenreId === genre.id}
          />
        ))}
      </div>

    </nav>
  )
}