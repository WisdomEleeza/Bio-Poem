import { Schema, model } from 'mongoose';
import image from '../../utils/interfaces/image.interface';

const imageSchema = new Schema({
  image: {
    type: String,
  },
});

export default model<image>('image', imageSchema);
