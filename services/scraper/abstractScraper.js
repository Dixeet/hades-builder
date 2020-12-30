import axios from 'axios';

export default async function (URL) {
  const { data: page } = await axios.get(`/hades${URL}`);
  return page;
}
