import express from "express";
import IssuesRepo from "../../database/repository/IssuesRepo";
import { SuccessResponse } from "../../core/ApiResponse";
import { ApiError } from "../../core/ApiError";

const getAllIssues = express.Router();

getAllIssues.get(
  "/",
  async (req, res) => {
    try {
      const response = await IssuesRepo.getAll();

      new SuccessResponse("success", response).send(res);
    } catch (error) {
      ApiError.handle(error as Error, res);
    }
  }
);

export default getAllIssues;