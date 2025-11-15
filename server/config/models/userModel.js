import mongoose, { Types } from "mongoose";
const {Schema, models, model} = mongoose

const userSchema = new Schema({
	username: {
		type: String,
		require: true,
	},
	password: {
		type: String,
		require: true,
	},
	email: {
		type: String,
		require: true,
	},
	phoneNumber: {
		type: String,
		require: true,
	},
	description: {
		type: String,
		maxLength: 500
	},
	location: {
		type: String,
		require: true
	},
	gender: {
		type: String,
		enum: ["Male", "Female"],
		require: true
	},
	profilePicId: {
		type: Types.ObjectId,
		ref: "ProfilePic",
		default: null
	},
	type: {
		type: String,
		enum: ["Farmer", "Expert"],
		require: true
	}
});

const User = models.User || model("User", userSchema);
export default User;
