import { List } from '@raycast/api';
import { showFailureToast } from '@raycast/utils';
import { useFetch } from '@raycast/utils';
import { GameDetails } from 'bgg-client';
import { parseGameData } from 'bgg-client/src/lib/parsers';

interface DetailsProps {
  item: GameDetails;
}

export default function Details({ item }: DetailsProps) {
  const { isLoading, data } = useFetch(`https://boardgamegeek.com/xmlapi2/thing?id=${item.bggId}`, {
    execute: !!item,
    parseResponse: async (response: Response) => {
      const xml = await response.text();

      return parseGameData(xml);
    },
    onError: (error) => {
      console.error(error);
      showFailureToast('Could not fetch game details');
    },
  });

  const markdown = `![](${data?.img})\n\n${data?.description?.split('<br/>')?.join('\n')}`;

  return (
    <List.Item.Detail
      isLoading={isLoading}
      markdown={data && markdown}
      metadata={
        data && (
          <List.Item.Detail.Metadata>
            <List.Item.Detail.Metadata.Label title="Players" text={`${data?.minPlayers} - ${data?.maxPlayers}`} />
            <List.Item.Detail.Metadata.Label title="Average Playtime" text={`${data?.avgPlaytime} Minutes`} />
          </List.Item.Detail.Metadata>
        )
      }
    />
  );
}
