import arrayShuffle from "array-shuffle";
import { CarouselProvider, Slide, Slider } from "pure-react-carousel";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import MovieBanner from "../components/MovieBanner";
import SerieBanner from "../components/SerieBanner";
import ItemType from "../models/item-type";
import Movie from "../models/movie";
import Serie from "../models/serie";
import { getPopularMovies } from "../services/movies";
import { getPopularSeries } from "../services/series";

const HomePageContainer = styled.div`
  flex: 1;
  width: 100%;
`;

const HomePage: React.FC = () => {
  const [movies, setMovies] = useState([] as Movie[]);
  const [series, setSeries] = useState([] as Serie[]);

  const getPopularItems = useCallback(async () => {
    const { results: movies } = await getPopularMovies();
    setMovies(movies.map((movie) => ({ ...movie, type: ItemType.movie })));

    const { results: series } = await getPopularSeries();
    setSeries(series.map((serie) => ({ ...serie, type: ItemType.serie })));
  }, []);

  const renderItem = (item: Movie | Serie) => {
    switch (item.type) {
      case ItemType.movie:
        return <MovieBanner movie={item as Movie} />;

      case ItemType.serie:
        return <SerieBanner serie={item as Serie} />;

      default:
        return <></>;
    }
  };

  useEffect(() => {
    getPopularItems();
  }, [getPopularItems]);

  const itemsToShow = useMemo(() => {
    return arrayShuffle([...movies, ...series]);
  }, [movies, series]);

  return (
    <HomePageContainer>
      <CarouselProvider
        naturalSlideWidth={1300}
        naturalSlideHeight={600}
        totalSlides={itemsToShow.length}
        infinite
        interval={5000}
        isPlaying
        dragEnabled={false}
      >
        <Slider>
          {itemsToShow?.map((item, index) => (
            <Slide index={index} key={item.id}>
              {renderItem(item)}
            </Slide>
          ))}
        </Slider>
      </CarouselProvider>
    </HomePageContainer>
  );
};

export default HomePage;
