import { showToast, Toast } from '@raycast/api';
import convert from 'xml-js';
import { BggFetchResponse, GameDetails } from './models';

export async function parseResults(response: Response): Promise<BggFetchResponse> {
  let resultsArr: BggFetchResponse = [];

  try {
    const xml = await response.text();
    const obj = convert.xml2js(xml);

    const elements = obj.elements?.[0]?.elements || [];

    resultsArr = elements.map((el) => {
      const title = el.elements.find((e) => e.name === 'name');

      return {
        bggId: el.attributes.id,
        title: title.attributes.value,
        url: `https://boardgamegeek.com/boardgame/${el.attributes.id}`,
      };
    });
  } catch (error) {
    console.error(error);
    showToast(Toast.Style.Failure, 'Could not parse response');
  }

  return resultsArr;
}

export async function parseGameData(response: Response): Promise<GameDetails | undefined> {
  try {
    const xml = await response.text();

    const result = convert.xml2js(xml, { compact: true });

    const gameData = {
      bggId: result?.boardgames?.boardgame?._attributes?.objectid,
      title: result?.boardgames?.boardgame.name?._text,
      img: result?.boardgames?.boardgame?.image?._text,
      minPlayers: parseInt(result?.boardgames?.boardgame?.minplayers?._text),
      maxPlayers: parseInt(result?.boardgames?.boardgame?.maxplayers?._text),
      avgPlaytime: parseInt(result?.boardgames?.boardgame?.playingtime?._text),
    };
    return gameData;
  } catch (error) {
    console.error(error);
    showToast(Toast.Style.Failure, 'Could not parse response');
  }
}
