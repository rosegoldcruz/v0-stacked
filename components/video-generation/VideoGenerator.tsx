'use client'

import { useState } from 'react'
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useSubscription } from '@/hooks/useSubscription'
import { SUBSCRIPTION_TIERS } from '@/lib/subscription-tiers'

export default function VideoGenerator() {
  const { tier } = useSubscription()
  const [duration, setDuration] = useState(5)
  
  const tierKey = tier.toUpperCase() as keyof typeof SUBSCRIPTION_TIERS
  const maxDuration = SUBSCRIPTION_TIERS[tierKey].features.videoLength
  const hasStudioAccess = SUBSCRIPTION_TIERS[tierKey].features.aeonStudio

  return (
    <div className="space-y-6">
      {/* Duration Selector */}
      <div>
        <label className="text-sm text-gray-400">Video Duration</label>
        {tier === 'free' || tier === 'starter' ? (
          <Alert className="mt-2 bg-orange-900/20 border-orange-800">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {tier === 'free' ? 'Free tier' : 'Starter tier'} limited to {maxDuration} second clips.
              Upgrade to Pro for 1-minute videos or Ultimate for unlimited length.
            </AlertDescription>
          </Alert>
        ) : null}
        
        <div className="mt-2 flex items-center gap-4">
          <input
            type="range"
            min="5"
            max={maxDuration === -1 ? 300 : maxDuration}
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="flex-1"
          />
          <span className="text-white font-medium">{duration}s</span>
        </div>
      </div>

      {!hasStudioAccess && (
        <Alert className="bg-purple-900/20 border-purple-800">
          <AlertDescription>
            <strong>Want AI-powered editing?</strong> Upgrade to Pro ($50/mo) to access AEON Studio 
            with AI transitions, sound effects, and CapCut-style editing features.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
