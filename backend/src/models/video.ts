import mongoose, { Schema, Document } from "mongoose";

interface Client extends Document {
  name?: string;
  url?: string;
}
interface Video extends Document {
  _id: string;
  index: number;
  flag: string;
  title: string;
  url: string;
  year: string;
  client: Client;
  description?: string;
  category?: string;
}

const videoSchema = new Schema<Video>({
  _id: { type: String, required: true, maxlength: 50 },
  index: { type: Number, required: true, unique: true },
  flag: { type: String, required: true, maxlength: 50 },
  title: { type: String, required: true, maxlength: 200 },
  url: { type: String, required: true, maxlength: 100 },
  year: { type: String, required: true, maxlength: 4 },
  client: {
    type: new Schema<Client>({
      name: { type: String, required: true, maxlength: 100 },
      url: { type: String, required: true, maxlength: 200 },
    }),
    required: true,
  },
  description: { type: String, maxlength: 100 },
  category: { type: String, maxlength: 100 },
});

const Video = mongoose.model<Video>("Video", videoSchema);
export { videoSchema };
export default Video;
