
import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import { getAccessToken } from '../auth';

const GRAPH_URL = 'http://localhost:9000/graphql';

export const client = new ApolloClient({
  uri: GRAPH_URL,
  cache: new InMemoryCache(),

});

export const JOB_DETAIL_FRAGMENT = gql`
fragment JobDetail on Job {
    id
    title
    company {
      id
      name
    }
    description
  }
`;

export const COMPANY_QUERY = gql`
query CompanyQuery($id: ID!) {
  company(id: $id) {
    id 
    name
    description 
    jobs {
    id
    title
  }
  }
}
`;

export const JOB_QUERY = gql`
query JobQuery($id: ID!) {
  job(id: $id) {
    ...JobDetail
  }
}
${JOB_DETAIL_FRAGMENT}
`;

export const JOBS_QUERY = gql`
query JobsQuery{
  jobs {
    id
    title
    company {
      id
      name
    }
  }
}
`;

export async function createJob(input) {
  const mutation = gql`
  mutation CreateJobMutation($input: CreateJobInput!) {
  job: createJob(input: $input) {
    ...JobDetail
  }
}
${JOB_DETAIL_FRAGMENT}
  `;
  const variables = { input };
  const clientContext = {
    headers: { 'Authorization': `Bearer ${getAccessToken() }` }, };
    const { data: { job } } = await client.mutate({ 
      mutation, variables, context: clientContext,
      update: (cache, { data: { job } }) => {
      cache.writeQuery({
        query: JOB_QUERY,
        variables: { id: job.id },
        data: { job },
      });
     },
    });
    return job;
  };



