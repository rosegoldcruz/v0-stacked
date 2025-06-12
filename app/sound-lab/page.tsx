import { Metadata } from 'next'
import SoundLabInterface from '@/components/sound-lab/SoundLabInterface'

export const metadata: Metadata = {
  title: 'Sound Lab - AEON',
  description: 'Create music, sound effects, and voices with advanced AI audio generation',
}

export default function SoundLabPage() {
  return <SoundLabInterface />
}
