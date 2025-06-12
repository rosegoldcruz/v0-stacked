import { Metadata } from 'next'
import HumanStudioInterface from '@/components/human-studio/HumanStudioInterface'

export const metadata: Metadata = {
  title: 'Human Studio - AEON',
  description: 'Create realistic human avatars and characters with advanced AI',
}

export default function HumanStudioPage() {
  return <HumanStudioInterface />
}
