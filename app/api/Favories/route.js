import { supabase } from "@/lib/supabase/client";

// 🔍 GET : Récupère les favoris d’un utilisateur
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const user_id = searchParams.get("user_id");

  if (!user_id) {
    return new Response(JSON.stringify({ error: "user_id requis" }), {
      status: 400,
    });
  }

  const { data, error } = await supabase
    .from("favories")
    .select("*")
    .eq("user_id", user_id);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

// ⭐ POST : Ajoute un favori (limite 3 par utilisateur)
export async function POST(request) {
  const body = await request.json();
  const { city, zip, user_id } = body;

  if (!city || !zip || !user_id) {
    return new Response(
      JSON.stringify({ error: "Champs city, zip et user_id requis." }),
      { status: 400 }
    );
  }

  // Vérifie la limite
  const { data: existingFavs, error: fetchError } = await supabase
    .from("favories")
    .select("*")
    .eq("user_id", user_id);

  if (fetchError) {
    return new Response(JSON.stringify({ error: fetchError.message }), {
      status: 500,
    });
  }

  if (existingFavs.length >= 3) {
    return new Response(
      JSON.stringify({ error: "Limite de 3 favoris atteinte." }),
      { status: 403 }
    );
  }

  // Ajoute le favori
  const { data, error } = await supabase.from("favories").insert([
    {
      city,
      zip,
      user_id,
    },
  ]);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify(data[0]), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
