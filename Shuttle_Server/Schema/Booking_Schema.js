import mongoose from "mongoose";
const { Schema } = mongoose;

const shuttleBookingSchema = new Schema(
	{
		Booking_id: { type: String, required: true, unique: true, index: true },
		Shuttle_id: { type: String, required: true, index: true },
		User_id: { type: String, required: true, index: true },
		Driver_id: { type: String, required: true, index: true },
		Fare: { type: Number, required: true, min: 0 },
		Day: {
			type: String,
			enum: [
				"Monday",
				"Tuesday",
				"Wednesday",
				"Thursday",
				"Friday",
				"Saturday",
				"Sunday",
			],
			required: true,
			index: true,
		},
		PickUp: { type: String, required: true },
		Drop: { type: String, required: true },
	},
	{ timestamps: true }
);

shuttleBookingSchema.index({ User_id: 1, Day: 1 });

const ShuttleBooking = mongoose.model("ShuttleBooking", shuttleBookingSchema);

export default ShuttleBooking;
