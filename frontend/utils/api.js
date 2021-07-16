import { gql } from "@apollo/client";

export const getCategoriesQuery = gql`
  query Categories {
    categories {
      id
      slug
      name
      subcategories {
        id
        slug
        name
      }
    }
  }
`;

export const getCategoryQuery = gql`
  query Category($slug: String!, $sort: String) {
    categories(where: { slug: $slug }) {
      id
      name
      slug
      products(sort: $sort) {
        id
        title
        description
        price
        image {
          id
          name
          alternativeText
          caption
          width
          height
          formats
          hash
          ext
          mime
          size
          url
          previewUrl
          provider
          provider_metadata
        }
        slug
        status
      }
      subcategories {
        id
        name
        slug
      }
    }
  }
`;

export const getSubCategoryQuery = gql`
  query SubCategory($slug: String!, $sort: String) {
    subcategories(where: { slug: $slug }) {
      id
      name
      slug
      products(sort: $sort) {
        id
        title
        description
        price
        image {
          id
          name
          alternativeText
          caption
          width
          height
          formats
          hash
          ext
          mime
          size
          url
          previewUrl
          provider
          provider_metadata
        }
        slug
        status
      }
    }
  }
`;

export const getProductsQuery = gql`
  query Products($sort: String, $limit: Int) {
    products(sort: $sort, limit: $limit) {
      id
      title
      description
      price
      image {
        id
        name
        alternativeText
        caption
        width
        height
        formats
        hash
        ext
        mime
        size
        url
        previewUrl
        provider
        provider_metadata
      }
      slug
      status
    }
  }
`;

export const getProductQuery = gql`
  query Product($slug: String!) {
    products(where: { slug: $slug }) {
      id
      title
      description
      price
      image {
        id
        name
        alternativeText
        caption
        width
        height
        formats
        hash
        ext
        mime
        size
        url
        previewUrl
        provider
        provider_metadata
      }
      slug
      status
    }
  }
`;
