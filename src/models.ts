export type BggFetchResponse = BoardGame[];

export interface BoardGame {
  bggId: string;
  title: string;
  url: string;
}
