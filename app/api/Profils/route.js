import { supabase } from "@/lib/supabase/client";
import bcrypt from "bcryptjs";
export async function GET() {
  const { data, error } = await supabase.from("profils").select("*");
  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
  return Response.json(data);
}

export async function POST(request) {
  const body = await request.json();
  const { name, email, password, lastname, city, zip } = body;
  console.log(name, email, password, lastname, city, zip);
  // Vérification des champs requis
  if (!name || !lastname || !email || !password) {
    return new Response(
      JSON.stringify({
        error: "Les champs nom, prénom, email et mot de passe sont requis.",
      }),
      { status: 400 }
    );
  }
  const hashedPassword = await bcrypt.hash(password, 13);
  const { data, error } = await supabase
    .from("profils")
    .insert([{ name, email, password: hashedPassword, lastname, city, zip }])
    .select("*");

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
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
