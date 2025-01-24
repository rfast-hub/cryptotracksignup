import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    const { email, password } = await req.json()

    // Create new user with email confirmation enabled
    const { data: userData, error: userError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        subscription_status: 'trialing'
      }
    });

    if (userError) throw userError;

    // Send welcome email using Resend
    console.log('Sending welcome email to:', email);
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'CryptoTrack <onboarding@resend.dev>',
        to: [email],
        subject: 'Welcome to CryptoTrack - Account Created Successfully',
        html: `
          <h1>Welcome to CryptoTrack!</h1>
          <p>Your account has been successfully created and your 7-day free trial has started.</p>
          <p>You can now log in to your account at <a href="https://app.cryptotrack.org">app.cryptotrack.org</a></p>
          <p>If you have any questions, please don't hesitate to reach out to our support team.</p>
        `
      }),
    });

    if (!res.ok) {
      console.error('Error sending welcome email:', await res.text());
    } else {
      console.log('Welcome email sent successfully');
    }

    return new Response(
      JSON.stringify({ success: true }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})