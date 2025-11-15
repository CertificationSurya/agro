import User from "../config/models/userModel.js";
import {Conversation} from "../config/models/chatModel.js";
import storeToCookie from "../utils/cookieStore.js";

const userController = {
	getUserInfo: async (req, res) => {
		try {
			const {userId} = req.params;
			const user = await User.findOne({_id: userId}, {password: 0});

			res.status(200).json({data: user});
		} catch (error) {
			return res.status(500).json({message: "Internal Server Error Occured!"});
		}
	},
	getConversation: async (req, res) => {
		const {userId} = req.params;

		try {
			const users = await User.find(
				{_id: {$ne: userId}}, // no currentUser
				{password: 0} // noPassword field
			);

			const conversationUserIsIn = await Conversation.find({
				$or: [{senderId: userId}, {receiverId: userId}],
			});

			let chattedUserInfo = [];
			if (conversationUserIsIn) {
				const userSet = new Set();
				conversationUserIsIn.forEach((convo) => {
					if (convo.senderId != userId) {
						userSet.add(convo.senderId);
					} else {
						userSet.add(convo.receiverId);
					}
				});
				const chattedUserId = Array.from(userSet);

				chattedUserInfo = await User.find(
					{_id: {$in: chattedUserId}},
					"username email phoneNumber type"
				);
			}

			return res.status(200).json({
				message: "retrieved users successfully",
				// users, // TODO: check if it's needed or not. => seems like not
				chattedUsers: chattedUserInfo,
			});
		} catch (err) {
			console.error(err);
			return res.status(500).json({message: "Unable to retrieve users"});
		}
	},
	updateUserDetails: async (req, res) => {
		const {userId} = req.userData;
		const profilePicId = req.file.id;

		try {
			const updatedUser = await User.findOneAndUpdate(
				{_id: userId},
				{profilePicId},
				{new: true}
			);
			const data = await storeToCookie(updatedUser, res, profilePicId)

			res.status(200).json({message: "Successfully Updated Picture!", data});
		} catch (error) {
			res.status(400).json({message: "Picture Updation Failed !!!"});
		}
	},
};

export default userController;
