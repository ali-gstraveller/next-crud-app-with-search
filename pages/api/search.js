import connectMongo from '../../lib/db';
import Task from '../../models/Task';

export default async function handler(req, res) {
  
  await connectMongo();

  const { method } = req;
  const { query } = req.query;

  switch (method) {

    case 'GET':

      try {
        const items = await Task.find({
          title: { $regex: query, $options: 'i' }
        });
        res.status(200).json({ success: true, data: items });
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
