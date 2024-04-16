import mongoose, {InferSchemaType} from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    image: {type: Buffer, required: true},
    contentType: {type: String, required: true},
  },
  {timestamps: true},
);
type Image = InferSchemaType<typeof imageSchema> & {_id: string} & Document;
const ImageModel = mongoose.models?.["images"] ?? mongoose.model("images", imageSchema);
export default ImageModel;
export type {Image as ImageType};
