import mongoose from 'mongoose';

// An interface that describes the properties
// that are requried to create a new User
interface ITweet {
    content: string
    responseTo: mongoose.Types.ObjectId
    tweets: Array<mongoose.Types.ObjectId>
    likes: Array<mongoose.Types.ObjectId>
    author: mongoose.Types.ObjectId
}


const tweetSchema = new mongoose.Schema(
    {
        content: { type: String, required: true },
        tweets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tweet' }],
        likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        responseTo: { type: mongoose.Types.ObjectId, default: null }
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


export const Tweet = mongoose.model<ITweet>('Tweet', tweetSchema);