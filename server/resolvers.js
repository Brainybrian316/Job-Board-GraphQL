import { Company, Job } from './db.js';

export const resolvers = {
  Query: {
    jobs: () => Job.findAll(),
  },

  // looks in Job type query for the company field
  Job: {
    // using company db we use job argument to get information from job db 
    company: (job) => Company.findById(job.companyId)
    // find a company id using the company db to attach to job query
  },
}