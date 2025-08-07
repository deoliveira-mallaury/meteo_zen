import { supabase } from "@/lib/supabase/client";
import bcrypt from "bcryptjs";

export async function POST(request) {
  const body = await request.json();
  const { email, password, city, zip, pseudo } = body;
  if (!pseudo || !email || !password) {
    return new Response(
      JSON.stringify({
        error: "Les champs nom, prénom, email et mot de passe sont requis.",
      }),
      { status: 400 }
    );
  }
  const { data, error } = await supabase.auth.signUp({
    email,
    password, // ✅ Clé attendue par Supabase
    options: {
      data: {
        city,
        zip,
        pseudo,
      },
    },
  });

  console.log("Reçu par signup:", email, "[mot de passe caché]");

  if (error) {
    console.log("Erreur d'inscription :", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
  const userId = data.user?.id;

  if (!userId) {
    console.error("ID utilisateur manquant !");
    return new Response(JSON.stringify({ error: "ID utilisateur manquant." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  // 👉 Étape 2 : enregistrer un profil personnalisé dans ta table usersCustom
  const hashedPwd = await bcrypt.hash(password, 13); // tu peux conserver ça pour stocker le hash manuellement

  const { error: insertError } = await supabase.from("profils").insert([
    {
      id: userId,
      email,
      password: hashedPwd,
      city,
      zip,
      pseudo 
    },
  ]);

  if (insertError) {
    console.error(
      "Erreur lors de l'insertion dans profils :",
      insertError.message
    );
    return new Response(JSON.stringify({ error: insertError.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return new Response(JSON.stringify(data[0]), {
    status: 201,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
