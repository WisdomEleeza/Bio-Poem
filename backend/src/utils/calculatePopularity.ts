const calculatePopularity = (upvotes: number, downvotes: number) => {
  return upvotes - downvotes;
};
export default calculatePopularity;
