import Marketplace from "../config/models/marketplaceModel.js";
import deleteFile from "../utils/fileDelete.js";

const marketController = {
	get: async (_, res) => {
		try {
			const data = await Marketplace.find().sort({updatedAt: -1});
			// console.log(data);
			return res.status(200).json({message: "Data fetched successfully", data});
		} catch (error) {
			return res.status(500).json({message: error.message});
		}
	},

	getUserSpecificPost: async (req, res) => {
		const {userId} = req.userData;
		try {
			const data = await Marketplace.find({userId}).sort({updatedAt: -1});
			// console.log(data);
			return res.status(200).json({message: "Data fetched successfully", data});
		} catch (error) {
			return res.status(500).json({message: error.message});
		}
	},

	getIndividualPost: async (req, res) => {
		const {itemId} = req.params;

		try {
			const data = await Marketplace.findOne({_id: itemId});
			if (!data) {
				return res.status(400).json({message: "Couldn't find the post"});
			}
			return res.status(200).json({message: "Data fetched successfully", data});
		} catch (error) {
			res.status(500).json({message: "Internal Server Error Occured!"});
		}
	},

	getRelatedItems: async (req, res) => {
		const {itemType} = req.params;

		try {
			const data = await Marketplace.find({itemType: itemType}).sort({
				updatedAt: -1,
			});
			res.status(200).json({data});
		} catch (error) {
			res.status(500).json({message: "Internal Server Error Occured!"});
		}
	},

	createPost: async (req, res) => {
		const {userId, username: postedBy, location} = req.userData;

		try {
			const {itemName, price, details, type, itemType} = req.body;

			const newMarketPost = await Marketplace.create({
				userId,
				postedBy,
				itemType,
				itemName,
				price: parseFloat(price),
				details,
				location, // product will only be from where he/she signed up with
				type,
			});
			await newMarketPost.save();

			return res
				.status(200)
				.json({message: "Post Created Successfully", data: newMarketPost});
		} catch (error) {
			console.log(error);
			return res.status(500).json({message: "Couldn't create the post"});
		}
	},
	uploadProductImage: async (req, res) => {
		const {productId} = req.params;
		const pictureId = req.file.id;

		try {
			const data = await Marketplace.findOneAndUpdate(
				{_id: productId},
				{pictureId},
				{new: true}
			);

			res.status(200).json({message: "Successfully Updated Picture!", data});
		} catch (error) {
			console.log(error)
			res.status(400).json({message: "Picture Updation Failed !!!"});
		}
	},

	updatePost: async (req, res) => {
		try {
			const {itemId} = req.params;
			const {...updateFields} = req.body;

			const updateData = {};
			const {userId} = req.userData;

			for (const key in updateFields) {
				if (updateFields[key]) {
					if (key === "price") {
						updateData[key] = parseFloat(updateFields[key]);
					} else {
						updateData[key] = updateFields[key];
					}
				}
			}
			updateData.userId = userId;

			// if user have updated picture
			if (req.file) {
				const pictureUrlObj = {
					path: req.file.path,
					name: req.file.originalname,
				};
				updateData.pictureUrl = pictureUrlObj;
			}

			const updatedMarketPost = await Marketplace.findByIdAndUpdate(
				itemId,
				updateData,
				{new: true, runValidators: true}
			);

			if (!updatedMarketPost) {
				return res.status(404).json({message: "Post not found"});
			}
			// delete file after picture updated
			if (req.file) {
				deleteFile(req.file.path);
			}

			return res
				.status(200)
				.json({message: "Post Updated Successfully", data: updatedMarketPost});
		} catch (error) {
			// console.log(error);

			return res
				.status(500)
				.json({message: "Couldn't update the post", error: error});
		}
	},

	deletePost: async (req, res) => {
		try {
			const {itemId} = req.params;
			const {userId} = req.userData;

			// Not required. But khatpat having
			const marketPost = await Marketplace.findOne({_id: itemId, userId});
			if (!marketPost) {
				return res.status(404).json({message: "Post not found"});
			}
			// END

			const deletedMarketPost = await Marketplace.findByIdAndDelete(itemId);
			if (!deletedMarketPost) {
				return res.status(404).json({message: "Post not found"});
			}
			return res
				.status(200)
				.json({message: "Post Deleted Successfully", data: deletedMarketPost});
		} catch (error) {
			return res
				.status(500)
				.json({message: "Couldn't delete the post", error: error});
		}
	},
};

export default marketController;
