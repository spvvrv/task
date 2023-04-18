const searchForm = document.createElement('form');
searchForm.classList.add('searchForm');
const input = document.createElement('input');
input.placeholder = 'Enter Id';
const searchBtn = document.createElement('button');
searchBtn.innerHTML = 'Find post';
searchBtn.type = 'submit';
input.setAttribute('type', 'text');
const blockForResult = document.createElement('div');
blockForResult.classList.add('blockForResult');
searchForm.append(input, searchBtn, blockForResult);
document.body.append(searchForm);

class Posts {
  constructor() {
    this.posts = [];
    this.foundPost = null;
  }
  async getPosts() {
    try {
      let response = await fetch('https://jsonplaceholder.typicode.com/posts/');
      if (response.status >= 200 || response.status < 300) {
        this.posts = await response.json();
      }
    } catch (err) {
      console.log(err);
      return;
    }
    return this;
  }
  findPost(id) {
    this.foundPost = this.posts.find((post) => post.id === id);
    if (!this.foundPost) {
      blockForResult.textContent = 'there is no post with entered id';
    }
    this.render();
    return this;
  }
  render() {
    if (this.foundPost) {
      let newFoundPost = new Card(
        this.foundPost.id,
        this.foundPost.title,
        this.foundPost.body
      );
      newFoundPost.render();
      return;
    }
    this.posts.forEach((post) => {
      let postCard = new Card(post.id, post.title, post.body);
      postCard.render();
    });
    return this;
  }
}

class Card {
  constructor(id, title, body) {
    this.id = id;
    this.title = title;
    this.body = body;
  }
  render() {
    const element = document.createElement('div');
    element.innerHTML = `<div class="card">
      <p class="id">Id: ${this.id}</p>
      <h1 class="title">${this.title}</h1>
      <p class="main-text">${this.body}</p>
      </div>`;

    document.body.append(element);
  }
}

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let id = +input.value;
  e.target.reset();
  newPost.findPost(id);
});

let newPost = new Posts();
// newPost.getPosts().then((res) => {
//   res.render();
// });

await newPost.getPosts();
newPost.render();
