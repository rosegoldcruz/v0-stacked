import { Metadata } from 'next'
import VisualCreatorInterface from '@/components/visual-creator/VisualCreatorInterface'

export const metadata: Metadata = {
  title: 'Visual Creator - AEON',
  description: 'Generate stunning visuals and artwork with advanced AI models',
}

export default function VisualCreatorPage() {
  return <VisualCreatorInterface />
}
