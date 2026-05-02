import { createFileRoute } from '@tanstack/react-router'
import ZonesIntervention from '../components/ZonesIntervention'

export const Route = createFileRoute('/zones-intervention')({
  component: ZonesIntervention,
})
