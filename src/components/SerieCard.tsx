import clamp from "clamp-js";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import styled, { css } from "styled-components";
import getFullImageUrl from "../helpers/get-full-image-url";
import Serie from "../models/serie";
import { getSerie } from "../services/series";
import AppContext from "../contexts/AppContext";
import SerieBanner from "./SerieBanner";

interface SerieCardContainerProps {
  background?: string;
}

const SerieCardContainer = styled.div<SerieCardContainerProps>`
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

const SerieTitle = styled.h3`
  margin: 0;
`;

const SerieOverview = styled.p``;

const SerieReleaseDate = styled.p`
  font-size: 1.1rem;
`;

const NumberOfSeasons = styled.p``;

const SerieReview = styled.p``;

interface SerieCardProps {
  serie: Serie;
}

const SerieCard: React.FC<SerieCardProps> = ({ serie }) => {
  const { setShowModal, setModalContent } = useContext(AppContext);
  const [completeSerie, setCompleteSerie] = useState({} as Serie);
  const serieTitle = useRef<HTMLHeadingElement>(null);
  const serieOverview = useRef<HTMLHeadingElement>(null);

  const getCompleteSerie = useCallback(async () => {
    const completeSerie = await getSerie(serie.id);
    setCompleteSerie(completeSerie);
  }, [setCompleteSerie, serie.id]);

  const openSerieModal = () => {
    setModalContent(<SerieBanner serie={serie} />);
    setShowModal(true);
  };

  useEffect(() => {
    getCompleteSerie();
  }, [getCompleteSerie]);

  useEffect(() => {
    if (serieTitle.current) {
      clamp(serieTitle.current, { clamp: 1 });
    }

    if (serieOverview.current) {
      clamp(serieOverview.current, { clamp: 2 });
    }
  }, [serieTitle, serieOverview, completeSerie]);

  return (
    <SerieCardContainer
      background={
        completeSerie.backdrop_path
          ? getFullImageUrl(completeSerie.backdrop_path)
          : completeSerie.poster_path
          ? getFullImageUrl(completeSerie.poster_path)
          : ""
      }
      onClick={openSerieModal}
    >
      <SerieTitle ref={serieTitle} title={completeSerie.name}>
        {completeSerie.name} ({completeSerie.original_name})
      </SerieTitle>
      {completeSerie.overview && (
        <SerieOverview ref={serieOverview}>
          {completeSerie.overview}
        </SerieOverview>
      )}
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
    </SerieCardContainer>
  );
};

export default SerieCard;
