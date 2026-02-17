import type { Candidate, Job } from "./types";

export const MOCK_CANDIDATE: Candidate = {
  uuid: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  candidateId: "a1b2c3d4",
  applicationId: "b2c3d4e5",
  firstName: "Jane",
  lastName: "Doe",
  email: "jane.doe@example.com",
};

export const MOCK_JOBS: Job[] = [
  { id: "4416372005", title: "Fullstack Developer" },
  { id: "9100000001", title: "Head Chef" },
  { id: "9100000002", title: "Senior Backend Engineer" },
];

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
