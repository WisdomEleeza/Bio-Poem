// import { Request, Response } from 'express';
// import poem from '../src/resources/model/create.model'
// import calculatePopularity from '../src/utils/calculatePopularity';
// import getPopularPoems from '../src/resources/controller/popupular.controller'


// jest.mock('../model/create.model');
// jest.mock('../../utils/calculatePopularity');

// describe('getPopularPoems', () => {
//   let req: Request;
//   let res: Response;

//   beforeEach(() => {
//     req = {} as Request;
//     res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//     } as unknown as Response;
//   });

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   describe('when there are popular poems', () => {
//     const poems = [
//       {
//         _id: '1',
//         firstName: 'John',
//         adjectives: ['happy', 'brave'],
//         importantRelation: 'friend',
//         loves: ['reading', 'cooking'],
//         feelings: ['joy', 'excitement'],
//         fears: ['heights', 'spiders'],
//         accomplishments: ['graduated', 'published'],
//         expectations: ['success', 'happiness'],
//         residence: 'New York',
//         lastName: 'Doe',
//         backgroundTheme: 'light',
//         fontColor: 'black',
//         upvotes: 5,
//         downvotes: 2,
//         user: {
//           _id: '1',
//           profileImage: 'profile.jpg',
//           username: 'johndoe',
//         },
//         popularity: 3,
//       },
//       // Add more popular poems here
//     ];

//     beforeEach(() => {
//       poem.find.mockResolvedValue(poems);
//     });

//     it('should retrieve popular poems from the database and sort them by popularity in descending order', async () => {
//       await getPopularPoems(req, res);

//       expect(poem.find).toHaveBeenCalledWith({ upvotes: { $gt: 1 } });
//       expect(poem.find().sort).toHaveBeenCalledWith({ popularity: -1 });
//       expect(poem.find().limit).toHaveBeenCalledWith(10);
//       expect(poem.find().populate).toHaveBeenCalledWith({
//         path: 'user',
//         select: 'profileImage username',
//       });
//       expect(poem.find().exec).toHaveBeenCalled();
//       expect(poem.find().exec().then).toHaveBeenCalled();
//       expect(poem.find().exec().then().catch).not.toHaveBeenCalled();
//       expect(poem.find().exec().then().catch().finally).not.toHaveBeenCalled();
//       expect(res.status).toHaveBeenCalledWith(200);
//       expect(res.json).toHaveBeenCalledWith({ success: true, popuPoems: expect.any(Array) });
//       expect(res.json().popuPoems).toEqual(
//         expect.arrayContaining([
//           expect.objectContaining({
//             _id: expect.any(String),
//             firstName: expect.any(String),
//             adjectives: expect.any(Array            importantRelation: expect.any(String),
//             loves: expect.any(Array),
//             feelings: expect.any(Array),
//             fears: expect.any(Array),
//             accomplishments: expect.any(Array),
//             expectations: expect.any(Array),
//             residence: expect.any(String),
//             lastName: expect.any(String),
//             backgroundTheme: expect.any(String),
//             fontColor: expect.any(String),
//             upvotes: expect.any(Number),
//             downvotes: expect.any(Number),
//             user: expect.objectContaining({
//               id: expect.any(String),
//               profileImage: expect.any(String),
//               username: expect.any(String),
//             }),
//           }),
//         ])
//       );
//       expect(calculatePopularity).toHaveBeenCalledWith(poems[0].upvotes, poems[0].downvotes);
//     });
//   });

//   describe('when there are no popular poems', () => {
//     beforeEach(() => {
//       poem.find.mockResolvedValue([]);
//     });

//     it('should return an empty array', async () => {
//       await getPopularPoems(req, res);

//       expect(res.status).toHaveBeenCalledWith(200);
//       expect(res.json).toHaveBeenCalledWith({ success: true, popuPoems: [] });
//     });
//   });

//   describe('when there is an error fetching popular poems', () => {
//     const error = new Error('Database error');

//     beforeEach(() => {
//       poem.find.mockRejectedValue(error);
//     });

//     it('should return a 500 status code and an error message', async () => {
//       await getPopularPoems(req, res);

//       expect(res.status).toHaveBeenCalledWith(500);
//       expect(res.json).toHaveBeenCalledWith({ message: 'An error occurred while fetching popular poems' });
//     });
//   });
// });