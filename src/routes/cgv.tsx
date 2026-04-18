import { createFileRoute } from '@tanstack/react-router'
import CGV from '../components/CGV'

export const Route = createFileRoute('/cgv')({
  component: CGV,
})
