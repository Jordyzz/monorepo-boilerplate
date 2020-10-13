import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  me?: Maybe<User>;
  program: Program;
  programs: PaginatedPrograms;
};


export type QueryProgramArgs = {
  programId: Scalars['String'];
};


export type QueryProgramsArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  name: Scalars['String'];
  email: Scalars['String'];
};

export type Program = {
  __typename?: 'Program';
  id: Scalars['ID'];
  authorId: Scalars['String'];
  title: Scalars['String'];
  description: Scalars['String'];
  duration: Scalars['String'];
  language: Scalars['String'];
  level: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  chapters: Array<ChapterType>;
  upVotes: Array<UpVotesType>;
};


export type ChapterType = {
  __typename?: 'ChapterType';
  title: Scalars['String'];
  description: Scalars['String'];
  questions: Array<QuestionType>;
};

export type QuestionType = {
  __typename?: 'QuestionType';
  question: Scalars['String'];
  correctAnswer: Scalars['String'];
  codeSample: Scalars['String'];
  options: QuestionOptionsType;
};

export type QuestionOptionsType = {
  __typename?: 'QuestionOptionsType';
  a: Scalars['String'];
  b: Scalars['String'];
  c: Scalars['String'];
  d: Scalars['String'];
};

export type UpVotesType = {
  __typename?: 'UpVotesType';
  userId: Scalars['String'];
  value: Scalars['Float'];
};

export type PaginatedPrograms = {
  __typename?: 'PaginatedPrograms';
  programs: Array<Program>;
  hasMore: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  register: User;
  login?: Maybe<User>;
  logout: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  confirmUser: Scalars['Boolean'];
  changePassword?: Maybe<User>;
  vote: Scalars['Boolean'];
  deleteProgram: Scalars['Boolean'];
  createProgram: Program;
};


export type MutationRegisterArgs = {
  data: RegisterInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationConfirmUserArgs = {
  token: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  data: ChangePasswordInput;
};


export type MutationVoteArgs = {
  value: Scalars['Int'];
  programId: Scalars['String'];
};


export type MutationDeleteProgramArgs = {
  programId: Scalars['String'];
};


export type MutationCreateProgramArgs = {
  chapters: Array<ChapterInput>;
  level: Scalars['String'];
  duration: Scalars['String'];
  language: Scalars['String'];
  description: Scalars['String'];
  title: Scalars['String'];
};

export type RegisterInput = {
  password: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
};

export type ChangePasswordInput = {
  password: Scalars['String'];
  token: Scalars['String'];
};

export type ChapterInput = {
  title: Scalars['String'];
  description: Scalars['String'];
  questions: Array<QuestionInput>;
};

export type QuestionInput = {
  question: Scalars['String'];
  correctAnswer: Scalars['String'];
  codeSample: Scalars['String'];
  options: QuestionOptionsInput;
};

export type QuestionOptionsInput = {
  a: Scalars['String'];
  b: Scalars['String'];
  c: Scalars['String'];
  d: Scalars['String'];
};

export type CreateProgramMutationVariables = Exact<{
  title: Scalars['String'];
  description: Scalars['String'];
  language: Scalars['String'];
  duration: Scalars['String'];
  level: Scalars['String'];
  chapters: Array<ChapterInput>;
}>;


export type CreateProgramMutation = (
  { __typename?: 'Mutation' }
  & { createProgram: (
    { __typename?: 'Program' }
    & Pick<Program, 'id'>
  ) }
);

export type ProgramQueryVariables = Exact<{
  programId: Scalars['String'];
}>;


export type ProgramQuery = (
  { __typename?: 'Query' }
  & { program: (
    { __typename?: 'Program' }
    & Pick<Program, 'id' | 'authorId' | 'title' | 'description' | 'duration' | 'language' | 'level' | 'createdAt' | 'updatedAt'>
    & { chapters: Array<(
      { __typename?: 'ChapterType' }
      & Pick<ChapterType, 'title' | 'description'>
      & { questions: Array<(
        { __typename?: 'QuestionType' }
        & Pick<QuestionType, 'question' | 'correctAnswer' | 'codeSample'>
        & { options: (
          { __typename?: 'QuestionOptionsType' }
          & Pick<QuestionOptionsType, 'a' | 'b' | 'c' | 'd'>
        ) }
      )> }
    )> }
  ) }
);

export type ProgramsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type ProgramsQuery = (
  { __typename?: 'Query' }
  & { programs: (
    { __typename?: 'PaginatedPrograms' }
    & Pick<PaginatedPrograms, 'hasMore'>
    & { programs: Array<(
      { __typename?: 'Program' }
      & Pick<Program, 'id' | 'authorId' | 'title' | 'description' | 'duration' | 'language' | 'level' | 'createdAt' | 'updatedAt'>
      & { upVotes: Array<(
        { __typename?: 'UpVotesType' }
        & Pick<UpVotesType, 'userId' | 'value'>
      )>, chapters: Array<(
        { __typename?: 'ChapterType' }
        & Pick<ChapterType, 'title' | 'description'>
        & { questions: Array<(
          { __typename?: 'QuestionType' }
          & Pick<QuestionType, 'question' | 'correctAnswer' | 'codeSample'>
          & { options: (
            { __typename?: 'QuestionOptionsType' }
            & Pick<QuestionOptionsType, 'a' | 'b' | 'c' | 'd'>
          ) }
        )> }
      )> }
    )> }
  ) }
);

export type ChangePasswordMutationVariables = Exact<{
  data: ChangePasswordInput;
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstName' | 'lastName' | 'email' | 'name'>
  )> }
);

