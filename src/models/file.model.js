import mongoose, { Schema } from "mongoose";

const fileSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User", // string model name
      required: true,
    },
    name: {
      type: String,
      required: true,
      // no unique here; uniqueness enforced by compound index below
    },
    extension: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      default: "",
    },
    language: {
      type: String,
      required: true,
      default: "javascript",
      enum: ["javascript", "python", "cpp", "go", "java", "rust"],
    },
  },
  {
    timestamps: true, // correct option name
  }
);

// Compound unique index to ensure no duplicate file names per user
fileSchema.index({ user: 1, name: 1 }, { unique: true });

export const File = mongoose.model("File", fileSchema);
