import { Link, useLocation, useNavigate } from "react-router-dom";
import { Users, ClipboardCheck, BarChart3, Settings, FileText, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { getUsuarioLogado, logout } from "@/data/store";

const NAV_ITEMS = [
  { to: "/", label: "Líderes", icon: Users },
  { to: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { to: "/competencias", label: "Competências", icon: Settings },
  { to: "/pdi", label: "PDI", icon: FileText },
];

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
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-card shadow-sm">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <ClipboardCheck className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold leading-tight">Calibração Adimax</h1>
              <p className="text-xs text-muted-foreground">Mapeamento de Liderança</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <nav className="flex gap-1">
              {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    pathname === to || (to !== "/" && pathname.startsWith(to))
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{label}</span>
                </Link>
              ))}
            </nav>
            {usuario && (
              <div className="flex items-center gap-2 border-l pl-3">
                <span className="hidden text-sm text-muted-foreground sm:inline">{usuario.nome}</span>
                <Button variant="ghost" size="icon" onClick={handleLogout} title="Sair">
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
