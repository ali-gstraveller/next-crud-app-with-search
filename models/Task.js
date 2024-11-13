// models/Task.js

import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [40, 'Title cannot be more than 40 characters'],
  },
  description: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Task || mongoose.model('Task', TaskSchema);
