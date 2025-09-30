import natural from 'natural'

// Initialize the classifier
const classifier = new natural.BayesClassifier()

// Hazard-related keywords for different types
const hazardKeywords = {
  TSUNAMI: [
    'tsunami', 'tidal wave', 'seismic wave', 'earthquake', 'seaquake',
    'ocean wave', 'giant wave', 'wall of water', 'flooding', 'evacuation'
  ],
  STORM_SURGE: [
    'storm surge', 'cyclone', 'hurricane', 'typhoon', 'storm', 'wind',
    'high wind', 'gale', 'tempest', 'squall', 'stormy weather'
  ],
  HIGH_WAVES: [
    'high waves', 'big waves', 'rough sea', 'choppy', 'swell', 'surf',
    'wave height', 'breaking waves', 'whitecaps', 'stormy sea'
  ],
  FLOODING: [
    'flooding', 'flood', 'inundation', 'water level', 'rising water',
    'submerged', 'underwater', 'waterlogged', 'deluge', 'overflow'
  ],
  COASTAL_DAMAGE: [
    'coastal damage', 'erosion', 'beach erosion', 'shoreline', 'coastline',
    'damaged', 'destruction', 'debris', 'wreckage', 'collapsed'
  ],
  ABNORMAL_TIDE: [
    'abnormal tide', 'unusual tide', 'tide level', 'high tide', 'low tide',
    'tidal', 'tide change', 'water level', 'sea level'
  ]
}

// Sentiment keywords
const sentimentKeywords = {
  URGENT: ['urgent', 'emergency', 'immediate', 'critical', 'danger', 'warning', 'alert'],
  NEGATIVE: ['bad', 'terrible', 'awful', 'disaster', 'damage', 'destruction', 'fear'],
  POSITIVE: ['good', 'safe', 'calm', 'normal', 'stable', 'recovered'],
  NEUTRAL: ['observed', 'noticed', 'seen', 'reported', 'situation', 'condition']
}

// Initialize the classifier with training data
export function initializeNLP() {
  // Train classifier with hazard keywords
  Object.entries(hazardKeywords).forEach(([hazardType, keywords]) => {
    keywords.forEach(keyword => {
      classifier.addDocument(keyword, hazardType)
    })
  })

  // Train with some sample phrases
  const samplePhrases = [
    'tsunami warning issued for coastal areas',
    'high waves observed at the beach',
    'storm surge causing flooding in low lying areas',
    'abnormal tide levels detected',
    'coastal erosion due to strong waves',
    'flooding reported in coastal regions',
    'rough sea conditions with high waves',
    'cyclone approaching causing storm surge'
  ]

  samplePhrases.forEach(phrase => {
    const words = phrase.toLowerCase().split(' ')
    words.forEach(word => {
      if (word.length > 2) {
        classifier.addDocument(word, 'RELEVANT')
      }
    })
  })

  classifier.train()
}

// Classify text for hazard type
export function classifyHazardType(text: string): { type: string; confidence: number } {
  const classification = classifier.getClassifications(text.toLowerCase())
  const topClassification = classification[0]
  
  return {
    type: topClassification.label,
    confidence: topClassification.value
  }
}

// Determine if text is relevant to ocean hazards
export function isRelevantToHazards(text: string): { isRelevant: boolean; confidence: number } {
  const lowerText = text.toLowerCase()
  
  // Check for hazard-related keywords
  const hasHazardKeywords = Object.values(hazardKeywords).some(keywords =>
    keywords.some(keyword => lowerText.includes(keyword))
  )

  // Check for ocean/coastal related terms
  const oceanTerms = ['ocean', 'sea', 'coast', 'beach', 'shore', 'marine', 'coastal', 'tide', 'wave']
  const hasOceanTerms = oceanTerms.some(term => lowerText.includes(term))

  // Check for emergency/weather terms
  const emergencyTerms = ['warning', 'alert', 'emergency', 'disaster', 'flood', 'storm', 'weather']
  const hasEmergencyTerms = emergencyTerms.some(term => lowerText.includes(term))

  const isRelevant = hasHazardKeywords || (hasOceanTerms && hasEmergencyTerms)
  const confidence = isRelevant ? 0.8 : 0.2

  return { isRelevant, confidence }
}

// Analyze sentiment
export function analyzeSentiment(text: string): { sentiment: string; confidence: number } {
  const lowerText = text.toLowerCase()
  
  for (const [sentiment, keywords] of Object.entries(sentimentKeywords)) {
    const keywordCount = keywords.filter(keyword => lowerText.includes(keyword)).length
    if (keywordCount > 0) {
      return {
        sentiment,
        confidence: Math.min(keywordCount * 0.3, 1.0)
      }
    }
  }

  return { sentiment: 'NEUTRAL', confidence: 0.5 }
}

// Extract location information from text (basic implementation)
export function extractLocation(text: string): string | null {
  const locationPatterns = [
    /(?:at|in|near|around)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/g,
    /([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s+(?:beach|coast|shore|port|harbor)/gi
  ]

  for (const pattern of locationPatterns) {
    const matches = text.match(pattern)
    if (matches && matches.length > 0) {
      return matches[0].replace(/(?:at|in|near|around)\s+/i, '').trim()
    }
  }

  return null
}

// Process social media post
export function processSocialMediaPost(post: {
  content: string
  platform: string
  author: string
  location?: string
}): {
  hazardType: string | null
  isRelevant: boolean
  sentiment: string
  confidence: number
  extractedLocation: string | null
} {
  const { content } = post
  
  // Check if relevant
  const relevance = isRelevantToHazards(content)
  if (!relevance.isRelevant) {
    return {
      hazardType: null,
      isRelevant: false,
      sentiment: 'NEUTRAL',
      confidence: 0.1,
      extractedLocation: null
    }
  }

  // Classify hazard type
  const hazardClassification = classifyHazardType(content)
  
  // Analyze sentiment
  const sentimentAnalysis = analyzeSentiment(content)
  
  // Extract location
  const extractedLocation = extractLocation(content)

  return {
    hazardType: hazardClassification.confidence > 0.3 ? hazardClassification.type : null,
    isRelevant: true,
    sentiment: sentimentAnalysis.sentiment,
    confidence: relevance.confidence,
    extractedLocation
  }
}

// Initialize NLP when module is imported
initializeNLP()
