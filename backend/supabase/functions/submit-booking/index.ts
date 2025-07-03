import { serve } from "https://deno.land/std@0.203.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const supabase = createClient(
    Deno.env.get("PROJECT_URL")!,
    Deno.env.get("ANON_KEY")!
  );

  const body = await req.json();
  const { name, email, phone, website_type, budget, deadline, details } = body;

  const { error } = await supabase.from("project_bookings").insert([
    { name, email, phone, website_type, budget, deadline, details },
  ]);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 });
});
