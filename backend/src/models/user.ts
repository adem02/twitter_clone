import mongoose from 'mongoose';
import { Password } from '../services/password';

// An interface that describes the properties
// that are requried to create a new User
export interface IUser {
  firstname: string
  lastname: string
  username: string
  birthday: Date
  email: string
  password: string
  profile?: mongoose.Types.ObjectId
  followers: Array<mongoose.Types.ObjectId>
  followings: Array<mongoose.Types.ObjectId>
}


const userSchema = new mongoose.Schema<IUser>(
  {
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    firstname: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
    },
    username: {
      type: String,
      unique: true,
      required: true
    },
    birthday: {
      type: Date,
      required: true
    },
    profile: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
    followings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      }
    }
  }
);

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

const User = mongoose.model<IUser>('User', userSchema);

export { User };
