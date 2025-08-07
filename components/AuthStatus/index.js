import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function AuthStatus() {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };
    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => setSession(session)
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Erreur de connexion :", error.message);
    } else {
      console.log("Connecté avec succès !");
    }
  };

  return (
    <div>
      {session ? (
        <p>Connecté en tant que {session.user.email}</p>
      ) : (
        <>
          <p>Non connecté</p>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Se connecter</button>
        </>
      )}
    </div>
  );
}
