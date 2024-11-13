// pages/api/tasks/index.js
import connectMongo from '../../../lib/db';
import Task from '../../../models/Task';

export default async function handler(req, res) {
  const { method } = req;
  await connectMongo();

  switch (method) {
    case 'GET' :
      try {
        const tasks = await Task.find({});
        res.status(200).json({ success: true, data: tasks });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
      
    case 'POST' :

      try {
        const data = await Task.create(req.body);
        res.status(201).json({ success: true, data: data });
      }

       catch (error) {
        res.status(400).json({ success: false });
      }

      break;
    default:
 
      res.status(400).json({ success: false });
      break;

  }
}