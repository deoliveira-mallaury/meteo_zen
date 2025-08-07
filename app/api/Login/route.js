import { supabase } from "@/lib/supabase/client";
import bcrypt from "bcryptjs";
export async function POST(request) {
  const { email, password } = await request.json();
  // console.log("Session côté serveur ?", request.headers.get("cookie"));
  // console.log(email, password);

  const { data, error } = await supabase
    .from("profils")
    .select("*")
    .eq("email", email)
    .single();

  if (error || !data) {
    return new Response(JSON.stringify({ error: "Utilisateur introuvable" }), {
      status: 404,
    });
  }

  const match = await bcrypt.compare(password, data.password);

  if (!match) {
    return new Response(JSON.stringify({ error: "Mot de passe incorrect" }), {
      status: 401,
    });
  }

  return new Response(
    JSON.stringify({
      message: "Connexion réussie",
      user: session?.user,
    }),
    { status: 200 }
  );
}
export async function GET(request) {
  try {
    await supabase.auth.signOut();

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
