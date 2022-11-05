const blogModel = require("../models/post")

const getAllBlogs = async (req, res, next) => {
    try {
        const page = req.query.page || 1
        const limit = 20
        const blogs = await blogModel.find({ state: "published" }).populate("author", "firstname lastname")
            .limit(limit).skip((page - 1) * limit)
        if (!blogs) {
            return res.status(404).send("blogs not found")
        }

        return res.status(200).json({
            status: true,
            blogs
        })
    } catch (error) {
        error.status = 404;
        error.message = error.message || "not accepted";
        next(error);
    }
}
const searchQuery = async (req, res, next) => {
    try {
        const { page = 1, author, tags, title, order_by, order } = req.query
        const limit = 5
        // const searchName
        const searchQuery = {}
        const authorSearchQ = {}
        if (author) {
            authorSearchQ.firstname = author
        }
        if (tags) {
            searchQuery.tags = tags
        }
        if (title) {
            searchQuery.title = title
        }
        searchQuery.state = "published"
        const sortQuery = {}
        const sortAttributes = order_by.split(",")
        for (const attributes of sortAttributes) {
            if (order === "asc" && order_by) {
                sortQuery[attributes] = 1
            }
            if (order === "desc" && order_by) {
                sortQuery[attributes] = -1
            }
        }
        let searchedPost = blogModel.find(searchQuery)
            .populate({ path: "author", match: authorSearchQ, select: "firstname lastname" })
            .sort(sortQuery)
            .skip((page - 1) * limit)
            .limit(limit)

            searchedPost = (await searchedPost).filter(post => post.author)   
        return res.status(200).json({
            status: true,
            searchedPost
        })
        // console.log(filterSearch)
    } catch (error) {
        error.status = 404;
        error.message = error.message || "not accepted";
        next(error);
    }
}
const getSingleBlog = async (req, res, next) => {
    try {
        const blogId = req.params.id
        const blog = await blogModel.findById(blogId).populate("author", "firstname lastname")
        if (!blog) {
            return res.status(404).send("blog not found")
        }
        if (blog.state === "draft") {
            return res.status(403).send("Access Denied")
        }
        blog.read_count += 1
        await blog.save()
        return res.status(200).json({
            status: true,
            blog
        })
    } catch (error) {
        error.status = 404;
        error.message = error.message || "not accepted";
        next(error);
    }
}
module.exports = {
    getAllBlogs,
    searchQuery,
    getSingleBlog
}