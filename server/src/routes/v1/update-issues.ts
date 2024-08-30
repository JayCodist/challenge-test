import express from "express";
import { handleFormDataParsing } from "../../helpers/request-modifiers";
import { BadRequestResponse, SuccessResponse } from "../../core/ApiResponse";
import IssuesRepo from "../../database/repository/IssuesRepo";
import { ApiError } from "../../core/ApiError";

const updateIssue = express.Router();

updateIssue.put(
  "/update/:id",
  handleFormDataParsing(),
  async (req, res) => {
    try {
      if (!req.body.title || !req.body.description) {
        new BadRequestResponse("title and description are required").send(res);
        return;
      }
      await IssuesRepo.update(req.params.id, req.body);

      new SuccessResponse("success", null).send(res);
    } catch (error) {
      ApiError.handle(error as Error, res);
    }
  }
);

export default updateIssue;
