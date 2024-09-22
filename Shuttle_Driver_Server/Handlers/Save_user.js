import ShuttleDrivers from "../Schemas/Driver_schema.js";

async function saveUser(userData) {
	try {
		const { uid, name, email, phone, dob, car, route } = userData;

		const existingUser = await ShuttleDrivers.findOne({ UID: uid });

		if (existingUser) {
			throw new Error("User with this email already exists");
		}

		const newDriver = new ShuttleDrivers({
			UID: uid,
			Name: name,
			Email: email,
			Phone: phone,
			DOB: dob,
			Car_no: car,
			Route: route,
			Shuttle_ID: null,
		});

		await newDriver.save();

		return "Registration successfull";
	} catch (error) {
		throw new Error(error.message);
	}
}

export default saveUser;
