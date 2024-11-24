import { List, Action, ActionPanel, useNavigation } from '@raycast/api';

import { BoardGame } from '../models';
import Details from './Details';
import UrlActions from './UrlActions';

interface ListItemProps {
  item: BoardGame;
  addToHistory: (v: BoardGame) => void;
}

export default function ListItem({ item }: ListItemProps) {
  const { push } = useNavigation();

  return (
    <List.Item
      title={item.title}
      actions={
        <ActionPanel>
          <Action title="View Details" onAction={() => push(<Details item={item} />)} />
          <UrlActions item={item} />
        </ActionPanel>
      }
    />
  );
}
