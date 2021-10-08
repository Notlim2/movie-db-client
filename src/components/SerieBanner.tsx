import React, { useCallback, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import getFullImageUrl from "../helpers/get-full-image-url";
import Serie from "../models/serie";
import { getSerie } from "../services/series";

interface SerieBannerContainerProps {
  background?: string;
}

const SerieBannerContainer = styled.div<SerieBannerContainerProps>`
  height: 100%;
  width: 100%;
  padding: 24px;

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

const SerieTitle = styled.h3`
  font-size: 2rem;
  margin: 0;
`;

const SerieOverview = styled.p`
  font-size: 1.2rem;
`;

const SerieReleaseDate = styled.p`
  font-size: 1.1rem;
`;

const NumberOfSeasons = styled.p``;

const SerieReview = styled.p``;

interface SerieBannerProps {
  serie: Serie;
}

const SerieBanner: React.FC<SerieBannerProps> = ({ serie }) => {
  const [completeSerie, setCompleteSerie] = useState({} as Serie);

  const getCompleteSerie = useCallback(async () => {
    const completeSerie = await getSerie(serie.id);
    setCompleteSerie(completeSerie);
  }, [setCompleteSerie, serie.id]);

  useEffect(() => {
    getCompleteSerie();
  }, [getCompleteSerie]);

  return (
    <SerieBannerContainer
      background={
        completeSerie.backdrop_path
          ? getFullImageUrl(completeSerie.backdrop_path)
          : completeSerie.poster_path
          ? getFullImageUrl(completeSerie.poster_path)
          : ""
      }
    >
      <SerieTitle>
        {completeSerie.name} ({completeSerie.original_name})
      </SerieTitle>
      <SerieOverview>{completeSerie.overview}</SerieOverview>
      {completeSerie.first_air_date && (
        <SerieReleaseDate>
          <strong>First Air Date: </strong>
          {new Intl.DateTimeFormat("en-us").format(
            new Date(completeSerie.first_air_date)
          )}
        </SerieReleaseDate>
      )}
      <NumberOfSeasons>
        <strong>Seasons: </strong> {completeSerie.number_of_seasons}
      </NumberOfSeasons>
      <SerieReview>
        <strong>Serie Rating: </strong>
        {completeSerie.vote_average}
      </SerieReview>
    </SerieBannerContainer>
  );
};

export default SerieBanner;
