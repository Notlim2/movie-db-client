import React, { useState, useMemo, useEffect } from "react";
import styled from "styled-components";
import Artist from "../models/artist";
import ItemType from "../models/item-type";
import Movie from "../models/movie";
import Serie from "../models/serie";
import { getPopularArtists } from "../services/artists";
import { getPopularMovies } from "../services/movies";
import { getPopularSeries } from "../services/series";
import ArtistCard from "./ArtistCard";
import Input from "./Input";
import MovieCard from "./MovieCard";
import SerieCard from "./SerieCard";

const SearchContainer = styled.div``;

const SearchInput = styled(Input)`
  min-width: 280px;
  max-width: 400px;
  width: 100%;
`;

const SearchResults = styled.div`
  position: fixed;
  width: 85vw;
  height: 85vh;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(--default-white);
  border-radius: 8px;
  padding: 24px;
  overflow-y: auto;
  z-index: 2;

  display: flex;
  flex-direction: column;
`;

const NumberOfResults = styled.p`
  color: var(--default-black);
  font-size: 1.2rem;
`;

const ResultsList = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
`;

const Search: React.FC = () => {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([] as Movie[]);
  const [artists, setArtists] = useState([] as Artist[]);
  const [series, setSeries] = useState([] as Serie[]);

  const getItems = async () => {
    const { results: movies } = await getPopularMovies();
    setMovies(movies);

    const { results: artists } = await getPopularArtists();
    setArtists(artists);

    const { results: series } = await getPopularSeries();
    setSeries(series);
  };

  const renderItemCard = (item: Artist | Movie | Serie) => {
    switch (item.type) {
      case ItemType.movie:
        return <MovieCard key={item.id} movie={item as Movie} />;

      case ItemType.serie:
        return <SerieCard key={item.id} serie={item as Serie} />;

      case ItemType.artist:
        return <ArtistCard key={item.id} artist={item as Artist} />;

      default:
        return <></>;
    }
  };

  const showSearchResults = useMemo(() => {
    return !!search;
  }, [search]);

  const itemsToShow = useMemo(() => {
    const filteredMovies = movies
      .filter((mv) => mv.title.toLocaleLowerCase().includes(search))
      .map((mv) => {
        mv.type = ItemType.movie;

        return mv;
      });

    const filteredArtists = artists
      .filter((art) => art.name.toLocaleLowerCase().includes(search))
      .map((art) => {
        art.type = ItemType.artist;

        return art;
      });

    const filteredSeries = series
      .filter((ser) => ser.name.toLocaleLowerCase().includes(search))
      .map((ser) => {
        ser.type = ItemType.serie;

        return ser;
      });

    return [...filteredMovies, ...filteredArtists, ...filteredSeries];
  }, [search, movies, artists, series]);

  useEffect(() => {
    getItems();
  }, []);

  return (
    <SearchContainer>
      <SearchInput
        placeholder="Search..."
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {showSearchResults && (
        <SearchResults>
          <NumberOfResults>{itemsToShow.length} Items Found</NumberOfResults>
          <ResultsList>
            {itemsToShow?.map((item) => renderItemCard(item))}
          </ResultsList>
        </SearchResults>
      )}
    </SearchContainer>
  );
};

export default Search;
