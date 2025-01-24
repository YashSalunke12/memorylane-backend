import { Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { ContentModel } from "../models/content.model";
import { CustomRequest } from "../utils/types";
import { LinkModel } from "../models/link.model";
import { UserModel } from "../models/user.model";
import { asyncHandler } from "../utils/async-handler";
import { ApiResponse } from "../utils/api-response";

export const addContentHandler = asyncHandler(
  async (req: CustomRequest, res: Response): Promise<void> => {
    const { type, link, title } = req.body;
    const newContent = await ContentModel.create({
      type,
      link,
      title,
      userId: req.userId,
    });
    const response = new ApiResponse(201, {}, "content uploaded successfully");
    res.status(response.statusCode).json(response);
  }
);

export const getContentHandler = asyncHandler(
  async (req: CustomRequest, res: Response): Promise<void> => {
    const { userId } = req;
    const contents = await ContentModel.find({ userId }).populate(
      "userId",
      "-password"
    );
    const response = new ApiResponse(200, contents, "content fetched successfully");
    res.status(response.statusCode).json(response);
  }
);

export const deleteContentHandler = asyncHandler(
  async (req: CustomRequest, res: Response): Promise<void> => {
    const { contentId } = req.body;
    await ContentModel.findOneAndDelete({ _id: contentId, userId: req.userId });
    const response = new ApiResponse(200, {}, "content deleted successfully");
    res.status(response.statusCode).json(response);
  }
);

export const createShareLinkHandler = asyncHandler(
  async (req: CustomRequest, res: Response): Promise<void> => {
    const { share } = req.body;
    if (share) {
      const link = await LinkModel.create({
        userId: req.userId,
        hash: uuidv4(),
      });
      const response = new ApiResponse(201, {link: link.hash}, "link created")
      res.status(response.statusCode).json(response);
      return;
    }
    await LinkModel.deleteOne({
        userId: req.userId,
      });
    
    const response = new ApiResponse(201, {}, "deleted sharable link");
    res.status(response.statusCode).json(response);
  }
);

export const shareBrainHandler = asyncHandler(
  async (req: CustomRequest, res: Response): Promise<void> => {
    const { shareLink } = req.params;

    const link = await LinkModel.findOne({
      hash: shareLink,
    });

    if (!link) {
      const response = new ApiResponse(411, {}, "incorrect link");
      res.status(response.statusCode).json(response);
      return;
    }

    const content = await ContentModel.find({
      userId: link.userId,
    });

    const user = await UserModel.findOne({
      _id: link.userId,
    });

    if (!user) {
      const response = new ApiResponse(
        411,
        {},
        "user not found, error should ideally not happen"
      );
      res.status(response.statusCode).json(response);
      return;
    }

    const response = new ApiResponse(
      200,
      { username: user.email, content },
      "brain fetched successfully"
    );
    res.status(response.statusCode).json(response);
  }
);
