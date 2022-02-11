
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const makeDbConnection = require("./utils/db");
const blogModel = require("./models/blog.schema");


const app = express();          
       
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
  
       
app.get("/", async (req, res) => { 
  try{
    const posts = await blogModel.find()
     return res.render("home", {
      posts:posts
      })

  } catch(err){
    console.log(err)
  }
 
})

app.get("/posts/:id",async(req,res)=>{
  
  const id= req.params.id
 
   try{
      const singlePost = await blogModel.findById({_id:id})
      if(singlePost){
        res.render("post",{
                title:singlePost.title,
                author:singlePost.author,
                content:singlePost.message,
                id:singlePost._id
              })
      } else {
        console.log("not found")
      }
   } catch (err){
    console.log(err)
} 

})


app.post("/delete",async(req,res)=>{
  const id= req.body.dlt
   try{
     await blogModel.findByIdAndRemove(id)
     return res.redirect('/')
   } catch(err) {
     console.log(err)
   }
})

app.get("/about", (req, res) => {
  res.render("about")
})

app.get("/contact", (req, res) => {
  res.render("contact")
})

app.get('/compose', (req, res) => {
  res.render('compose')
})

app.post('/compose', async (req, res) => {

  const post = {
    title: req.body.composedTitle,
    author: req.body.composedName,
    message: req.body.composedText
  }

  try{
   await blogModel.create(post)
    return res.redirect('/')
  } catch(err){
    console.log(err)
  }
   
})

app.listen(process.env.PORT || 3000,  ()=> {
  console.log("Server started on port 3000");
  makeDbConnection()
});
 