export type ConfirmUserMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type ConfirmUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'confirmUser'>
);

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstName' | 'lastName' | 'email' | 'name'>
  )> }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  data: RegisterInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstName' | 'lastName' | 'email' | 'name'>
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'email'>
  )> }
);


export const CreateProgramDocument = Apollo.gql`
    mutation CreateProgram($title: String!, $description: String!, $language: String!, $duration: String!, $level: String!, $chapters: [ChapterInput!]!) {
  createProgram(title: $title, description: $description, language: $language, duration: $duration, level: $level, chapters: $chapters) {
    id
  }
}
    `;
export type CreateProgramMutationFn = Apollo.MutationFunction<CreateProgramMutation, CreateProgramMutationVariables>;

/**
 * __useCreateProgramMutation__
 *
 * To run a mutation, you first call `useCreateProgramMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProgramMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProgramMutation, { data, loading, error }] = useCreateProgramMutation({
 *   variables: {
 *      title: // value for 'title'
 *      description: // value for 'description'
 *      language: // value for 'language'
 *      duration: // value for 'duration'
 *      level: // value for 'level'
 *      chapters: // value for 'chapters'
 *   },
 * });
 */
export function useCreateProgramMutation(baseOptions?: Apollo.MutationHookOptions<CreateProgramMutation, CreateProgramMutationVariables>) {
        return Apollo.useMutation<CreateProgramMutation, CreateProgramMutationVariables>(CreateProgramDocument, baseOptions);
      }
export type CreateProgramMutationHookResult = ReturnType<typeof useCreateProgramMutation>;
export type CreateProgramMutationResult = Apollo.MutationResult<CreateProgramMutation>;
export type CreateProgramMutationOptions = Apollo.BaseMutationOptions<CreateProgramMutation, CreateProgramMutationVariables>;
export const ProgramDocument = Apollo.gql`
    query program($programId: String!) {
  program(programId: $programId) {
    id
    authorId
    title
    description
    duration
    language
    level
    createdAt
    updatedAt
    chapters {
      title
      description
      questions {
        question
        correctAnswer
        codeSample
        options {
          a
          b
          c
          d
        }
      }
    }
  }
}
    `;

/**
 * __useProgramQuery__
 *
 * To run a query within a React component, call `useProgramQuery` and pass it any options that fit your needs.
 * When your component renders, `useProgramQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProgramQuery({
 *   variables: {
 *      programId: // value for 'programId'
 *   },
 * });
 */
