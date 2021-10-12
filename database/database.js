//making the data as json inside the array of object.
const books=[
  {
    ISBN: "1234Book",
    title: "Tesla",
    pubDate: "2021-08-05",
    language: "En",
    numPage: 250,
    author: [1],
    publications: [1],
    category: ["tech","space","education"]
  },
  {
    ISBN: "IndiaNo1",
    title: "RSS- The helping Group",
    pubDate: "2021-09-17",
    language: "En",
    numPage: 179,
    author: [3],
    publications: [3],
    category: ["India","RSS","Greatest social worker"]
  }
]

const author = [
  {
    id: 1,
    name: "Karan",
    books:["1234Book","secretCode"]
  },
  {
    id: 2,
    name: "Elon Musk",
    books:["1234Book"]
  },
  {
    id:3,
    name:"Narendra Modi",
    books:["IndiaNo1"]
  }
]

const publication =[
  {
    id: 1,
    name: "writex",
    books: ["1234Book"]
  },
  {
    id:2,
    name: "writex2",
    books:[]
  },
  {
    id:3,
    name: "Geeta Press",
    books:["IndiaNo1"]
  }
]

//exporting the modules that is to be used by other js files.
module.exports = {books,author,publication};
