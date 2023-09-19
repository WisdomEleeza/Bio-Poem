import { Schema, model } from 'mongoose';
import CreatePoemInterface from '../../utils/interfaces/create.interface';

const createPoemSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    adjectives: {
      type: String,
      required: true,
    },
    importantRelation: {
      type: String,
      required: true,
    },
    loves: {
      type: String,
      required: true,
    },
    feelings: {
      type: String,
      required: true,
    },
    fears: {
      type: String,
      required: true,
    },
    accomplishments: {
      type: String,
      required: true,
    },
    expectations: {
      type: String,
      required: true,
    },
    residence: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    backgroundTheme: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
    upvotes: {
      type: Number,
      default: 0,
    },
    downvotes: {
      type: Number,
      default: 0,
    },
    fontColor: {
      type: String,
    },
  },
  { timestamps: true },
);

export default model<CreatePoemInterface>('CreatePoem', createPoemSchema);

// one - many relationship
// one user can have many poems and many poems belongs to one user
// but in my requirement: one user can only have one poem and one poem will only belong to one user
