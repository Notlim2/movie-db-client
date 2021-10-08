import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import SerieCard from "../components/SerieCard";
import Serie from "../models/serie";
import { getPopularSeries, getTopRatedSeries } from "../services/series";

const SeriesContainer = styled.div``;

const SeriesList = styled.div`
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

const PopularSeries = styled(SeriesList)``;

const TopRatedSeries = styled(SeriesList)``;

const Series: React.FC = () => {
  const [popSeries, setPopSeries] = useState([] as Serie[]);
  const [topRatedSeries, setTopRatedSeries] = useState([] as Serie[]);

  const getSeries = useCallback(async () => {
    const { results: popSeries } = await getPopularSeries();
    setPopSeries(popSeries);

    const { results: topRatedSeries } = await getTopRatedSeries();
    setTopRatedSeries(topRatedSeries);
  }, []);

  useEffect(() => {
    getSeries();
  }, [getSeries]);

  return (
    <SeriesContainer>
      {!!popSeries?.length && (
        <PopularSeries>
          <h3 className="title">Popular Series</h3>
          <div className="list">
            {popSeries.map((serie) => (
              <SerieCard key={serie.id} serie={serie} />
            ))}
          </div>
        </PopularSeries>
      )}
      {!!topRatedSeries?.length && (
        <TopRatedSeries>
          <h3 className="title">Top Rated Series</h3>
          <div className="list">
            {topRatedSeries.map((serie) => (
              <SerieCard key={serie.id} serie={serie} />
            ))}
          </div>
        </TopRatedSeries>
      )}
    </SeriesContainer>
  );
};

export default Series;
