/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPerson = /* GraphQL */ `
  query GetPerson($id: ID!) {
    getPerson(id: $id) {
      id
      firstName
      lastName
      dateOfBirth
      dayOfBirth
      monthOfBirth
      yearOfBirth
      dayArcane
      soulCode
      growthArea
      karmicKnot
      socialPurpose
      destiny
      matrix
      email
      phone
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listPeople = /* GraphQL */ `
  query ListPeople(
    $filter: ModelPersonFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPeople(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        firstName
        lastName
        dateOfBirth
        dayOfBirth
        monthOfBirth
        yearOfBirth
        dayArcane
        soulCode
        growthArea
        karmicKnot
        socialPurpose
        destiny
        matrix
        email
        phone
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
