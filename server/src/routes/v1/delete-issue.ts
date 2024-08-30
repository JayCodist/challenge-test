import express from "express";
import { BadRequestResponse, SuccessMsgResponse } from "../../core/ApiResponse";
import IssuesRepo from "../../database/repository/IssuesRepo";
import { ApiError } from "../../core/ApiError";

const deleteIssue = express.Router();

deleteIssue.delete(
  "/:id",
  async (req, res) => {
    try {
      const response = await IssuesRepo.delete(req.params.id);
      if (!response) {
        new BadRequestResponse("Issue not found").send(res);
      }

      new SuccessMsgResponse("success").send(res);
    } catch (error) {
      ApiError.handle(error as Error, res);
    }
  }
);

export default deleteIssue;
