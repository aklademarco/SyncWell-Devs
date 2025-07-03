// submit-booking/index.ts
import { serve } from "https://deno.land/std@0.203.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Setup Supabase client directly
const supabase = createClient(
  "https://YOUR_PROJECT.supabase.co",
  "YOUR_PUBLIC_ANON_KEY"
);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // replace with specific origin in production
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
  "Content-Type": "application/json",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
      status: 405,
      headers: corsHeaders,
    });
  }

  try {
    const body = await req.json();
    const { name, email, phone, website_type, budget, deadline, details } =
      body;

    const { error } = await supabase
      .from("project_bookings")
      .insert([
        { name, email, phone, website_type, budget, deadline, details },
      ]);

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: corsHeaders,
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (err) {
    console.error("Booking error:", err);
    return new Response(
      JSON.stringify({ error: "Server error. Try again later." }),
      { status: 500, headers: corsHeaders }
    );
  }
});
