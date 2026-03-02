import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { login } from "@/data/store";
import dpaLogo from "@/assets/DPA.png";
import adimaxLogo from "@/assets/Adimax.png";
import { toast } from "@/hooks/use-toast";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    const usuario = login(email, senha);
    if (usuario) {
      toast({ title: `Bem-vindo, ${usuario.nome}!` });
      navigate("/");
    } else {
      setErro("E-mail ou senha inválidos.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-3">
          <img src={dpaLogo} alt="DPA - Desenvolvimento Profissional Adimax" className="mx-auto h-16 w-auto" />
          <CardTitle className="text-2xl">Calibração Adimax</CardTitle>
          <p className="text-sm text-muted-foreground">Mapeamento de Liderança</p>
          <img src={adimaxLogo} alt="Adimax" className="mx-auto h-8 w-auto opacity-70" />
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">E-mail</label>
              <Input
                type="email"
                placeholder="seu.email@adimax.com.br"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Senha</label>
              <Input
                type="password"
                placeholder="••••"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
            </div>
            {erro && (
              <p className="text-sm text-destructive">{erro}</p>
            )}
            <Button type="submit" className="w-full gap-2" size="lg">
              <LogIn className="h-4 w-4" /> Entrar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
