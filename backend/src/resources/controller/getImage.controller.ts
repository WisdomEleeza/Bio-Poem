import { Request, Response } from 'express';
import ImageModel from '../../resources/model/imageModel';

const getAllImage = async (req: Request, res: Response) => {
  try {
    const image = await ImageModel.find({});
    res.status(200).json(image);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Images' });
  }
};
export default getAllImage;
