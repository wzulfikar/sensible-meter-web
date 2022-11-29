import gql from 'graphql-tag'
import { useSubscription } from '@apollo/client'

const query = gql`
subscription ($sensor_id: String!, $limit: Int) {
  result: csproject_co2_reading(
    where: { sensor_id: { _eq: $sensor_id } }
    order_by: { id: desc }
    limit: $limit
  ) {
    id
    sensor_id
    value
    created_at
    session_id
  }
}`

type Vars = {
  sensor_id: string
  limit: number
}

export const useSensorReading = (variables: Vars) => {
  return useSubscription(query, { variables })
}
