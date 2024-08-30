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
    const response = await restAPIInstance.get("/issues");
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
