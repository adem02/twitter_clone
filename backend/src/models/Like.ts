import mongoose from 'mongoose'

interface ILike {
    tweet: mongoose.Types.ObjectId
    user: mongoose.Types.ObjectId
}

const likeSchema = new mongoose.Schema(
    {
        tweet: { type: mongoose.Schema.Types.ObjectId, ref: 'Tweet' },
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
)

export const Like = mongoose.model<ILike>('Like', likeSchema)
