import { GenreModel } from "./genreModel";

export class MovieDetailModel {
  constructor(
    id: number,
    adult: boolean,
    backdrop_part: string,
    genre: GenreModel[],
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: string,
    runtime: number,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number
  ) {
    this.id = id;
    this.adult = adult;
    this.backdrop_part = backdrop_part;
    this.genre = genre;
    this.original_language = original_language;
    this.original_title = original_title;
    this.overview = overview;
    this.popularity = popularity;
    this.poster_path = poster_path;
    this.release_date = release_date;
    this.runtime = runtime;
    this.title = title;
    this.video = video;
    this.vote_average = vote_average;
    this.vote_count = vote_count;
  }
  id: number;
  adult: boolean;
  backdrop_part: string;
  genre: GenreModel[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  runtime: number;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
