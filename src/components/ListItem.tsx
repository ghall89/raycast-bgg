import { List, Action, ActionPanel } from '@raycast/api';

import { BoardGame } from '../models';

interface ListItemProps {
  item: BoardGame;
  addToHistory: (v: BoardGame) => void;
}

export default function ListItem({ item, addToHistory }: ListItemProps) {
  return (
    <List.Item
      key={item.bggId}
      title={item.title}
      actions={
        <ActionPanel>
          <Action.OpenInBrowser url={item.url} onOpen={() => addToHistory(item)} />
          <Action.CopyToClipboard content={item.url} onCopy={() => addToHistory(item)} />
        </ActionPanel>
      }
    />
  );
}
