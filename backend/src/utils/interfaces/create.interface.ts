interface CreatePoem {
  firstName: string;
  adjectives: string;
  importantRelation: string;
  loves: string;
  feelings: string;
  fears: string;
  accomplishments: string;
  expectations: string;
  residence: string;
  lastName: string;
  backgroundTheme?: string;
  fontColor?: string;
  fontFamily?: string;
  profileImage: string;
  user: {
    _id: string;
    profileImage: string;
    username: string;
  };
  upvotes: number;
  downvotes: number;
  popularity: number;
}
export default CreatePoem;
