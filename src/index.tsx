import { List } from '@raycast/api';
import { useFetch, showFailureToast } from '@raycast/utils';
import { useState, useMemo } from 'react';
import { SearchResult } from 'bgg-client';
import { parseResults } from 'bgg-client/src/lib/parsers';

import ListItem from './components/ListItem';

export default function Command() {
  const [searchText, setSearchText] = useState<string>('');

  const { isLoading, data } = useFetch(
    `https://boardgamegeek.com/xmlapi2/search?query=${encodeURIComponent(searchText)}`,
    {
      execute: !!searchText,
      parseResponse: async (response: Response) => {
        const xml = await response.text();

        return parseResults(xml);
      },
      onError: (error) => {
        console.error(error);
        showFailureToast('Could not fetch games');
      },
      keepPreviousData: true,
    },
  );

  const resultMemo = useMemo<SearchResult[]>(() => data || [], [data]);

  return (
    <List
      filtering={false}
      searchText={searchText}
      onSearchTextChange={setSearchText}
      navigationTitle="Search Board Game"
      searchBarPlaceholder="Search for a board game"
      isLoading={isLoading}
      isShowingDetail
    >
      {resultMemo.map((item: BoardGame) => (
        <ListItem key={item.bggId} item={item} />
      ))}
    </List>
  );
}
