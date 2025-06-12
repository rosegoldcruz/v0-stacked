import { Metadata } from 'next'
import MassCreatorInterface from '@/components/mass-creator/MassCreatorInterface'

export const metadata: Metadata = {
  title: 'Mass Creator - AEON',
  description: 'Batch create hundreds of videos and content variations with AI',
}

export default function MassCreatorPage() {
  return <MassCreatorInterface />
}
