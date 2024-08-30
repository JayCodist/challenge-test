import express from "express";
import { handleFormDataParsing } from "../../helpers/request-modifiers";
import IssuesRepo from "../../database/repository/IssuesRepo";
import { BadRequestResponse, SuccessResponse } from "../../core/ApiResponse";
import { ApiError } from "../../core/ApiError";

const createIssue = express.Router();

createIssue.post(
  "/",
  handleFormDataParsing(),
  async (req, res) => {
    try {
      if (!req.body.title || !req.body.description) {
        new BadRequestResponse("title and description are required").send(res);
        return;
      }
      const response = await IssuesRepo.createIssue(req.body);

      new SuccessResponse("success", response).send(res);
    } catch (error) {
      ApiError.handle(error as Error, res);
    }
  }
);

export default createIssue;
