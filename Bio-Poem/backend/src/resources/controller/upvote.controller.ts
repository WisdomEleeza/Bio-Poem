import { Request, Response } from 'express';
import poem from '../model/create.model';

const upvotePoem = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const poemToUpdate = await poem.findById(id);

    if (!poemToUpdate)
      return res.status(404).json({ message: 'Poem not found' });

    // Increment the upvote count in the poem document
    poemToUpdate.upvotes += 1;

    // Save the updated poem document
    await poemToUpdate.save();

    res.status(200).json({ poemToUpdate, message: 'Poem upvoted successfully' });
  } catch (error) {
    console.error('Error upvoting poem:', error);
    res
      .status(500)
      .json({ message: 'An error occurred while upvoting the poem' });
  }
};

export default upvotePoem;
