import { Request, Response } from 'express';
import poem from '../model/create.model';


const recentPoems = async (req: Request, res: Response) => {
  // Default values for page and limit if not provided or not valid numbers
  const currentPage = parseInt(req.query.page as string, 10) || 1;
  const itemsPerPage = parseInt(req.query.limit as string, 10) || 12;

  const skip = (currentPage - 1) * itemsPerPage;

  try {
    // Find recent poems and populate the user data
    let allPoems = await poem
      .find({})
      .sort({ createdAt: -1 })
      .populate({
        path: 'user', // Assuming the field in 'poem' model that references the user is named user
        select: 'profileImage username', // Select the fields you want to include
      })
      .exec();
      console.log(allPoems);
      

    const total = allPoems.length;
    const recentPoems = allPoems.slice(skip, skip + itemsPerPage);

    const hasMore = total >= skip + itemsPerPage;
    res.status(200).json({ success: true, recentPoems, total, hasMore });
  } catch (error) {
    console.error('Error fetching recent poems:', error);
    res
      .status(500)
      .json({ message: 'An error occurred while fetching recent poems' });
  }
};

export default recentPoems;
