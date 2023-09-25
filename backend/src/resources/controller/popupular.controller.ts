import { Request, Response } from 'express';
import poem from '../model/create.model';
import calculatePopularity from '../../utils/calculatePopularity';

const getPopularPoems = async (req: Request, res: Response) => {
  try {
    // Retrieve all poems from the database with upvotes greater than one
    const poems = await poem
      .find({ upvotes: { $gt: 1 } })
      .sort({ popularity: -1 })
      .limit(10)
      .populate({
        path: 'user', // Assuming the field in 'poem' model that references the user is named user
        select: 'profileImage username', // Select the fields you want to include
      })
      .exec();

    const popuPoems = poems.map((p) => ({
      _id: p._id,
      firstName: p.firstName,
      adjectives: p.adjectives,
      importantRelation: p.importantRelation,
      loves: p.loves,
      feelings: p.feelings,
      fears: p.fears,
      accomplishments: p.accomplishments,
      expectations: p.expectations,
      residence: p.residence,
      lastName: p.lastName,
      backgroundTheme: p.backgroundTheme,
      fontColor: p.fontColor,
      fontFamily: p.fontFamily,
      user: {
        id: p.user._id,
        profileImage: p.user.profileImage,
        username: p.user.username,
      },
      upvotes: p.upvotes,
      downvotes: p.downvotes,
      popularity: calculatePopularity(p.upvotes, p.downvotes),
    }));

    // Sort poems by popularity in descending order
    popuPoems.sort((a, b) => {
      return (b.popularity - a.popularity);
    });

    
    res.status(200).json({ success: true, popuPoems });

  } catch (error) {
    console.error('Error fetching popular poems:', error);
    res
      .status(500)
      .json({ message: 'An error occurred while fetching popular poems' });
  }
};

export default getPopularPoems;
