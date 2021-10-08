import httpClient from "../http-client";
import Movie from "../models/movie";
import Paginated from "../models/paginated";

const getPopularMovies = async () => {
  return (await httpClient.get<Paginated<Movie>>(`/movie/popular`)).data;
};

const getTopRatedMovies = async () => {
  return (await httpClient.get<Paginated<Movie>>(`/movie/top_rated`)).data;
};

const getMovie = async (movieId: string) => {
  return (await httpClient.get<Movie>(`/movie/${movieId}`)).data;
};

export { getPopularMovies, getTopRatedMovies, getMovie };
