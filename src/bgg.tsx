import { ActionPanel, Action, List, showToast, Toast } from '@raycast/api';
import { useFetch } from '@raycast/utils';
import { useState } from 'react';

import { BggFetchResponse } from './models';
import { parseXml } from './utils';

export default function Command() {
  const [searchText, setSearchText] = useState('');

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

  return (
    <List
      filtering={false}
      searchText={searchText}
      onSearchTextChange={setSearchText}
      navigationTitle="Search Board Game"
      searchBarPlaceholder="Search for a board game"
      isLoading={isLoading}
    >
      {data?.map((item) => (
        <List.Item
          key={item.bggId}
          title={item.title}
          actions={
            <ActionPanel>
              <Action.OpenInBrowser url={item.url} />
              <Action.CopyToClipboard content={item.url} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
