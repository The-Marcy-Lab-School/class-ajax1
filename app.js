// document.getElementById('btn').addEventListener('click', run);
document.getElementById('search').addEventListener('submit', searchTitle)

function run() {
  wait(2);
  console.log('This synchronous function is finished running.')
}

function wait(seconds) {
  let end = Date.now() + (seconds * 1000);

  while (Date.now() < end) {
  }
  console.log('Im free');
}

function asyncRun() {
  setTimeout(() => console.log('This asynchronous function is finished running'), 2000);
  console.log('Keeping it moving...')
}
function searchTitle(e) {
  e.preventDefault();
  let searchTerm = e.target.search_term.value;
  get(`http://openlibrary.org/search.json?title=${searchTerm}`, (res) => makeList(res))
  console.log('Im not waiting...')
}

function makeList(json) {
  let books = JSON.parse(json).docs
  // let titles = books.map
  const bookListItems = books.map((book) => `<li>${book.title_suggest}</li>`);
  const list = document.createElement('ul');
  list.innerHTML = bookListItems.slice(0, 3).join('\n');
  document.body.appendChild(list);
}

function get(url, callback) {
  // 1. Instantiate a new xhr object
  const xhr = new XMLHttpRequest();

  // 2. Set the `onreadystatechange` property
  xhr.onreadystatechange = () => {
    // 3. Check for a `readyState` of 4
    if (xhr.readyState === 4) {
      callback(xhr.responseText);
    }
  }

  // 4. Call the `open` method, passing in our http method and target url.
  xhr.open('GET', url)

  // 5.
  xhr.send()
}
