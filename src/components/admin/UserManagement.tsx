
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, UserCheck } from 'lucide-react';

interface SysUser {
  id: string;
  username: string;
  email: string;
  real_name?: string;
  phone?: string;
  status: number;
  created_at: string;
}

interface SysRole {
  id: string;
  role_code: string;
  role_name: string;
}

interface UserFormData {
  username: string;
  email: string;
  password: string;
  real_name: string;
  phone: string;
  status: number;
}

const UserManagement = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<SysUser[]>([]);
  const [roles, setRoles] = useState<SysRole[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<SysUser | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [selectedRoleIds, setSelectedRoleIds] = useState<string[]>([]);
  const [formData, setFormData] = useState<UserFormData>({
    username: '',
    email: '',
    password: '',
    real_name: '',
    phone: '',
    status: 1
  });

  useEffect(() => {
    loadUsers();
    loadRoles();
  }, []);

  const loadUsers = async () => {
    const { data, error } = await supabase
      .from('sys_users')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      toast({
        title: "加载失败",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setUsers(data || []);
    }
  };

  const loadRoles = async () => {
    const { data, error } = await supabase
      .from('sys_roles')
      .select('*')
      .order('sort_order');
    
    if (error) {
      toast({
        title: "加载角色失败",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setRoles(data || []);
    }
  };

  const handleSubmit = async () => {
    try {
      if (editingUser) {
        // 更新用户
        const { error } = await supabase
          .from('sys_users')
          .update({
            username: formData.username,
            email: formData.email,
            real_name: formData.real_name,
            phone: formData.phone,
            status: formData.status
          })
          .eq('id', editingUser.id);

        if (error) throw error;
        
        toast({
          title: "更新成功",
          description: "用户信息已更新",
        });
      } else {
        // 创建新用户
        const { error } = await supabase
          .from('sys_users')
          .insert({
            username: formData.username,
            email: formData.email,
            password_hash: formData.password, // 实际应用中需要加密
            real_name: formData.real_name,
            phone: formData.phone,
            status: formData.status
          });

        if (error) throw error;
        
        toast({
          title: "创建成功",
          description: "新用户已创建",
        });
      }
      
      setIsDialogOpen(false);
      resetForm();
      loadUsers();
    } catch (error: any) {
      toast({
        title: "操作失败",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from('sys_users')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "删除失败",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "删除成功",
        description: "用户已删除",
      });
      loadUsers();
    }
  };

  const handleAssignRoles = async () => {
    try {
      // 先删除用户的所有角色
      await supabase
        .from('rel_user_role')
        .delete()
        .eq('user_id', selectedUserId);

      // 再添加新的角色
      if (selectedRoleIds.length > 0) {
        const relations = selectedRoleIds.map(roleId => ({
          user_id: selectedUserId,
          role_id: roleId
        }));

        const { error } = await supabase
          .from('rel_user_role')
          .insert(relations);

        if (error) throw error;
      }

      toast({
        title: "分配成功",
        description: "用户角色已更新",
      });
      setIsRoleDialogOpen(false);
    } catch (error: any) {
      toast({
        title: "分配失败",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      username: '',
      email: '',
      password: '',
      real_name: '',
      phone: '',
      status: 1
    });
    setEditingUser(null);
  };

  const openEditDialog = (user: SysUser) => {
    setEditingUser(user);
    setFormData({
      username: user.username,
      email: user.email,
      password: '',
      real_name: user.real_name || '',
      phone: user.phone || '',
      status: user.status
    });
    setIsDialogOpen(true);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>用户管理</CardTitle>
            <CardDescription>管理系统用户信息</CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="w-4 h-4 mr-2" />
                添加用户
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingUser ? '编辑用户' : '添加用户'}</DialogTitle>
                <DialogDescription>
                  {editingUser ? '修改用户信息' : '创建新的系统用户'}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">用户名</Label>
                    <Input
                      id="username"
                      value={formData.username}
                      onChange={(e) => setFormData({...formData, username: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">邮箱</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>
                {!editingUser && (
                  <div className="space-y-2">
                    <Label htmlFor="password">密码</Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                    />
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="real_name">真实姓名</Label>
                    <Input
                      id="real_name"
                      value={formData.real_name}
                      onChange={(e) => setFormData({...formData, real_name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">手机号</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">状态</Label>
                  <Select value={formData.status.toString()} onValueChange={(value) => setFormData({...formData, status: parseInt(value)})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">启用</SelectItem>
                      <SelectItem value="0">禁用</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleSubmit}>
                  {editingUser ? '更新' : '创建'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>用户名</TableHead>
              <TableHead>邮箱</TableHead>
              <TableHead>真实姓名</TableHead>
              <TableHead>手机号</TableHead>
              <TableHead>状态</TableHead>
              <TableHead>创建时间</TableHead>
              <TableHead>操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.real_name || '-'}</TableCell>
                <TableCell>{user.phone || '-'}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    user.status === 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {user.status === 1 ? '启用' : '禁用'}
                  </span>
                </TableCell>
                <TableCell>{new Date(user.created_at).toLocaleString()}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => openEditDialog(user)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Dialog open={isRoleDialogOpen} onOpenChange={setIsRoleDialogOpen}>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedUserId(user.id)}
                        >
                          <UserCheck className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>分配角色</DialogTitle>
                          <DialogDescription>为用户分配系统角色</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          {roles.map((role) => (
                            <div key={role.id} className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id={role.id}
                                checked={selectedRoleIds.includes(role.id)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedRoleIds([...selectedRoleIds, role.id]);
                                  } else {
                                    setSelectedRoleIds(selectedRoleIds.filter(id => id !== role.id));
                                  }
                                }}
                              />
                              <Label htmlFor={role.id}>{role.role_name}</Label>
                            </div>
                          ))}
                        </div>
                        <DialogFooter>
                          <Button onClick={handleAssignRoles}>确定</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(user.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default UserManagement;
