import { Response } from "express";
import { ContentModel } from "../models/content.model";
import { CustomRequest } from "../utils/types";

export const addContentHandler = async (req: CustomRequest, res: Response): Promise<void> => {
    try {
        const { type, link, title } =  req.body;
        const newContent = await ContentModel.create({
            type,
            link,
            title,
            userId: req.userId,
        });
        res.status(201).json({ meassage: "content uploaded successfully" });

    } catch (error) {
        console.log("error while adding content", error);
        res.status(500).json({ message: "error while adding content" });
    }        
}


export const getContentHandler = async (req: CustomRequest, res: Response): Promise<void> => {
    try {
        const { userId } = req;
        const contents = await ContentModel.find({ userId }).populate("userId", "-password");
        res.status(200).json({ success: true, contents });
    } catch (error) {
        console.log("error while getting contents", error);
        res.status(500).json({ message: "error while getting contents" });
    }
}


export const deleteContentHandler = async (req: CustomRequest, res: Response): Promise<void> => {
    try {
        const { contentId } = req.body;
        await ContentModel.findOneAndDelete({ _id: contentId, userId: req.userId });
        res.status(200).json({ message: "content deleted successfully" });
    } catch (error) {
        console.log("error while deleting the content", error);
        res.status(500).json({ message: "error while deleting the content"});
    }
}