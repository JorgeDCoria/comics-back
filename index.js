import fs from "fs-extra";
import axios from "axios";
const INITIAL_ID_XKCD_COMIC = 2500;
const MAX_ID_XKCD_COMICS = 2588;
let writes = [];

for (let id = INITIAL_ID_XKCD_COMIC; id < MAX_ID_XKCD_COMICS; id++) {
  const url = `https://xkcd.com/${id}/info.0.json`;
  const { data } = await axios.get(url);
  //nos quedamos solo con resOfComic, tanto como nun, news y transcript los destructuramos para
  //luego no usarlos
  const { num, news, transcript, ...resOfComic } = data;
  const comicToStore = {
    id,
    ...resOfComic,
  };
  writes.push(fs.writeJSON(`./comics/${id}.json`, comicToStore));
}

Promise.all(writes).then((r) => console.log("process of write succesfully"));
