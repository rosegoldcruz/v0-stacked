import { Metadata } from 'next'
import VideoForgePage from '@/components/video-forge/VideoForgePage'

export const metadata: Metadata = {
  title: 'Video Forge - AEON',
  description: 'Transform scripts into professional videos with AI narration and visuals',
}

export default function VideoForge() {
  return <VideoForgePage />
}
