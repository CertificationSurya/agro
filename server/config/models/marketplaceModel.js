import mongoose from "mongoose";
const {models, Schema, model, Types} = mongoose;

const marketplaceSchema = new Schema({
	userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
	postedBy: {
		type: String,
		require: true
	},
	itemName: {
		type: String,
		require: true,
		maxLength: 50
	},
	itemType: {
		type: String,
		enum: ["animal", "product", "tool", "machinery"],
		default: "animal",
		require: true
	},
	pictureId:{
		type: Types.ObjectId,
		ref: "ProfilePic",
		default: null
	},
	price: {
		type: Number,
		require: true,
	},
	details: {
		type: String,
		require: true,
		maxLength: 1000,
	},
	location: {
		type: String,
		require: true,
	},
	type: {
		type: String,
		enum: ["sale", "rent"],
		require: true,
		default: "sale"
	},
}, {timestamps: true});

const Marketplace =
	models.Marketplace || model("Marketplace", marketplaceSchema);
export default Marketplace;