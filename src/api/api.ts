import { BASE_URL } from "../constants";
import type { Candidate, Job, ApplyPayload } from "../types";

async function extractErrorMessage(response: Response): Promise<string> {
  try {
    const body = await response.json();
    return body?.message ?? body?.error ?? JSON.stringify(body);
  } catch {
    return response.statusText || `Error ${response.status}`;
  }
}

async function request<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const response = await fetch(input, init);

  if (!response.ok) {
    const message = await extractErrorMessage(response);
    throw new Error(message);
  }

  return response.json() as Promise<T>;
}

export async function getCandidate(email: string): Promise<Candidate> {
  const url = `${BASE_URL}/api/candidate/get-by-email?email=${encodeURIComponent(email)}`;
  return request<Candidate>(url);
}

export async function getJobs(): Promise<Job[]> {
  return request<Job[]>(`${BASE_URL}/api/jobs/get-list`);
}

export async function applyToJob(payload: ApplyPayload): Promise<void> {
  return request<void>(`${BASE_URL}/api/candidate/apply-to-job`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}
