import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import ArtistCard from "../components/ArtistCard";
import Artist from "../models/artist";
import { getPopularArtists } from "../services/artists";

const ArtistsContainer = styled.div``;

const ArtistsList = styled.div`
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

const PopularArtists = styled(ArtistsList)``;

const Artists: React.FC = () => {
  const [popArtists, setPopArtists] = useState([] as Artist[]);

  const getArtists = useCallback(async () => {
    const { results: popArtists } = await getPopularArtists();
    setPopArtists(popArtists);
  }, []);

  useEffect(() => {
    getArtists();
  }, [getArtists]);

  return (
    <ArtistsContainer>
      {!!popArtists?.length && (
        <PopularArtists>
          <h3 className="title">Popular Artists</h3>
          <div className="list">
            {popArtists.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        </PopularArtists>
      )}
    </ArtistsContainer>
  );
};

export default Artists;
