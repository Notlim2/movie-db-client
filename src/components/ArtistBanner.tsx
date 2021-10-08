import React, { useCallback, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import getFullImageUrl from "../helpers/get-full-image-url";
import Artist from "../models/artist";
import {
  getArtist,
  getArtistCredits as getArtistCreditsService,
} from "../services/artists";

interface ArtistBannerContainerProps {
  background?: string;
}

const ArtistBannerContainer = styled.div<ArtistBannerContainerProps>`
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
    background-size: contain;
  `}
`;

const ArtistName = styled.h3`
  font-size: 2rem;
  margin: 0;
`;

const ArtistBiography = styled.p`
  font-size: 1.2rem;
`;

const ArtistBirthday = styled.p`
  font-size: 1.1rem;
`;

const ArtistLastCast = styled.p`
  font-size: 1.1rem;
`;

interface ArtistBannerProps {
  artist: Artist;
}

const ArtistBanner: React.FC<ArtistBannerProps> = ({ artist }) => {
  const [completeArtist, setCompleteArtist] = useState({} as Artist);
  const [lastArtistCast, setLastArtistCast] = useState("");

  const getCompleteArtist = useCallback(async () => {
    const completeArtist = await getArtist(artist.id);
    setCompleteArtist(completeArtist);
  }, [setCompleteArtist, artist.id]);

  const getArtistCredits = useCallback(async () => {
    const { cast } = await getArtistCreditsService(artist.id);

    const [lastArtistCast] = cast
      .map((c) => ({
        title: c.title,
        release_date: c.release_date
          ? new Date(c.release_date)
          : new Date("1900-01-01"),
      }))
      .sort((cA, cB) =>
        cA.release_date.getTime() > cB.release_date.getTime() ? -1 : 1
      );

    setLastArtistCast(lastArtistCast.title);
  }, [artist.id]);

  useEffect(() => {
    getCompleteArtist();
    getArtistCredits();
  }, [getCompleteArtist, getArtistCredits]);

  return (
    <ArtistBannerContainer
      background={
        completeArtist.profile_path
          ? getFullImageUrl(completeArtist.profile_path)
          : ""
      }
    >
      <ArtistName>{completeArtist.name}</ArtistName>
      <ArtistBiography>{completeArtist.biography}</ArtistBiography>
      {completeArtist.birthday && (
        <ArtistBirthday>
          <strong>Birthday: </strong>
          {new Intl.DateTimeFormat("en-us").format(
            new Date(completeArtist.birthday)
          )}
        </ArtistBirthday>
      )}
      <ArtistLastCast>
        <strong>Last Cast: </strong>
        {lastArtistCast}
      </ArtistLastCast>
    </ArtistBannerContainer>
  );
};

export default ArtistBanner;
