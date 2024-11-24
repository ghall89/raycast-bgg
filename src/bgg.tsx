import { ActionPanel, Action, List, showToast, Toast } from '@raycast/api';
import { useFetch, useCachedState } from '@raycast/utils';
import { useState } from 'react';

import { BggFetchResponse, BoardGame } from './models';
import { parseXml } from './utils';
import ListItem from './components/ListItem';

export default function Command() {
  const [searchText, setSearchText] = useState<string>('');
  const [history, setHistory] = useCachedState<BoardGame[]>('history', []);

  const { isLoading, data } = useFetch<BggFetchResponse>(
    `https://boardgamegeek.com/xmlapi2/search?query=${searchText}`,
    {
      execute: !!searchText,
      parseResponse: (response: Response) => parseXml(response),
      onError: (error) => {
        console.error(error);
        showToast(Toast.Style.Failure, 'Could not fetch games');
      },
      keepPreviousData: true,
    },
  );

  function addToHistory(item: BoardGame) {
    setHistory([item, ...history]);
  }

  return (
    <List
      filtering={false}
      searchText={searchText}
      onSearchTextChange={setSearchText}
      navigationTitle="Search Board Game"
      searchBarPlaceholder="Search for a board game"
      isLoading={isLoading}
    >
      {data
        ? data?.map((item) => <ListItem key={item.bggId} item={item} addToHistory={addToHistory} />)
        : history?.map((item) => <ListItem key={item.bggId} item={item} addToHistory={addToHistory} />)}
    </List>
  );
}
