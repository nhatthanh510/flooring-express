import {defineQuery} from 'next-sanity'

export const PRODUCTS_QUERY = defineQuery(
  `*[_type == "product" && defined(slug.current)]|order(_createdAt desc){
    _id,
    title,
    category,
    excerpt,
    "slug": slug.current,
    image
  }`,
)

export const PRODUCT_QUERY = defineQuery(
  `*[_type == "product" && slug.current == $slug][0]{
    _id,
    title,
    category,
    excerpt,
    image,
    body
  }`,
)

export const FEATURED_PROJECTS_QUERY = defineQuery(
  `*[_type == "project" && featured == true && defined(coverImage)]|order(_createdAt desc){
    _id,
    title,
    suburb,
    category,
    summary,
    "slug": slug.current,
    coverImage
  }`,
)
