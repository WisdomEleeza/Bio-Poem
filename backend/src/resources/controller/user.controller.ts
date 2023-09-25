import { Request, Response } from 'express';
import usersModel from '../../resources/model/users.model';

const userCredentials = async (req: Request, res: Response) => {
  const { username } = req.body;
  try {
    if (!username)
      return res.status(400).json({ message: 'Username is required' });

    // Check if the username is already taken
    const existingUser = await usersModel.findOne({ username });

    if (existingUser) res.status(401).json({ message: 'Username is required' });

    // Create a new user
    const newUser = new usersModel({ username });

    // Save the new user to the database
    const savedUser = await newUser.save();

    res.status(200).json({
      userId: savedUser._id,
      username: username,
      message: 'Username submitted successfully',
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res
      .status(500)
      .json({ message: 'An error occurred while creating the user' });
  }
};

export default userCredentials;
