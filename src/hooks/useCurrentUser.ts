import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface CurrentUser {
  id: string;
  email: string;
  nome: string;
  role: "admin" | "usuario";
}

export function useCurrentUser() {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        setUser(null);
        setLoading(false);
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("nome")
        .eq("id", session.user.id)
        .single();

      const { data: roleData } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .single();

      setUser({
        id: session.user.id,
        email: session.user.email || "",
        nome: profile?.nome || session.user.email || "",
        role: (roleData?.role as "admin" | "usuario") || "usuario",
      });
      setLoading(false);
    };

    fetchUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      fetchUser();
    });

    return () => subscription.unsubscribe();
  }, []);

  return { user, loading };
}
