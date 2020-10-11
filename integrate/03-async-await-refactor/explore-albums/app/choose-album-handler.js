import { Album } from './album.js';

const fetchURL = async (id) => {
  const url = 'https://jsonplaceholder.typicode.com/albums/' + id;

	const response = await fetch(url);

	const albumData = await response.json();

	const newAlbum = new Album(albumData);

	return newAlbum.populate();
}

export const chooseAlbumHandler = (event) => {
  const albumId = event.target.form.albumId.value;

  fetchURL(albumId)
    .then(albumInstance => {
      console.log(albumInstance);
      const view = albumInstance.render();
      document.getElementById('root').innerHTML = '';
      document.getElementById('root').appendChild(view);
    })
    .catch(err => console.error(err));
};
