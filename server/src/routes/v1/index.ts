import express from "express";
import getAllIssues from "./get-issues";
import createIssue from "./create-issue";
import updateIssue from "./update-issues";
import deleteIssue from "./delete-issue";

const router = express.Router();

router.use("/issues/all", getAllIssues);
router.use("/issues/create", createIssue);
router.use("/issues/update", updateIssue);
router.use("/issues/delete", deleteIssue);

export default router;