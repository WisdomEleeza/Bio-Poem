import { Request, Response } from "express";
import poem from '../model/create.model'

const fetchAllPoems = async (req: Request, res: Response) => {
    try {
        const fetchedPoems = await poem.find({}).populate({
            path: 'user',
            select: 'profileImage username'
        });
        
        res.status(200).json({ success: true, poems: fetchedPoems });
    } catch (error) {
        console.error('Error fetching poems:', error);
        res.status(500).json({ success: false, message: 'Error fetching poems' });
    }
}

export default fetchAllPoems;
