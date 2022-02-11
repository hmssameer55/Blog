const {Schema,model}= require ('mongoose')

const blogSchema = new Schema ({

   title:String,
   author:String,
   message:String

})

const blogModel = model('blogs',blogSchema)


module.exports = blogModel