import {NgModule} from '@angular/core';
import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLinkModule, HttpLink} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import { Constants } from './constants';
// import { environment } from 'src/environments/environment';

// const uri = environment.GRAPHQL_URL; // <-- add the URL of the GraphQL server here
const uri = Constants.URL;
// 生成ApolloClient, Apollo performs two important core tasks:
// Executing queries and mutations, and caching the results.
export function createApollo(httpLink: HttpLink) {
  return {
    link: httpLink.create({uri}),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
