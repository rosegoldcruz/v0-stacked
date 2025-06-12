import { Metadata } from 'next'
import VideoForgeInterface from '@/components/video-forge/VideoForgeInterface'

export const metadata: Metadata = {
  title: 'Video Forge - AEON',
  description: 'Transform scripts into professional videos with AI narration and visuals',
}

export default function VideoForgePage() {
  return <VideoForgeInterface />
}
