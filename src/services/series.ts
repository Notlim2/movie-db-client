import httpClient from "../http-client";
import Paginated from "../models/paginated";
import Serie from "../models/serie";

const getPopularSeries = async () => {
  return (await httpClient.get<Paginated<Serie>>(`/tv/popular`)).data;
};

const getTopRatedSeries = async () => {
  return (await httpClient.get<Paginated<Serie>>(`/tv/top_rated`)).data;
};

const getSerie = async (serieId: number) => {
  return (await httpClient.get<Serie>(`/tv/${serieId}`)).data;
};

export { getPopularSeries, getTopRatedSeries, getSerie };
