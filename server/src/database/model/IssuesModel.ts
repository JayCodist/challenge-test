import { Document, model, Schema } from "mongoose";

const DOCUMENT_NAME = "Issue";
const COLLECTION_NAME = "issues";

export interface Issue {
  id: string;
  title: string;
  description: string;
}

const schema = new Schema({
  title: String,
  description: String
})

export const IssueModel = model<Document & Issue>(
  DOCUMENT_NAME,
  schema,
  COLLECTION_NAME
);

IssueModel.on("index", error => {
  if (error) {
    console.error(error);
  }
});
