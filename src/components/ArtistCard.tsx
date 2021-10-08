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
import Artist from "../models/artist";
import { getArtist } from "../services/artists";
import AppContext from "../contexts/AppContext";
import ArtistBanner from "./ArtistBanner";

interface ArtistCardContainerProps {
  background?: string;
}

const ArtistCardContainer = styled.div<ArtistCardContainerProps>`
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

const ArtistName = styled.h3`
  margin: 0;
`;

const ArtistBiography = styled.p``;

const ArtistReleaseDate = styled.p`
  font-size: 1.1rem;
`;

interface ArtistCardProps {
  artist: Artist;
}

const ArtistCard: React.FC<ArtistCardProps> = ({ artist }) => {
  const { setShowModal, setModalContent } = useContext(AppContext);
  const [completeArtist, setCompleteArtist] = useState({} as Artist);
  const artistName = useRef<HTMLHeadingElement>(null);
  const artistBiography = useRef<HTMLHeadingElement>(null);

  const getCompleteArtist = useCallback(async () => {
    const completeArtist = await getArtist(artist.id);
    setCompleteArtist(completeArtist);
  }, [setCompleteArtist, artist.id]);

  const openArtistModal = () => {
    setModalContent(<ArtistBanner artist={artist} />);
    setShowModal(true);
  };

  useEffect(() => {
    getCompleteArtist();
  }, [getCompleteArtist]);

  useEffect(() => {
    if (artistName.current) {
      clamp(artistName.current, { clamp: 1 });
    }

    if (artistBiography.current) {
      clamp(artistBiography.current, { clamp: 2 });
    }
  }, [artistName, artistBiography, completeArtist]);

  return (
    <ArtistCardContainer
      background={
        completeArtist.profile_path
          ? getFullImageUrl(completeArtist.profile_path)
          : ""
      }
      onClick={openArtistModal}
    >
      <ArtistName ref={artistName} title={completeArtist.name}>
        {completeArtist.name}
      </ArtistName>
      {completeArtist.biography && (
        <ArtistBiography ref={artistBiography}>
          {completeArtist.biography}
        </ArtistBiography>
      )}
      {completeArtist.birthday && (
        <ArtistReleaseDate>
          <strong>Birthday: </strong>
          {new Intl.DateTimeFormat("en-us").format(
            new Date(completeArtist.birthday)
          )}
        </ArtistReleaseDate>
      )}
    </ArtistCardContainer>
  );
};

export default ArtistCard;
