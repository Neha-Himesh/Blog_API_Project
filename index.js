import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

// In-memory data store
let posts = [
  {
    id: 1,
    title: "The Rise of Decentralized Finance",
    content:
      "Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.",
    author: "Alex Thompson",
    date: "2023-08-01T10:00:00Z",
  },
  {
    id: 2,
    title: "The Impact of Artificial Intelligence on Modern Businesses",
    content:
      "Artificial Intelligence (AI) is no longer a concept of the future. It's very much a part of our present, reshaping industries and enhancing the capabilities of existing systems. From automating routine tasks to offering intelligent insights, AI is proving to be a boon for businesses. With advancements in machine learning and deep learning, businesses can now address previously insurmountable problems and tap into new opportunities.",
    author: "Mia Williams",
    date: "2023-08-05T14:30:00Z",
  },
  {
    id: 3,
    title: "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
    content:
      "Sustainability is more than just a buzzword; it's a way of life. As the effects of climate change become more pronounced, there's a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference.",
    author: "Samuel Green",
    date: "2023-08-10T09:15:00Z",
  },
];

let lastId = 3;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Write your code here//

//CHALLENGE 1: GET All posts
app.get("/posts",(req,res)=>{
  res.json(posts);
});

//CHALLENGE 2: GET a specific post by id
app.get("/posts/:id",(req,res)=>{
  const ToBeSearchedId=parseInt(req.params.id);
  const ToBeSearchedIndex=posts.findIndex((post) => post.id === ToBeSearchedId);
  res.json(posts[ToBeSearchedIndex]);
});

//CHALLENGE 3: POST a new post

app.post("/posts",(req,res)=>{
  const d=new Date();
  const newPost={
     id:lastId+1,
     title:req.body.title,
     content:req.body.content,
     author:req.body.author,
     date:d,
  }
 lastId++;
 posts.push(newPost);
 res.json(posts);
});

//CHALLENGE 4: PATCH a post when you just want to update one parameter
app.patch("/posts/:id",(req,res)=>{
  const ToBeEditedId=parseInt(req.params.id);
  const ToBeEditedIndex=posts.findIndex((post) => post.id === ToBeEditedId);
  console.log(`To be edited post's index:${ToBeEditedIndex}`);
  posts[ToBeEditedIndex].title=req.body.title;
  //console.log(posts[req.params.id-1].content);
  posts[ToBeEditedIndex].content=req.body.content;
  console.log(req.body);
  posts[ToBeEditedIndex].author=req.body.author;
  console.log(posts[ToBeEditedIndex]);
  res.json(posts);
});

//CHALLENGE 5: DELETE a specific post by providing the post id.
app.delete("/posts/:id",(req,res)=>{
 const ToBeDeletedId=parseInt(req.params.id);
 const TobeDeletedIndex=posts.findIndex((post) => post.id === ToBeDeletedId);
 const deletedPost=posts.splice(TobeDeletedIndex,1);
 console.log(deletedPost);
 res.json(posts);
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
