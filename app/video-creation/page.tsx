import { Metadata } from 'next'
import VideoCreationInterface from '@/components/video-creation/VideoCreationInterface'

export const metadata: Metadata = {
  title: 'AI Video Creation | AEON',
  description: 'Create AI-powered videos from text, images, or existing footage',
}

export default function VideoCreationPage() {
  return (
    <main className="min-h-screen bg-black">
      <VideoCreationInterface />
    </main>
  )
}
