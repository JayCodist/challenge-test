import dayjs from "dayjs";
import { Issue, IssueModel } from "../model/IssuesModel";

const formatResponseRecord = (issue: any): Issue => {
  issue.id = issue._id;
  delete issue.__v;
  delete issue._id;
  return issue;
};

export default class IssuesRepo {
  public static async createIssue({
    title,
    description,
  }: Omit<Issue, "id">): Promise<string> {
    const response = await IssueModel.create({ title, description });
    return response._id;
  }

  public static async getAll() {
    const response = await IssueModel.find({}).lean<Issue[]>().exec();

    return response.map(formatResponseRecord);
  }

  public static async update(id: string, updatedRecord: Partial<Issue>) {
    await IssueModel.updateOne({ _id: id }, updatedRecord);
  }

  public static async delete(id: string) {
    const response = await IssueModel.findByIdAndDelete(id);

    return response;
  }

  public static async findById(id: string): Promise<Issue | null> {
    const response = await IssueModel.findOne({ _id: id }).lean<Issue>().exec();

    return response ? formatResponseRecord(response) : null;
  }
}
