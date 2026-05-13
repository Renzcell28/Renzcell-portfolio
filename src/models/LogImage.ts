import mongoose from 'mongoose';

const LogImageSchema = new mongoose.Schema({
  slug: { type: String, required: true, index: true },
  filename: { type: String, required: true },
  url: { type: String, required: true },
  size: { type: Number },
  mimeType: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Create compound index for faster queries
LogImageSchema.index({ slug: 1, createdAt: -1 });

export const LogImage = mongoose.models.LogImage || mongoose.model('LogImage', LogImageSchema);