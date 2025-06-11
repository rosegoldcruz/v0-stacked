import { Metadata } from 'next'
import ImageGenerationInterface from '../../components/ai-tools/ImageGenerationInterface'

export const metadata: Metadata = {
  title: 'AI Image Generation | AEON',
  description: 'Create stunning AI-powered images with AEON\'s advanced image generation tools',
}

export default function AIImageGenerationPage() {
  return (
    <main className="min-h-screen bg-black">
      <ImageGenerationInterface />
    </main>
  )
}
