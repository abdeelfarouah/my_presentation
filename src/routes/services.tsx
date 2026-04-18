import { createFileRoute } from '@tanstack/react-router'
import Services from '../components/Services'

export const Route = createFileRoute('/services')({
  component: Services,
})
