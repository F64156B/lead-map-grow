import { useState, useEffect, useCallback } from "react";
import { UserPlus, KeyRound, Trash2, Shield, User } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface UserInfo {
  id: string;
  nome: string;
  email: string;
  role: "admin" | "usuario";
}

export default function UsersPage() {
  const [usuarios, setUsuarios] = useState<UserInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  // Create user state
  const [showCreate, setShowCreate] = useState(false);
  const [novoNome, setNovoNome] = useState("");
  const [novoEmail, setNovoEmail] = useState("");
  const [novoSenha, setNovoSenha] = useState("");
  const [novoRole, setNovoRole] = useState<"admin" | "usuario">("usuario");

  // Reset password state
  const [resetUserId, setResetUserId] = useState<string | null>(null);
  const [resetUserName, setResetUserName] = useState("");
  const [resetUserEmail, setResetUserEmail] = useState("");
  const [novaSenha, setNovaSenha] = useState("");

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      setCurrentUserId(session.user.id);

      const { data, error } = await supabase.functions.invoke("manage-users", {
        body: { action: "list" },
      });

      if (error) {
        console.error("Error fetching users:", error);
        toast({ title: "Erro ao carregar usuários", variant: "destructive" });
        return;
      }

      setUsuarios(data.users || []);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleCreate = async () => {
    if (!novoNome.trim() || !novoEmail.trim() || !novoSenha) {
      toast({ title: "Preencha todos os campos", variant: "destructive" });
      return;
    }
    if (novoSenha.length < 4) {
      toast({ title: "Senha muito curta", description: "A senha deve ter no mínimo 4 caracteres.", variant: "destructive" });
      return;
    }

    const { data, error } = await supabase.functions.invoke("manage-users", {
      body: { action: "create", email: novoEmail.trim(), password: novoSenha, nome: novoNome.trim(), role: novoRole },
    });

    if (error || data?.error) {
      toast({ title: "Erro", description: data?.error || error?.message, variant: "destructive" });
      return;
    }

    toast({ title: "Usuário criado!", description: `Login: ${novoEmail.trim().toLowerCase()}` });
    setNovoNome(""); setNovoEmail(""); setNovoSenha(""); setNovoRole("usuario");
    setShowCreate(false);
    fetchUsers();
  };

  const handleResetPassword = async () => {
    if (!resetUserId || !novaSenha) return;
    if (novaSenha.length < 4) {
      toast({ title: "Erro", description: "A senha deve ter no mínimo 4 caracteres.", variant: "destructive" });
      return;
    }

    const { data, error } = await supabase.functions.invoke("manage-users", {
      body: { action: "reset-password", userId: resetUserId, newPassword: novaSenha },
    });

    if (error || data?.error) {
      toast({ title: "Erro", description: data?.error || error?.message, variant: "destructive" });
      return;
    }

    toast({ title: "Senha alterada!", description: `Senha de ${resetUserEmail} foi redefinida.` });
    setResetUserId(null);
    setResetUserName("");
    setResetUserEmail("");
    setNovaSenha("");
  };

  const handleDelete = async (userId: string, email: string) => {
    const { data, error } = await supabase.functions.invoke("manage-users", {
      body: { action: "delete", userId },
    });

    if (error || data?.error) {
      toast({ title: "Erro", description: data?.error || error?.message, variant: "destructive" });
      return;
    }

    toast({ title: "Usuário excluído", description: `${email} foi removido.` });
    fetchUsers();
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Usuários</h2>
            <p className="text-muted-foreground">Gerencie os acessos ao sistema</p>
          </div>

          {/* Create User Dialog */}
          <Dialog open={showCreate} onOpenChange={setShowCreate}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <UserPlus className="h-4 w-4" /> Novo Usuário
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Criar Novo Usuário</DialogTitle>
                <DialogDescription>Preencha os dados para criar um novo acesso.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nome</label>
                  <Input placeholder="Nome completo" value={novoNome} onChange={e => setNovoNome(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">E-mail</label>
                  <Input type="email" placeholder="email@adimax.com.br" value={novoEmail} onChange={e => setNovoEmail(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Senha</label>
                  <Input type="text" placeholder="Senha inicial (visível)" value={novoSenha} onChange={e => setNovoSenha(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Perfil</label>
                  <Select value={novoRole} onValueChange={(v: "admin" | "usuario") => setNovoRole(v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Administrador</SelectItem>
                      <SelectItem value="usuario">Usuário</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowCreate(false)}>Cancelar</Button>
                <Button onClick={handleCreate} className="gap-2"><UserPlus className="h-4 w-4" /> Criar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Users Table */}
        <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40">
                <TableHead>Nome</TableHead>
                <TableHead>E-mail</TableHead>
                <TableHead className="text-center">Perfil</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                    Carregando...
                  </TableCell>
                </TableRow>
              ) : usuarios.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                    Nenhum usuário cadastrado.
                  </TableCell>
                </TableRow>
              ) : (
                usuarios.map((user, index) => {
                  const isCurrentUser = currentUserId === user.id;
                  return (
                    <TableRow key={user.id} className={index % 2 === 1 ? "bg-muted/20" : ""}>
                      <TableCell className="font-medium">
                        {user.nome}
                        {isCurrentUser && (
                          <Badge variant="outline" className="ml-2 text-xs">Você</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-muted-foreground">{user.email}</TableCell>
                      <TableCell className="text-center">
                        <Badge className={user.role === "admin" ? "bg-primary text-primary-foreground gap-1" : "bg-secondary text-secondary-foreground gap-1"}>
                          {user.role === "admin" ? <Shield className="h-3 w-3" /> : <User className="h-3 w-3" />}
                          {user.role === "admin" ? "Admin" : "Usuário"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          {/* Reset Password */}
                          <Dialog
                            open={resetUserId === user.id}
                            onOpenChange={(open) => {
                              if (!open) { setResetUserId(null); setNovaSenha(""); setResetUserName(""); setResetUserEmail(""); }
                            }}
                          >
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline" className="gap-1" onClick={() => {
                                setResetUserId(user.id);
                                setResetUserName(user.nome);
                                setResetUserEmail(user.email);
                              }}>
                                <KeyRound className="h-3.5 w-3.5" /> Senha
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Redefinir Senha</DialogTitle>
                                <DialogDescription>Nova senha para {user.nome} ({user.email})</DialogDescription>
                              </DialogHeader>
                              <div className="space-y-2 py-2">
                                <label className="text-sm font-medium">Nova Senha</label>
                                <Input type="text" placeholder="Nova senha (mín. 4 caracteres)" value={novaSenha} onChange={e => setNovaSenha(e.target.value)} />
                              </div>
                              <DialogFooter>
                                <Button variant="outline" onClick={() => { setResetUserId(null); setNovaSenha(""); }}>Cancelar</Button>
                                <Button onClick={handleResetPassword} className="gap-2"><KeyRound className="h-4 w-4" /> Alterar</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>

                          {/* Delete */}
                          {!isCurrentUser && (
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive">
                                  <Trash2 className="h-3.5 w-3.5" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Excluir usuário?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    {user.nome} ({user.email}) perderá o acesso ao sistema.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDelete(user.id, user.email)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                    Excluir
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </Layout>
  );
}
