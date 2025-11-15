import Blogs from "../config/models/blogModel.js";

const blogsController = {
	get: async (req, res) => {
		try {
			const data = await Blogs.find().sort({updatedAt: -1});
			if (data) return res.status(200).json({data});
		} catch (error) {
			console.log(error);
			return res.status(500).json({message: error.message});
		}
	},

	getUserPosts: async (req, res) => {
		const {userId} = req.userData;

		try {
			const data = await Blogs.find({userId}).sort({updatedAt: -1});
			if (data) return res.status(200).json({data});
		} catch (error) {
			console.log(error);
			return res.status(500).json({message: error.message});
		}
	},
	getUserRelatedPosts: async (req, res) => {
		const {userId} = req.params;

		try {
			const data = await Blogs.find({userId}).sort({updatedAt: -1});
			if (data) return res.status(200).json({data});
		} catch (error) {
			console.log(error);
			return res.status(500).json({message: error.message});
		}
	},

	createPost: async (req, res) => {
		const {userId, username} = req.userData;

		try {
			const {title, body} = req.body;
			const newPost = new Blogs({title, body, createdBy: username, userId});
			await newPost.save();
			res.status(200).json({message: "Your post has been created"});
		} catch (err) {
			res.status(500).json({message: "Internal Server Error Occured !"});
		}
	},

	getSinglePost: async (req, res) => {
		const {id} = req.params;

		try {
			const post = await Blogs.findById(id);
			if (!post) return res.status(404).json({error: "Post not found"});
			res.status(200).json({data: post});
		} catch (err) {
			res.status(500).json({message: "Internal Server Error Occured !"});
		}
	},

	getSingleUserPost: async (req, res) => {
		const {id} = req.params;
		const {userId} = req.userData;
		try {
			const post = await Blogs.findOne({_id: id, userId});
			if (!post) return res.status(404).json({error: "Post not found"});
			res.status(200).json({data: post});
		} catch (err) {
			res.status(500).json({message: "Internal Server Error Occured !"});
		}
	},

	updatePost: async (req, res) => {
		const {id} = req.params;
		try {
			const {title, body} = req.body;
			// console.log(title, body)

			const post = await Blogs.findByIdAndUpdate(
				id,
				{title, body},
				{new: true}
			);
			if (!post) return res.status(404).json({error: "Post not found"});
			res.status(200).json({data: post});
		} catch (err) {
			res.status(500).json({error: err.message});
		}
	},

	deletePost: async (req, res) => {
		const {id} = req.params;
		const {userId} = req.userData;
		try {
			const post = await Blogs.findOneAndDelete({_id: id, userId});
			if (!post) return res.status(404).json({error: "Post not found"});
			res.status(200).json({message: "Post deleted"});
		} catch (err) {
			res.status(500).json({error: err.message});
		}
	},
};

export default blogsController;
