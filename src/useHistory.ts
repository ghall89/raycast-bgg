import { useCachedState } from '@raycast/utils';

import { BoardGame } from './models';

export default function useHistory() {
  const [history, setHistory] = useCachedState<BoardGame[]>('history', []);

  function addToHistory(item: BoardGame) {
    setHistory([item, ...history]);
  }

  return { history, addToHistory };
}
