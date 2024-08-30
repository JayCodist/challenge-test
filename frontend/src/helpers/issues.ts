import { RequestResponse, restAPIInstance } from "./rest-api-config";

export interface Issue {
  id: string;
  title: string;
  description: string;
}

export const getAllIssues: () => Promise<
  RequestResponse<Issue[]>
> = async () => {
  try {
    const response = await restAPIInstance.get("/v1/issues/all");
    return {
      error: false,
      data: response.data,
    };
  } catch (err) {
    console.error("Unable to get issues: ", err);
    return {
      error: true,
      data: null,
      message: String((err as Error).message || err),
    };
  }
};

export const createIssue: (issue: Omit<Issue, "id">) => Promise<
  RequestResponse
> = async (issue) => {
  try {
    const response = await restAPIInstance.post("/v1/issues/create", issue);
    return {
      error: false,
      data: response.data,
    };
  } catch (err) {
    console.error("Unable to create issue: ", err);
    return {
      error: true,
      data: null,
      message: String((err as Error).message || err),
    };
  }
};

export const updateIssue: (issue: Issue) => Promise<
  RequestResponse
> = async (issue) => {
  try {
    const response = await restAPIInstance.put(`/v1/issues/update/${issue.id}`, issue);
    return {
      error: false,
      data: response.data,
    };
  } catch (err) {
    console.error("Unable to update issue: ", err);
    return {
      error: true,
      data: null,
      message: String((err as Error).message || err),
    };
  }
};

export const deleteIssue: (issueId: string) => Promise<
  RequestResponse
> = async (issueId) => {
  try {
    const response = await restAPIInstance.delete(`/v1/issues/delete/${issueId}`);
    return {
      error: false,
      data: response.data,
    };
  } catch (err) {
    console.error("Unable to delete issue: ", err);
    return {
      error: true,
      data: null,
      message: String((err as Error).message || err),
    };
  }
};