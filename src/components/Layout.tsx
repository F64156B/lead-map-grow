import { Link, useLocation, useNavigate } from "react-router-dom";
import { Users, BarChart3, Settings, FileText, LogOut, UserCog } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { getUsuarioLogado, logout } from "@/data/store";
import adimaxLogo from "@/assets/Adimax.png";

const NAV_ITEMS = [
  { to: "/", label: "Líderes", icon: Users },
  { to: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { to: "/competencias", label: "Competências", icon: Settings },
  { to: "/pdi", label: "PDI", icon: FileText },
  { to: "/usuarios", label: "Usuários", icon: UserCog },
];

function getInitials(nome: string): string {
  return nome.split(" ").filter(Boolean).slice(0, 2).map(w => w[0]).join("").toUpperCase();
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const usuario = getUsuarioLogado();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Orange top accent */}
      <div className="h-0.5 w-full bg-primary" />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur-sm shadow-sm">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={adimaxLogo} alt="Adimax" className="h-8 w-auto" />
            <div className="hidden sm:block">
              <h1 className="text-base font-bold leading-tight">Calibração</h1>
              <p className="text-[11px] text-muted-foreground">Mapeamento de Liderança</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <nav className="flex gap-1">
              {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  className={cn(
                    "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-all",
                    pathname === to || (to !== "/" && pathname.startsWith(to))
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{label}</span>
                </Link>
              ))}
            </nav>
            {usuario && (
              <div className="flex items-center gap-2 border-l pl-3 ml-1">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                  {getInitials(usuario.nome)}
                </div>
                <span className="hidden text-sm font-medium text-foreground lg:inline">{usuario.nome}</span>
                <Button variant="ghost" size="icon" onClick={handleLogout} title="Sair" className="h-8 w-8">
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>
      {/* Content */}
      <main className="container py-6">{children}</main>
    </div>
  );
}
