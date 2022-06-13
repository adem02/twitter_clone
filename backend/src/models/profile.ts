import mongoose from 'mongoose';

// An interface that describes the properties
// that are requried to create a new User
export interface IProfile {
    location?: string;
    bio?: string;
    user: mongoose.Types._ObjectId
}

const profileSchema = new mongoose.Schema(
    {
        location: String,
        bio: String,
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    },
    {
        timestamps: true,
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
            }
        }
    }
);

export const Profile = mongoose.model<IProfile>('Profile', profileSchema);

