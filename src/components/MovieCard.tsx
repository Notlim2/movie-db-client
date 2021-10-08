import clamp from "clamp-js";
import React, { useContext, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import AppContext from "../contexts/AppContext";
import getFullImageUrl from "../helpers/get-full-image-url";
import Movie from "../models/movie";
import MovieBanner from "./MovieBanner";

interface MovieCardContainerProps {
  background?: string;
}

const MovieCardContainer = styled.div<MovieCardContainerProps>`
  padding: 16px;
  width: 280px;
  height: 240px;
  border-radius: 4px;
  cursor: pointer;

  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  gap: 8px;

  p {
    margin: 0;
  }

  ${(props) => css`
    background-image: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.2) 40%,
        rgba(0, 0, 0, 0.6) 60%
      ),
      url(${props.background});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  `}
`;

const MovieTitle = styled.h3`
  margin: 0;
`;

const MovieOverview = styled.p``;

const MovieReleaseDate = styled.p`
  font-size: 1.1rem;
`;

const MovieReview = styled.p``;

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const { setShowModal, setModalContent } = useContext(AppContext);
  const movieTitle = useRef<HTMLHeadingElement>(null);
  const movieOverview = useRef<HTMLHeadingElement>(null);

  const openMovieModal = () => {
    setModalContent(<MovieBanner movie={movie} />);
    setShowModal(true);
  };

  useEffect(() => {
    if (movieTitle.current) {
      clamp(movieTitle.current, { clamp: 1 });
    }

    if (movieOverview.current) {
      clamp(movieOverview.current, { clamp: 2 });
    }
  }, [movieTitle]);

  return (
    <MovieCardContainer
      background={
        movie.backdrop_path
          ? getFullImageUrl(movie.backdrop_path)
          : movie.poster_path
          ? getFullImageUrl(movie.poster_path)
          : ""
      }
      onClick={openMovieModal}
    >
      <MovieTitle ref={movieTitle} title={movie.title}>
        {movie.title} ({movie.original_title})
      </MovieTitle>
      {movie.overview && (
        <MovieOverview ref={movieOverview}>{movie.overview}</MovieOverview>
      )}
      {movie.release_date && (
        <MovieReleaseDate>
          <strong>Release Date: </strong>
          {new Intl.DateTimeFormat("en-us").format(
            new Date(movie.release_date)
          )}
        </MovieReleaseDate>
      )}
      <MovieReview>
        <strong>Movie Rating: </strong>
        {movie.vote_average}
      </MovieReview>
    </MovieCardContainer>
  );
};

export default MovieCard;
