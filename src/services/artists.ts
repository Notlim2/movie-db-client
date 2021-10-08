import httpClient from "../http-client";
import Artist from "../models/artist";
import ArtistCredit from "../models/artist-credit";
import Paginated from "../models/paginated";

const getPopularArtists = async () => {
  return (await httpClient.get<Paginated<Artist>>(`/person/popular`)).data;
};

const getArtist = async (artistId: number) => {
  return (await httpClient.get<Artist>(`/person/${artistId}`)).data;
};

const getArtistCredits = async (artistId: number) => {
  return (
    await httpClient.get<ArtistCredit>(`/person/${artistId}/combined_credits`)
  ).data;
};

export { getPopularArtists, getArtist, getArtistCredits };
