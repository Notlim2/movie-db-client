import ItemType from "./item-type";

interface Movie {
  id: number;
  homepage?: string;
  title: string;
  overview: string;
  original_title: string;
  release_date: string;
  poster_path?: string;
  backdrop_path?: string;
  type: ItemType;
  vote_average: number;
}

export default Movie;
