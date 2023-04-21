import { useState, useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/lib/superbase";
import { useRouter } from "next/router";

export default function LoginScreen() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return (
      <div className="flex justify-center items-center">
        <div className="w-80">
          <Auth
            providers={[]}
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
          />
        </div>
      </div>
    );
  } else {
    useRouter().push("/");
  }
}
