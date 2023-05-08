import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: [
    "User",
    "Products",
    "Customers",
    "Transactions",
    "Sales",
    "Admins",
    "Performance",
  ],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `general/user/${id}`,
      providesTags: ["User"],
    }),
    deleteUser: build.mutation({
      query: ({id}) => ({
        url: `general/user/${id}`,
        method: "DELETE",
        body: id
      }),
      invalidatesTags: ["Customers"],
    }),
    updateData: build.mutation({
      query: ({ id, name, email,phoneNumber , occupation,role }) => ({
        url: `general/user/${id}`,
        method: 'PUT',
        body: { id, name, email,phoneNumber,occupation,role },
      }),
      invalidatesTags: ["Customers"],
    }),
     createUser: build.mutation({
        query: (data) => ({
          url: '/general',
          method: 'POST',
          body: data,
        }),invalidatesTags: ["Customers"],
      }),
      
    getProducts: build.query({
      query: () => "client/products",
      providesTags: ["Products"],
    }),
    getCustomers: build.query({
      query: () => "client/customers",
      providesTags: ["Customers"],
    }),
    getTransactions: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "client/transactions",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["Transactions"],
    }),
    getSales: build.query({
      query: () => "sales/sales",
      providesTags: ["Sales"],
    }),
    getAdmins: build.query({
      query: () => "management/admins",
      providesTags: ["Admins"],
    }),
    getUserPerformance: build.query({
      query: (id) => `management/performance/${id}`,
      providesTags: ["Performance"],
    }),
    getDashboard: build.query({
      query: () => "general/dashboard",
      providesTags: ["Dashboard"],
    }),
    
    
  }),
});

export const {
  useGetUserQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetTransactionsQuery,
  useGetSalesQuery,
  useGetAdminsQuery,
  useGetUserPerformanceQuery,
  useGetDashboardQuery,
  useDeleteUserMutation,
  useUpdateDataMutation,
  useCreateUserMutation
} = api;