import ShuttleDriver from "../Schemas/Driver_schema.js";

async function saveUser(userData) {
	try {
		const { uid, name, email, phone, dob, car, route } = userData;

		const existingUser = await ShuttleDriver.findOne({ UID: uid });

		if (existingUser) {
			throw new Error("User with this email already exists");
		}

		const newDriver = new ShuttleDriver({
			UID: uid,
			Name: name,
			Email: email,
			Phone: phone,
			DOB: dob,
			Car_no: car,
			Route: route,
		});

		await newDriver.save();

		return "Registration successfull";
	} catch (error) {
		throw new Error(error.message);
	}
}

export default saveUser;
