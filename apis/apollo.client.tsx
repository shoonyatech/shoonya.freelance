import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'

const httpLink = (path) =>
  createHttpLink({
    uri: path,
  })

const client = (path) =>
  new ApolloClient({
    link: httpLink(path),
    cache: new InMemoryCache(),
  })

function GetApolloClient(path) {
  return client(path)
}

export default GetApolloClient