export function useProgramQuery(baseOptions?: Apollo.QueryHookOptions<ProgramQuery, ProgramQueryVariables>) {
        return Apollo.useQuery<ProgramQuery, ProgramQueryVariables>(ProgramDocument, baseOptions);
      }
export function useProgramLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProgramQuery, ProgramQueryVariables>) {
          return Apollo.useLazyQuery<ProgramQuery, ProgramQueryVariables>(ProgramDocument, baseOptions);
        }
export type ProgramQueryHookResult = ReturnType<typeof useProgramQuery>;
export type ProgramLazyQueryHookResult = ReturnType<typeof useProgramLazyQuery>;
export type ProgramQueryResult = Apollo.QueryResult<ProgramQuery, ProgramQueryVariables>;
export const ProgramsDocument = Apollo.gql`
    query programs($limit: Int!, $cursor: String) {
  programs(limit: $limit, cursor: $cursor) {
    hasMore
    programs {
      id
      authorId
      title
      description
      duration
      language
      level
      createdAt
      updatedAt
      upVotes {
        userId
        value
      }
      chapters {
        title
        description
        questions {
          question
          correctAnswer
          codeSample
          options {
            a
            b
            c
            d
          }
        }
      }
    }
  }
}
    `;

/**
 * __useProgramsQuery__
 *
 * To run a query within a React component, call `useProgramsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProgramsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProgramsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useProgramsQuery(baseOptions?: Apollo.QueryHookOptions<ProgramsQuery, ProgramsQueryVariables>) {
        return Apollo.useQuery<ProgramsQuery, ProgramsQueryVariables>(ProgramsDocument, baseOptions);
      }
export function useProgramsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProgramsQuery, ProgramsQueryVariables>) {
          return Apollo.useLazyQuery<ProgramsQuery, ProgramsQueryVariables>(ProgramsDocument, baseOptions);
        }
export type ProgramsQueryHookResult = ReturnType<typeof useProgramsQuery>;
export type ProgramsLazyQueryHookResult = ReturnType<typeof useProgramsLazyQuery>;
export type ProgramsQueryResult = Apollo.QueryResult<ProgramsQuery, ProgramsQueryVariables>;
export const ChangePasswordDocument = Apollo.gql`
    mutation ChangePassword($data: ChangePasswordInput!) {
  changePassword(data: $data) {
    id
    firstName
    lastName
    email
    name
  }
}
    `;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, baseOptions);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const ConfirmUserDocument = Apollo.gql`
    mutation confirmUser($token: String!) {
  confirmUser(token: $token)
}
    `;
export type ConfirmUserMutationFn = Apollo.MutationFunction<ConfirmUserMutation, ConfirmUserMutationVariables>;

/**
 * __useConfirmUserMutation__
 *
 * To run a mutation, you first call `useConfirmUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmUserMutation, { data, loading, error }] = useConfirmUserMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useConfirmUserMutation(baseOptions?: Apollo.MutationHookOptions<ConfirmUserMutation, ConfirmUserMutationVariables>) {
        return Apollo.useMutation<ConfirmUserMutation, ConfirmUserMutationVariables>(ConfirmUserDocument, baseOptions);
      }
export type ConfirmUserMutationHookResult = ReturnType<typeof useConfirmUserMutation>;
export type ConfirmUserMutationResult = Apollo.MutationResult<ConfirmUserMutation>;
export type ConfirmUserMutationOptions = Apollo.BaseMutationOptions<ConfirmUserMutation, ConfirmUserMutationVariables>;
export const ForgotPasswordDocument = Apollo.gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, baseOptions);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const LoginDocument = Apollo.gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    id
    firstName
    lastName
    email
    name
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = Apollo.gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = Apollo.gql`
    mutation Register($data: RegisterInput!) {
  register(data: $data) {
    id
    firstName
    lastName
    email
    name
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const MeDocument = Apollo.gql`
    query me {
  me {
    id
    name
    email
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;