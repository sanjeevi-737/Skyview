import mongoose, { type Document, type Model, Schema } from "mongoose"

export interface IUserDocument extends Document {
  _id: mongoose.Types.ObjectId
  name: string
  email: string
  password: string
  favorites: Array<{ lat: number; lon: number; name: string }>
  searchHistory: Array<{ query: string; lat: number; lon: number; timestamp: Date }>
  preferences: {
    unit: "metric" | "imperial"
    theme: "light" | "dark" | "system"
    notifications: boolean
  }
  createdAt: Date
  updatedAt: Date
}

const userSchema = new Schema<IUserDocument>(
  {
    name: { type: String, required: true, trim: true, minlength: 2, maxlength: 100 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, select: false },
    favorites: [
      {
        lat: { type: Number, required: true },
        lon: { type: Number, required: true },
        name: { type: String, default: "" },
      },
    ],
    searchHistory: [
      {
        query: { type: String, required: true },
        lat: { type: Number, required: true },
        lon: { type: Number, required: true },
        timestamp: { type: Date, default: Date.now },
      },
    ],
    preferences: {
      unit: { type: String, enum: ["metric", "imperial"], default: "metric" },
      theme: { type: String, enum: ["light", "dark", "system"], default: "system" },
      notifications: { type: Boolean, default: true },
    },
  },
  { timestamps: true },
)

userSchema.index({ "favorites.lat": 1, "favorites.lon": 1 })

export const User: Model<IUserDocument> = mongoose.model<IUserDocument>("User", userSchema)
