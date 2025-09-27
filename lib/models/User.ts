// MongoDB User model
import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  contactNumber: string;
  ageGroup: string;
  state: string;
  city: string;
  passwordHash: string;
  gamesHosted: number;
  gamesAttended: number;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
  name: { 
    type: String, 
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  contactNumber: {
    type: String,
    required: true,
    trim: true,
    match: [/^[6-9]\d{9}$/, 'Please enter a valid 10-digit mobile number']
  },
  ageGroup: {
    type: String,
    required: true,
    enum: ['18-25', '25-35', '35-45', '45+', 'All Ages']
  },
  state: {
    type: String,
    required: true,
    trim: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  passwordHash: { 
    type: String, 
    required: true,
    minlength: 6
  },
  gamesHosted: {
    type: Number,
    default: 0,
    min: 0
  },
  gamesAttended: {
    type: Number,
    default: 0,
    min: 0
  }
}, {
  timestamps: true
});

// Create the model if it doesn't exist, otherwise use the existing one
const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
