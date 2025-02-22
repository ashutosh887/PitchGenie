import mongoose, { Schema, Document } from "mongoose";

export interface ILead extends Document {
  name: string;
  role: string;
  company: string;
  profilePicture?: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  location?: string;
  industry?: string;
  experience?: string;
  skills?: string[];
}

const LeadSchema = new Schema<ILead>({
  name: { type: String, required: true },
  role: { type: String, required: true },
  company: { type: String, required: true },
  profilePicture: { type: String },
  email: { type: String },
  phone: { type: String },
  linkedin: { type: String },
  location: { type: String },
  industry: { type: String },
  experience: { type: String },
  skills: { type: [String] },
});

export default mongoose.models.Lead ||
  mongoose.model<ILead>("Lead", LeadSchema);
