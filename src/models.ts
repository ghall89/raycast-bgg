export type BggFetchResponse = BoardGame[];
export type BggDetailsResponse = GameDetails[];

export interface BoardGame {
  bggId: string;
  title: string;
  url: string;
}
export interface GameDetails {
  bggId: string;
  title: string;
  img: string;
  minPlayers: number;
  maxPlayers: number;
  avgPlaytime: number;
}
