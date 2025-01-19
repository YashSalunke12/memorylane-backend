import { Schema, model } from "mongoose";

const contentSchema = new Schema({
    link: {
        type: String,
    },
    type: {
        type: String,
        enum: ["image", "video", "article", "audio"],
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    tags: [{
        type: Schema.Types.ObjectId,
        ref: "Tag",
    }],
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
}, { timestamps: true });

export const ContentModel = model("Content", contentSchema);
