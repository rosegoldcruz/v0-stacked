import { Metadata } from 'next'
import ModelExplorer from '../../components/replicate-clone/ModelExplorer'

export const metadata: Metadata = {
  title: 'AI Models Explorer | AEON',
  description: 'Access hundreds of AI models for image, video, audio generation and more',
}

export default function ModelsPage() {
  return <ModelExplorer />
}
