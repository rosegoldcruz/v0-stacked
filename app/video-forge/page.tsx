import { Metadata } from 'next'
import AEONVideoInterface from '@/components/aeon-video/AEONVideoInterface'

export const metadata: Metadata = {
  title: 'Video Forge - AEON',
  description: 'Transform scripts into professional videos with AI narration and visuals',
}

export default function VideoForgePage() {
  return <AEONVideoInterface />
}
