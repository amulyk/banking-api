import * as mongoose from 'mongoose';

export const StudentSchema = new mongoose.Schema({
  name: String,
  email: String,
  id: String,
});
