import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import dpaLogo from "@/assets/DPA.png";
import adimaxLogo from "@/assets/Adimax.png";
import { toast } from "@/hooks/use-toast";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password: senha,
      });

      if (error) {
        setErro("E-mail ou senha inválidos.");
        setLoading(false);
        return;
      }

      if (data.user) {
        // Get user name from profile
        const { data: profile } = await supabase
          .from("profiles")
          .select("nome")
          .eq("id", data.user.id)
          .single();

        const nome = profile?.nome || data.user.email || "Usuário";
        toast({ title: `Bem-vindo, ${nome}!` });
        navigate("/");
      }
    } catch {
      setErro("Erro ao conectar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4"
      style={{
        background: "linear-gradient(135deg, hsl(33 100% 97%) 0%, hsl(0 0% 98%) 50%, hsl(33 100% 95%) 100%)"
      }}
    >
      <Card className="w-full max-w-md shadow-xl rounded-2xl border-0 overflow-hidden">
        {/* Orange accent strip */}
        <div className="h-1 w-full bg-primary" />

        <CardHeader className="text-center space-y-4 pt-10 pb-2">
          <img src={dpaLogo} alt="DPA - Desenvolvimento Profissional Adimax" className="mx-auto h-20 w-auto drop-shadow-sm" />
          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold tracking-tight">Calibração Adimax</CardTitle>
            <p className="text-sm text-muted-foreground font-medium">Mapeamento de Liderança</p>
          </div>
        </CardHeader>

        <CardContent className="px-8 pb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="seu.email@adimax.com.br"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-9 h-11 focus:border-primary focus:ring-primary"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="password"
                  placeholder="••••"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                  className="pl-9 h-11 focus:border-primary focus:ring-primary"
                />
              </div>
            </div>
            {erro && (
              <p className="text-sm text-destructive font-medium">{erro}</p>
            )}
            <Button type="submit" className="w-full gap-2 h-11 text-base font-semibold shadow-md hover:shadow-lg" size="lg" disabled={loading}>
              <LogIn className="h-4 w-4" /> {loading ? "Entrando..." : "Entrar"}
            </Button>
          </form>

          {/* Footer with Adimax logo */}
          <div className="mt-8 flex flex-col items-center gap-2 border-t pt-6">
            <img src={adimaxLogo} alt="Adimax" className="h-7 w-auto opacity-60" />
            <p className="text-xs text-muted-foreground">© 2026 Adimax · Powered by DPA</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
