import { Company, Job } from './db.js';


export const resolvers = {
  Query: {
    //  we can use '_' to ignore or leave an argument out
    company: (_, { id}) => Company.findById(id),
    /* we only want one job from the job schema in graphql. we pass 'id' as an args instead of args since it contains the id and we only want the id */
    job: (_root, { id }) => Job.findById(id),

    // we say jobs because we are querying the jobs table in schema.graphql
    jobs: () => Job.findAll(), // db from jobs.json
  },

  Mutation: {
    createJob: (_root, { input}, { auth } ) => {
      if (!auth) {
        throw new Error('invalid credentials');
      }
       return Job.create(input);
      },
    deleteJob: (_root, { id }) => Job.delete(id),
    updateJob: (_root, { input }) => Job.update(input),
  },

  Company: {
    jobs: (company) => Job.findAll((job) => job.companyId === company.id),
  },

  // we search schema.graphql Job type for the fields we want to add
  Job: {
    // we want to add a company field to the Job type so we pass job as the first argument to the function
    company: (job) => Company.findById(job.companyId),
    // in the companies.json we find the company with the id of the job
  },
};
