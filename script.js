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
  constructor() {}
  async getPosts(url) {
    try {
      let response = await fetch(url);
      if (response.status === 200) {
        this.posts = await response.json();
        this.render();
      }
    } catch (err) {
      console.log(err);
      return;
    }
  }
  render() {
    if (this.foundPost !== null) {
      console.log(this.foundPost);
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
  }
  findPost() {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let id = +input.value;
      this.foundPost = this.posts.find((post) => post.id === id);
      if (!this.foundPost) {
        blockForResult.textContent = 'there is no post with entered id';
      }
      this.render();
      e.target.reset();
    });
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

let newPost = new Posts();
newPost.getPosts('https://jsonplaceholder.typicode.com/posts/');
newPost.findPost();
