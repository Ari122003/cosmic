import mongoose from "mongoose";
const { Schema } = mongoose;

const shuttleDriverSchema = new Schema(
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
		Route: {
			type: String,
			required: true,
		},
		Shuttle_ID: {
			type: String,
			unique: true,
			uppercase: true,
		},
	},
	{ timestamps: true }
);

shuttleDriverSchema.index({ Email: 1 });
shuttleDriverSchema.index({ Shuttle_ID: 1 });
shuttleDriverSchema.index({ UID: 1 });
shuttleDriverSchema.index({ Route: 1 });

export default mongoose.model("ShuttleDriver", shuttleDriverSchema);
