import _  from 'lodash';

const contents = {
  '1.json': require('../data/1.json'),
  '2.json': require('../data/2.json'),
  '3.json': require('../data/3.json'),
}

export default (config) => {
  const { file, listPath, itemImageKey } = config;

  let data = contents[file];

  // Listeyi bul
  if (listPath !== null) {
    data = _.get(data, listPath);
  }

  // Sadece image url'ler kalacak şekilde düzenle (eğer object ise)
  if (itemImageKey !== null) {
    data = data.map((obj) => obj[itemImageKey]);
  }

  return data;
};