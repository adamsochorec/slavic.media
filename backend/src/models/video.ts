import mongoose, { Schema, Document } from "mongoose";

interface Client {
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
  client?: Client;
  category?: string;
}

const clientSchema = new Schema<Client>(
  {
    name: { type: String, required: true, maxlength: 100 },
    url: { type: String, required: true, maxlength: 200 },
  },
  { _id: false }
);

const videoSchema = new Schema<Video>({
  _id: { type: String, required: true, maxlength: 50 },
  index: { type: Number, required: true, unique: true },
  flag: { type: String, required: true, maxlength: 50 },
  title: { type: String, required: true, maxlength: 200 },
  url: { type: String, required: true, maxlength: 100 },
  year: { type: String, required: true, maxlength: 4 },
  client: { type: clientSchema, required: false },
  category: { type: String, maxlength: 100 },
});

// Auto-increment index before saving a new document
videoSchema.pre("save", async function (next) {
  if (this.isNew && (this.index === undefined || this.index === null)) {
    const lastVideo = await mongoose
      .model<Video>("Video")
      .findOne({})
      .sort({ index: -1 })
      .select("index")
      .exec();
    this.index =
      lastVideo && typeof lastVideo.index === "number"
        ? lastVideo.index + 1
        : 1;
  }
  next();
});

const Video = mongoose.model<Video>("Video", videoSchema);
export { videoSchema };
export default Video;
