import {createClient} from 'next-sanity'

import {apiVersion, dataset, projectId} from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // set to false for guaranteed-fresh reads (e.g. generateStaticParams)
})
