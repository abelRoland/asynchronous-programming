import { User } from './user.js';

const fetchURL = async (userId) => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users/' + userId);
  const parsed = await response.json();
  const newUser = new User(parsed);
  return newUser.populate();
}

export const chooseUserHandler = (event) => {
  const userId = event.target.form.userId.value;

  fetchURL(userId)
    .then(userInstance => {
      console.log(userInstance);
      const view = userInstance.render();
      document.getElementById('root').innerHTML = '';
      document.getElementById('root').appendChild(view);
    })
    .catch(err => console.error(err));
};
