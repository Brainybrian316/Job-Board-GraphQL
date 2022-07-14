import { request, gql } from 'graphql-request';

const GRAPH_URL = 'http://localhost:9000/graphql';

export async function getJobs() {
  const query = gql`
    query {
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
  return jobs


}