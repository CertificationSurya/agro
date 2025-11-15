import jwt from 'jsonwebtoken'

const fetchuser = (req, res, next) => {
	const farmer_token = req.cookies.farmer_token;

	if (!req.cookies.farmer_token) {
		return res.status(403).json({message: "Unauthorized user - No token provided."});
	}

	try {
		const JWT_DATA = jwt.verify(farmer_token, process.env.JWT_SECRET);
		const {iat, exp, ...data} = JWT_DATA;
		req.userData = data
		
	} catch (error) {
		return res.status(403).json({message: "Unauthorized user - No token provided."});
	}
	next();
};

export default fetchuser;
