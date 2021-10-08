import React from "react";
import styled, { css } from "styled-components";
import getFullImageUrl from "../helpers/get-full-image-url";
import Movie from "../models/movie";

interface MovieBannerContainerProps {
  background?: string;
}

const MovieBannerContainer = styled.div<MovieBannerContainerProps>`
  height: 100%;
  width: 100%;
  padding: 16px;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;

  & > h3,
  & > p {
    margin: 4px 0;
  }

  ${(props) => css`
    background-image: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.2) 40%,
        rgba(0, 0, 0, 0.45) 60%
      ),
      url(${props.background});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  `}
`;

const MovieTitle = styled.h3`
  font-size: 2rem;
  margin: 0;
`;

const MovieOverview = styled.p`
  font-size: 1.2rem;
`;

const MovieReleaseDate = styled.p`
  font-size: 1.1rem;
`;

const MovieReview = styled.p``;

interface MovieBannerProps {
  movie: Movie;
}

const MovieBanner: React.FC<MovieBannerProps> = ({ movie }) => {
  return (
    <MovieBannerContainer
      background={
        movie.backdrop_path
          ? getFullImageUrl(movie.backdrop_path)
          : movie.poster_path
          ? getFullImageUrl(movie.poster_path)
          : ""
      }
    >
      <MovieTitle>
        {movie.title} ({movie.original_title})
      </MovieTitle>
      <MovieOverview>{movie.overview}</MovieOverview>
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
    </MovieBannerContainer>
  );
};

export default MovieBanner;
