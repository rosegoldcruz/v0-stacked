export const SUBSCRIPTION_TIERS = {
  FREE: {
    id: 'free',
    name: 'Free',
    price: 0,
    features: {
      replicateAccess: true,
      videoLength: 10, // seconds
      imageGeneration: true,
      modelsAccess: 'basic',
      aeonStudio: false,
      aiEditing: false,
      exports: 5, // per month
      watermark: true
    }
  },
  STARTER: {
    id: 'starter', 
    name: 'Starter',
    price: 25,
    features: {
      replicateAccess: true,
      videoLength: 10, // seconds
      imageGeneration: true,
      modelsAccess: 'all',
      aeonStudio: false,
      aiEditing: false,
      exports: 100,
      watermark: false,
      marketing: 'basic'
    }
  },
  PRO: {
    id: 'pro',
    name: 'Pro',
    price: 50,
    features: {
      replicateAccess: true,
      videoLength: 60, // 1 minute
      imageGeneration: true,
      modelsAccess: 'all',
      aeonStudio: true,
      aiEditing: true,
      exports: 500,
      watermark: false,
      marketing: 'advanced',
      transitions: true,
      soundEffects: true
    }
  },
  ULTIMATE: {
    id: 'ultimate',
    name: 'Ultimate',
    price: 100,
    features: {
      replicateAccess: true,
      videoLength: -1, // unlimited
      imageGeneration: true,
      modelsAccess: 'all',
      aeonStudio: true,
      aiEditing: true,
      exports: -1, // unlimited
      watermark: false,
      marketing: 'full',
      everything: true,
      priority: true,
      teamAccess: true
    }
  }
}
