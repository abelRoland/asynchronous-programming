import { Post } from './post.js';

const fetchURL = async (id) => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts/' + id);

  const parse = await response.json();
    
  const newPost = new Post(parse);
    return newPost.populate();
  }

export const choosePostHandler = (event) => {
  const postId = event.target.form.postId.value;

  fetchURL(postId)
    .then(postInstance => {
      console.log(postInstance);
      const view = postInstance.render();
      document.getElementById('root').innerHTML = '';
      document.getElementById('root').appendChild(view);
    })
    .catch(err => console.error(err));
};
