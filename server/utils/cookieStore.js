import jwt from "jsonwebtoken";

export default function storeToCookie(dbUser, res, profilePicId = "") {
	const {_id, password, __v, ...cookieData} = dbUser._doc;
	const data = {
		...cookieData,
		profilePicId: profilePicId ? profilePicId : cookieData.profilePicId,
		userId: _id,
	};

	const farmer_token = jwt.sign(data, process.env.JWT_SECRET, {
		expiresIn: "7d",
	});

	res.cookie("farmer_token", farmer_token, {
		path: "/",
		httpOnly: true,
		secure: true,
		sameSite: "None",
	});

	return data;
}
