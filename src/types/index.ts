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
export type ApplyStatus = 'idle' | 'loading' | 'success' | 'error'

export type AppStep = 'identify' | 'jobs'