import { Metadata } from 'next'
import CampaignHubInterface from '@/components/campaign-hub/CampaignHubInterface'

export const metadata: Metadata = {
  title: 'Campaign Hub - AEON',
  description: 'Manage multi-platform campaigns and analytics with AI insights',
}

export default function CampaignHubPage() {
  return <CampaignHubInterface />
}
