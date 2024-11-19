import mongoose from 'mongoose';
import { IUrlData, IUrlModel } from '../controllers/shorturl.controller.ts';

const { Schema } = mongoose;

const ShorturlSchema = new Schema<IUrlData>(
  {
    url: { type: String, required: true },
    shortCode: { type: String, required: true },
    accessCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

ShorturlSchema.statics.incrementAccessCount = async function (
  shortCode: string
): Promise<IUrlData | null> {
  const result = await this.findOneAndUpdate(
    { shortCode },
    { $inc: { accessCount: 1 } },
    { new: true }
  );
  return result;
};

export const Shorturl = mongoose.model<IUrlData, IUrlModel>('Shorturl', ShorturlSchema);
