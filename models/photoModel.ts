import { Schema, model, models } from "mongoose";

interface IUser {
  label: string;
  src: string;
  ownerId: string;
}

const photoSchema = new Schema<IUser>({
  label: {
    type: String,
    required: [true, "The label for this photo must be provided"],
  },
  src: {
    type: String,
    required: [true, "please provide an src for this photo"],
  },
  ownerId: { type: String, required: true },
});

const Photo = models.Photo || model<IUser>("Photo", photoSchema);

export default Photo;
