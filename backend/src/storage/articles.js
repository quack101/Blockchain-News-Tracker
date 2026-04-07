// const db = {};

// function addArticle(id, content) {
//   db[id] = content;
// }

// function getArticle(id) {
//   return db[id];
// }

// module.exports = { addArticle, getArticle };

const storage = {};

function saveArticle(id, content) {
  storage[id] = content;
}

function getContent(id) {
  return storage[id];
}

module.exports = { saveArticle, getContent };