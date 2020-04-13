import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { UserInput } from '../user/user.input';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';

const loginGql = gql`
  query login($userInput: UserInput!) {
    login(userInput: $userInput) {
      token
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private apollo: Apollo) { }

  login(userInput: UserInput): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: loginGql,
      variables: {userInput},
    }).valueChanges;
  }

}
