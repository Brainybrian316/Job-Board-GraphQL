import { request, gql } from 'graphql-request';

const GRAPH_URL = 'http://localhost:9000/graphql';

export async function getCompany(id) {
  const query = gql`
  query CompanyQuery($id: ID!) {
    company(id: $id) {
      id 
      name
      description 
    }
  }
  `;
  const variables = { id };
  const { company } = await request(GRAPH_URL, query, variables);
  return company;
}

export async function getJobs() {
  const query = gql`
    query JobsQuery{
      jobs {
        id
        title
        company {
          name
        }
      }
    }
  `;
  const { jobs } = await request(GRAPH_URL, query);
  return jobs;
}

export async function getJob(id) {
  const query = gql`
    query JobQuery($id: ID!) {
      job(id: $id) {
        id
        title
        company {
          id
          name
        }
        description
      }
    }
  `;
  const variables = { id };
  const { job } = await request(GRAPH_URL, query, variables);
  return job;
}


