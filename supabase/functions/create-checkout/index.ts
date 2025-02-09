
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@13.6.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Basic email validation
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Password strength validation
const isValidPassword = (password: string): boolean => {
  return password.length >= 8
}

serve(async (req) => {
  // Validate request method
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 405,
      }
    )
  }

  try {
    // Validate content type
    const contentType = req.headers.get('content-type')
    if (!contentType?.includes('application/json')) {
      throw new Error('Invalid content type. Expected application/json')
    }

    const { email, password } = await req.json()

    // Validate required fields
    if (!email || !password) {
      throw new Error('Email and password are required')
    }

    // Validate email format
    if (!isValidEmail(email)) {
      throw new Error('Invalid email format')
    }

    // Validate password strength
    if (!isValidPassword(password)) {
      throw new Error('Password must be at least 8 characters long')
    }

    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2023-10-16',
      httpClient: Stripe.createFetchHttpClient()
    })

    const price_id = "price_1QkCmhE4gc3VY6FiNxzBILTt"

    // Get the full URL of the site with fallback
    const origin = req.headers.get('origin')
    console.log('Received origin:', origin)

    // For development and testing, if no origin is present, use a default
    const effectiveOrigin = origin || 'https://cryptotracksignup.netlify.app'
    console.log('Effective origin:', effectiveOrigin)
    
    // Allow any subdomain of cryptotrack.org and Netlify preview URLs
    const allowedOrigins = [
      'https://cryptotracksignup.netlify.app',
      'http://localhost:3000',
      'http://localhost:5173',
      '.cryptotrack.org',
      '.netlify.app'
    ]

    // Check if origin matches any allowed patterns
    const isAllowedOrigin = !origin || allowedOrigins.some(allowed => {
      if (allowed.startsWith('.')) {
        // For domain patterns like .cryptotrack.org
        return effectiveOrigin.endsWith(allowed)
      }
      return effectiveOrigin === allowed
    })

    if (!isAllowedOrigin) {
      console.error('Invalid origin:', effectiveOrigin)
      throw new Error(`Invalid origin: ${effectiveOrigin}`)
    }

    console.log('Creating payment session...')
    const session = await stripe.checkout.sessions.create({
      customer_email: email,
      line_items: [
        {
          price: price_id,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      subscription_data: {
        trial_period_days: 7
      },
      success_url: `${effectiveOrigin}/confirmation?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
      cancel_url: `${effectiveOrigin}/signup`,
      metadata: {
        email,
        password: '[REDACTED]', // Don't log actual password in metadata
      }
    })

    console.log('Payment session created:', session.id)
    return new Response(
      JSON.stringify({ url: session.url }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json',
          'X-Content-Type-Options': 'nosniff',
          'X-Frame-Options': 'DENY',
          'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'
        },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ 
        error: 'An error occurred processing your request',
        details: error.message 
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json',
          'X-Content-Type-Options': 'nosniff',
          'X-Frame-Options': 'DENY',
        },
        status: error.status || 500,
      }
    )
  }
})
