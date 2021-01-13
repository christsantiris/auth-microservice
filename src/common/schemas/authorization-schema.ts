import { Schema } from 'mongoose';

export const AuthorizationSchema: Schema = new Schema({
  appName: {
    type: String,
    required: true,
  },
  apiKey: {
    type: String,
    required: true,
  }
});
