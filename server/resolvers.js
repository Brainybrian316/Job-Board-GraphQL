import { Company, Job } from './db.js';


export const resolvers = {
  // we say jobs because we are querying the jobs table in schema.graphql
  Query: {
    jobs: () => Job.findAll(), // db from jobs.json
  },

  // we search schema.graphql Job type for the fields we want to add
  Job: {
    // we want to add a company field to the Job type so we pass job as the first argument to the function
    company: (job) => Company.findById(job.companyId)
    // in the companies.json we find the company with the id of the job 
  },
}