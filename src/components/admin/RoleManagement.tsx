
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Key } from 'lucide-react';

interface SysRole {
  id: string;
  role_code: string;
  role_name: string;
  description?: string;
  status: number;
  sort_order: number;
  created_at: string;
}

interface SysPermission {
  id: string;
  perm_code: string;
  perm_name: string;
  perm_type: string;
}

interface RoleFormData {
  role_code: string;
  role_name: string;
  description: string;
  status: number;
  sort_order: number;
}

const RoleManagement = () => {
  const { toast } = useToast();
  const [roles, setRoles] = useState<SysRole[]>([]);
  const [permissions, setPermissions] = useState<SysPermission[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPermDialogOpen, setIsPermDialogOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<SysRole | null>(null);
  const [selectedRoleId, setSelectedRoleId] = useState<string>('');
  const [selectedPermIds, setSelectedPermIds] = useState<string[]>([]);
  const [formData, setFormData] = useState<RoleFormData>({
    role_code: '',
    role_name: '',
    description: '',
    status: 1,
    sort_order: 0
  });

  useEffect(() => {
    loadRoles();
    loadPermissions();
  }, []);

  const loadRoles = async () => {
    const { data, error } = await supabase
      .from('sys_roles')
      .select('*')
      .order('sort_order');
    
    if (error) {
      toast({
        title: "加载失败",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setRoles(data || []);
    }
  };

  const loadPermissions = async () => {
    const { data, error } = await supabase
      .from('sys_perms')
      .select('*')
      .order('sort_order');
    
    if (error) {
      toast({
        title: "加载权限失败",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setPermissions(data || []);
    }
  };

  const loadRolePermissions = async (roleId: string) => {
    const { data, error } = await supabase
      .from('rel_role_perm')
      .select('perm_id')
      .eq('role_id', roleId);
    
    if (error) {
      toast({
        title: "加载角色权限失败",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setSelectedPermIds(data?.map(item => item.perm_id) || []);
    }
  };

  const handleSubmit = async () => {
    try {
      if (editingRole) {
        const { error } = await supabase
          .from('sys_roles')
          .update({
            role_code: formData.role_code,
            role_name: formData.role_name,
            description: formData.description,
            status: formData.status,
            sort_order: formData.sort_order
          })
          .eq('id', editingRole.id);

        if (error) throw error;
        
        toast({
          title: "更新成功",
          description: "角色信息已更新",
        });
      } else {
        const { error } = await supabase
          .from('sys_roles')
          .insert(formData);

        if (error) throw error;
        
        toast({
          title: "创建成功",
          description: "新角色已创建",
        });
      }
      
      setIsDialogOpen(false);
      resetForm();
      loadRoles();
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
      .from('sys_roles')
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
        description: "角色已删除",
      });
      loadRoles();
    }
  };

  const handleAssignPermissions = async () => {
    try {
      // 先删除角色的所有权限
      await supabase
        .from('rel_role_perm')
        .delete()
        .eq('role_id', selectedRoleId);

      // 再添加新的权限
      if (selectedPermIds.length > 0) {
        const relations = selectedPermIds.map(permId => ({
          role_id: selectedRoleId,
          perm_id: permId
        }));

        const { error } = await supabase
          .from('rel_role_perm')
          .insert(relations);

        if (error) throw error;
      }

      toast({
        title: "分配成功",
        description: "角色权限已更新",
      });
      setIsPermDialogOpen(false);
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
      role_code: '',
      role_name: '',
      description: '',
      status: 1,
      sort_order: 0
    });
    setEditingRole(null);
  };

  const openEditDialog = (role: SysRole) => {
    setEditingRole(role);
    setFormData({
      role_code: role.role_code,
      role_name: role.role_name,
      description: role.description || '',
      status: role.status,
      sort_order: role.sort_order
    });
    setIsDialogOpen(true);
  };

  const openPermDialog = (roleId: string) => {
    setSelectedRoleId(roleId);
    loadRolePermissions(roleId);
    setIsPermDialogOpen(true);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>角色管理</CardTitle>
            <CardDescription>管理系统角色信息</CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="w-4 h-4 mr-2" />
                添加角色
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingRole ? '编辑角色' : '添加角色'}</DialogTitle>
                <DialogDescription>
                  {editingRole ? '修改角色信息' : '创建新的系统角色'}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="role_code">角色编码</Label>
                    <Input
                      id="role_code"
                      value={formData.role_code}
                      onChange={(e) => setFormData({...formData, role_code: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role_name">角色名称</Label>
                    <Input
                      id="role_name"
                      value={formData.role_name}
                      onChange={(e) => setFormData({...formData, role_name: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">描述</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
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
                  <div className="space-y-2">
                    <Label htmlFor="sort_order">排序</Label>
                    <Input
                      id="sort_order"
                      type="number"
                      value={formData.sort_order}
                      onChange={(e) => setFormData({...formData, sort_order: parseInt(e.target.value) || 0})}
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleSubmit}>
                  {editingRole ? '更新' : '创建'}
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
              <TableHead>角色编码</TableHead>
              <TableHead>角色名称</TableHead>
              <TableHead>描述</TableHead>
              <TableHead>状态</TableHead>
              <TableHead>排序</TableHead>
              <TableHead>创建时间</TableHead>
              <TableHead>操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {roles.map((role) => (
              <TableRow key={role.id}>
                <TableCell>{role.role_code}</TableCell>
                <TableCell>{role.role_name}</TableCell>
                <TableCell>{role.description || '-'}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    role.status === 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {role.status === 1 ? '启用' : '禁用'}
                  </span>
                </TableCell>
                <TableCell>{role.sort_order}</TableCell>
                <TableCell>{new Date(role.created_at).toLocaleString()}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => openEditDialog(role)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => openPermDialog(role.id)}>
                      <Key className="w-4 h-4" />
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(role.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Dialog open={isPermDialogOpen} onOpenChange={setIsPermDialogOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>分配权限</DialogTitle>
              <DialogDescription>为角色分配系统权限</DialogDescription>
            </DialogHeader>
            <div className="max-h-96 overflow-y-auto space-y-4">
              {permissions.map((perm) => (
                <div key={perm.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={perm.id}
                    checked={selectedPermIds.includes(perm.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedPermIds([...selectedPermIds, perm.id]);
                      } else {
                        setSelectedPermIds(selectedPermIds.filter(id => id !== perm.id));
                      }
                    }}
                  />
                  <Label htmlFor={perm.id} className="flex-1">
                    <span className="font-medium">{perm.perm_name}</span>
                    <span className="text-sm text-gray-500 ml-2">({perm.perm_code})</span>
                    <span className={`ml-2 px-2 py-1 rounded text-xs ${
                      perm.perm_type === 'menu' ? 'bg-blue-100 text-blue-800' :
                      perm.perm_type === 'button' ? 'bg-green-100 text-green-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {perm.perm_type}
                    </span>
                  </Label>
                </div>
              ))}
            </div>
            <DialogFooter>
              <Button onClick={handleAssignPermissions}>确定</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default RoleManagement;
