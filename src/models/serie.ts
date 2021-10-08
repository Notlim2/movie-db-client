import ItemType from "./item-type";

interface Serie {
  id: number;
  name: string;
  original_name: string;
  overview: string;
  poster_path?: string;
  seasons: {
    id: string;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
  }[];
  type: ItemType;
  backdrop_path?: string;
  first_air_date: string;
  vote_average: number;
  number_of_seasons: number;
}

export default Serie;
