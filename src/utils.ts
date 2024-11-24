import { showToast, Toast } from '@raycast/api';
import convert from 'xml-js';
import { BggFetchResponse } from './models';

export async function parseXml(response: Response) {
  let resultsArr: BggFetchResponse = [];

  try {
    const xml = await response.text();
    const obj = convert.xml2js(xml);

    const elements = obj.elements?.[0]?.elements || [];
    console.log(JSON.stringify(elements[0], null, 2));

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
