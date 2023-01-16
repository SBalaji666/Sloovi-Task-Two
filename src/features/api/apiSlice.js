import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, COMPANY_ID, ACCESS_TOKEN } from '../../constants/consts';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      headers.set('Authorization', `Bearer ${ACCESS_TOKEN}`);
      headers.set('Accept', 'application/json');
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Task'],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => ({
        url: `?company_id=${COMPANY_ID}`,
        method: 'GET',
      }),
      providesTags: ({ results }, error, arg) => [
        { type: 'Task', id: 'LIST' },
        ...results.map(({ id }) => ({ type: 'Task', id })),
      ],
    }),

    addTodos: builder.mutation({
      query: (todo) => {
        return {
          url: `?company_id=${COMPANY_ID}`,
          method: 'POST',
          body: todo,
        };
      },
      invalidatesTags: [{ type: 'Task', id: 'LIST' }],
    }),

    updateTodo: builder.mutation({
      query: ({ id, task }) => {
        return {
          url: `/${id}?company_id=${COMPANY_ID}`,
          method: 'PUT',
          body: task,
        };
      },
      invalidatesTags: [{ type: 'Task', id: 'LIST' }],
    }),

    deleteTodo: builder.mutation({
      query: ({ id }) => ({
        url: `/${id}?company_id=${COMPANY_ID}`,
        method: 'DELETE',
        body: {},
      }),
      invalidatesTags: [{ type: 'Task', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodosMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} = apiSlice;
