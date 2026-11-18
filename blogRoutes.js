const express = require("express");
const router = express.Router();

const Blog = require("../models/Blog");

// Get all blogs
router.get("/", async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });

        res.json(blogs);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch blogs"
        });
    }
});

// Get single blog
router.get("/:id", async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                message: "Blog not found"
            });
        }

        res.json(blog);
    } catch (error) {
        res.status(500).json({
            message: "Invalid blog ID or server error"
        });
    }
});

// Create blog
router.post("/", async (req, res) => {
    try {
        const blog = await Blog.create(req.body);

        res.status(201).json(blog);
    } catch (error) {
        res.status(400).json({
            message: "Failed to create blog"
        });
    }
});

module.exports = router;