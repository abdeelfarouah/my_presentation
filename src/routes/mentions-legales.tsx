import { createFileRoute } from '@tanstack/react-router'
import MentionsLegales from '../components/MentionsLegales'

export const Route = createFileRoute('/mentions-legales')({
  component: MentionsLegales,
})
