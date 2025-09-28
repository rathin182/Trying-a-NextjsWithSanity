import { createClient } from '@sanity/client'
import { apiVersion, dataset, projectId } from '../env'   // adjust path if needed

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  token: process.env.SANITY_TOKEN
})
