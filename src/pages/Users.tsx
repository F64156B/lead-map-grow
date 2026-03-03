import { useState, useMemo } from "react";
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
import { getUsuarios, criarUsuario, resetarSenhaUsuario, excluirUsuario, getUsuarioLogado } from "@/data/store";
import { toast } from "@/hooks/use-toast";

export default function UsersPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const usuarios = useMemo(() => getUsuarios(), [refreshKey]);
  const logado = getUsuarioLogado();

  // Create user state
  const [showCreate, setShowCreate] = useState(false);
  const [novoNome, setNovoNome] = useState("");
  const [novoEmail, setNovoEmail] = useState("");
  const [novoSenha, setNovoSenha] = useState("");
  const [novoRole, setNovoRole] = useState<"admin" | "usuario">("usuario");

  // Reset password state
  const [resetEmail, setResetEmail] = useState<string | null>(null);
  const [novaSenha, setNovaSenha] = useState("");

  const handleCreate = () => {
    if (!novoNome.trim() || !novoEmail.trim() || !novoSenha) {
      toast({ title: "Preencha todos os campos", variant: "destructive" });
      return;
    }
    if (novoSenha.length < 4) {
      toast({ title: "Senha muito curta", description: "A senha deve ter no mínimo 4 caracteres.", variant: "destructive" });
      return;
    }
    const result = criarUsuario({ nome: novoNome.trim(), email: novoEmail.trim(), senha: novoSenha, role: novoRole });
    if (result.ok) {
      toast({ title: "Usuário criado!", description: `Login: ${novoEmail.trim().toLowerCase()} | Senha: ${novoSenha}` });
      setNovoNome(""); setNovoEmail(""); setNovoSenha(""); setNovoRole("usuario");
      setShowCreate(false);
      setRefreshKey(k => k + 1);
    } else {
      toast({ title: "Erro", description: result.erro, variant: "destructive" });
    }
  };

  const handleResetPassword = () => {
    if (!resetEmail || !novaSenha) return;
    if (novaSenha.length < 4) {
      toast({ title: "Erro", description: "A senha deve ter no mínimo 4 caracteres.", variant: "destructive" });
      return;
    }
    const result = resetarSenhaUsuario(resetEmail, novaSenha);
    if (result.ok) {
      toast({ title: "Senha alterada!", description: `Senha de ${resetEmail} redefinida para: ${novaSenha}` });
      setResetEmail(null);
      setNovaSenha("");
    } else {
      toast({ title: "Erro", description: result.erro, variant: "destructive" });
    }
  };

  const handleDelete = (email: string) => {
    const result = excluirUsuario(email);
    if (result.ok) {
      toast({ title: "Usuário excluído", description: `${email} foi removido.` });
      setRefreshKey(k => k + 1);
    } else {
      toast({ title: "Erro", description: result.erro, variant: "destructive" });
    }
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
              {usuarios.map((user, index) => {
                const isCurrentUser = logado?.email.toLowerCase() === user.email.toLowerCase();
                return (
                  <TableRow key={user.email} className={index % 2 === 1 ? "bg-muted/20" : ""}>
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
                        <Dialog open={resetEmail === user.email} onOpenChange={(open) => { if (!open) { setResetEmail(null); setNovaSenha(""); } }}>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline" className="gap-1" onClick={() => setResetEmail(user.email)}>
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
                              <Button variant="outline" onClick={() => { setResetEmail(null); setNovaSenha(""); }}>Cancelar</Button>
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
                                <AlertDialogAction onClick={() => handleDelete(user.email)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
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
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </Layout>
  );
}
