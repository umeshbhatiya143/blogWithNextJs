import { blogs } from "../../../data/blogs";

export default function handler(req,res){
    if(req.method === 'GET') {
        res.status(200).json(blogs)
    }
    else if(req.method==='POST'){
        const title = req.body.title
        const desc = req.body.desc
        const newBlog = {
            id: Date.now(),
            title: title,
            desc: desc
        }
        blogs.push(newBlog)
        res.status(201).json(newBlog)
    }
}