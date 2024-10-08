import mongoose from "mongoose";
const { Schema } = mongoose;

const ShuttleDriverSchema = new Schema(
	{
		UID: {
			type: String,
			required: true,
			unique: true,
		},
		Name: {
			type: String,
			required: true,
			trim: true,
			minlength: 2,
		},
		Email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
		},
		Phone: {
			type: String,
			required: true,
			minlength: 10,
			maxlength: 15,
		},
		DOB: {
			type: String,
			required: true,
		},
		Car_no: {
			type: String,
			required: true,
			uppercase: true,
		},
		Shuttle_ID: {
			type: String,
			uppercase: true,
		},
		Route: {
			type: String,
			required: true,
			trim: true,
		},
	},
	{ timestamps: true }
);

ShuttleDriverSchema.index({ email: 1 });
ShuttleDriverSchema.index({ Shuttle_ID: 1 });
ShuttleDriverSchema.index({ uid: 1 });

export default mongoose.model("ShuttleDrivers", ShuttleDriverSchema);
