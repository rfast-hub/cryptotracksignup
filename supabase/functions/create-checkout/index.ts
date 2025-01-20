import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { Stripe } from 'https://esm.sh/stripe@13.6.0'
import { corsHeaders } from '../_shared/cors.ts'

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

    // Check if user exists
    const { data: existingUser } = await supabaseAdmin.auth.admin.listUsers();
    const userExists = existingUser.users.some(user => user.email === email);

    let userId;
    
    if (userExists) {
      // Get existing user's ID
      const user = existingUser.users.find(user => user.email === email);
      userId = user?.id;
    } else {
      // Create new user without auto-confirming email
      const { data: userData, error: userError } = await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        // Remove email_confirm: true to enable email verification
        user_metadata: {
          subscription_status: 'pending'
        }
      });

      if (userError) throw userError;
      userId = userData.user.id;
    }

    if (!userId) {
      throw new Error("Failed to get user ID");
    }

    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2023-10-16',
      httpClient: Stripe.createFetchHttpClient()
    });

    // Create Stripe checkout session with the new price ID
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price: 'price_1QTsN0E4gc3VY6FiyEmpK5eh',
        quantity: 1,
      }],
      mode: 'subscription',
      success_url: `${req.headers.get('origin')}/confirmation`,
      cancel_url: `${req.headers.get('origin')}/signup`,
      customer_email: email,
      metadata: {
        user_id: userId
      }
    });

    return new Response(
      JSON.stringify({ url: session.url }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})