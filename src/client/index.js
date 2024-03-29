import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

const client  = new ApolloClient({
  link: new HttpLink({ uri: 'http://developmentproject_name-env.ap-southeast-1.elasticbeanstalk.com/graphql' }),
  cache: new InMemoryCache()
})

export default client
