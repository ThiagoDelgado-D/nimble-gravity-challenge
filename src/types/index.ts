export interface Candidate {
  uuid: string;
  candidateId: string;
  applicationId: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Job {
  id: string;
  title: string;
}

export interface ApplyToJobRequest {
  uuid: string;
  jobId: string;
  candidateId: string;
  repoUrl: string;
}

export interface ApiError {
    message: string;
}