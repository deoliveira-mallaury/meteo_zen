import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function AuthStatus() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) console.error("Erreur session :", error.message);
      setSession(data.session);
    };

    getSession();

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

  }, []);

  return session;
}
