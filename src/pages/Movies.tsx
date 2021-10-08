import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import MovieCard from "../components/MovieCard";
import Movie from "../models/movie";
import { getPopularMovies, getTopRatedMovies } from "../services/movies";

const MoviesContainer = styled.div``;

const MoviesList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px;

  h3.title {
    font-size: 1.4rem;
    border-bottom: solid 3px var(--default-white);
  }

  div.list {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
  }
`;

const PopularMovies = styled(MoviesList)``;

const TopRatedMovies = styled(MoviesList)``;

const Movies: React.FC = () => {
  const [popMovies, setPopMovies] = useState([] as Movie[]);
  const [topRatedMovies, setTopRatedMovies] = useState([] as Movie[]);

  const getMovies = useCallback(async () => {
    const { results: popMovies } = await getPopularMovies();
    setPopMovies(popMovies);

    const { results: topRatedMovies } = await getTopRatedMovies();
    setTopRatedMovies(topRatedMovies);
  }, []);

  useEffect(() => {
    getMovies();
  }, [getMovies]);

  return (
    <MoviesContainer>
      {!!popMovies?.length && (
        <PopularMovies>
          <h3 className="title">Popular Movies</h3>
          <div className="list">
            {popMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </PopularMovies>
      )}
      {!!topRatedMovies?.length && (
        <TopRatedMovies>
          <h3 className="title">Top Rated Movies</h3>
          <div className="list">
            {topRatedMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </TopRatedMovies>
      )}
    </MoviesContainer>
  );
};

export default Movies;
