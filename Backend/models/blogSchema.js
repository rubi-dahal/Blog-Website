const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: String,
    subtitle:String,
    description:String,
    url:String,
    author: String,
    paragraph:String,
})

module.exports = mongoose.model("blog", blogSchema)