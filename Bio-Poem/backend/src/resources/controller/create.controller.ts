import { Request, Response } from 'express';
import poem from '../../resources/model/create.model';
import usersModel from '../../resources/model/users.model';

const createQuestionnaire = async (req: Request, res: Response) => {
  const {
    firstName,
    adjectives,
    importantRelation,
    loves,
    feelings,
    fears,
    accomplishments,
    expectations,
    residence,
    lastName,
    backgroundTheme,
  } = req.body;

  try {
    const { id } = req.params;
    // Check if a user with this username exists
    const user = await usersModel.findById(id);

    if (!user) {
      return res
        .status(401)
        .json({ message: 'User does not exist. Provide a valid username.' });
    }

    // Check if a poem already exists for this user
    const existingPoem = await poem.findOne({ user: user._id });

    if (existingPoem) {
      return res.status(401).json({
        message:
          'A poem for this user already exists. You cannot create another.',
      });
    }

    // Create a new poem associated with the user
    const createdQuestionnaire = await poem.create({
      user: user._id, // Associate the poem with the user
      firstName,
      adjectives,
      importantRelation,
      loves,
      feelings,
      fears,
      accomplishments,
      expectations,
      residence,
      lastName,
      backgroundTheme,
    });

    res.status(201).json({
      success: true,
      message: "You've made it! Bio Poem Created Successfully",
      data: createdQuestionnaire,
    });
  } catch (error) {
    console.error('Error creating questionnaire:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while creating the bio poem questionnaire',
    });
  }
};

export default createQuestionnaire;
