
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
import { Plus, Edit, Trash2 } from 'lucide-react';

interface SysPermission {
  id: string;
  perm_code: string;
  perm_name: string;
  perm_type: string;
  parent_id?: string;
  path?: string;
  component?: string;
  icon?: string;
  description?: string;
  status: number;
  sort_order: number;
  created_at: string;
}

interface PermissionFormData {
  perm_code: string;
  perm_name: string;
  perm_type: string;
  parent_id: string;
  path: string;
  component: string;
  icon: string;
  description: string;
  status: number;
  sort_order: number;
}

const PermissionManagement = () => {
  const { toast } = useToast();
  const [permissions, setPermissions] = useState<SysPermission[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPermission, setEditingPermission] = useState<SysPermission | null>(null);
  const [formData, setFormData] = useState<PermissionFormData>({
    perm_code: '',
    perm_name: '',
    perm_type: 'menu',
    parent_id: '',
    path: '',
    component: '',
    icon: '',
    description: '',
    status: 1,
    sort_order: 0
  });

  useEffect(() => {
    loadPermissions();
  }, []);

  const loadPermissions = async () => {
    const { data, error } = await supabase
      .from('sys_perms')
      .select('*')
      .order('sort_order');
    
    if (error) {
      toast({
        title: "加载失败",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setPermissions(data || []);
    }
  };

  const handleSubmit = async () => {
    try {
      const submitData = {
        ...formData,
        parent_id: formData.parent_id || null,
        path: formData.path || null,
        component: formData.component || null,
        icon: formData.icon || null,
        description: formData.description || null
      };

      if (editingPermission) {
        const { error } = await supabase
          .from('sys_perms')
          .update(submitData)
          .eq('id', editingPermission.id);

        if (error) throw error;
        
        toast({
          title: "更新成功",
          description: "权限信息已更新",
        });
      } else {
        const { error } = await supabase
          .from('sys_perms')
          .insert(submitData);

        if (error) throw error;
        
        toast({
          title: "创建成功",
          description: "新权限已创建",
        });
      }
      
      setIsDialogOpen(false);
      resetForm();
      loadPermissions();
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
      .from('sys_perms')
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
        description: "权限已删除",
      });
      loadPermissions();
    }
  };

  const resetForm = () => {
    setFormData({
      perm_code: '',
      perm_name: '',
      perm_type: 'menu',
      parent_id: '',
      path: '',
      component: '',
      icon: '',
      description: '',
      status: 1,
      sort_order: 0
    });
    setEditingPermission(null);
  };

  const openEditDialog = (permission: SysPermission) => {
    setEditingPermission(permission);
    setFormData({
      perm_code: permission.perm_code,
      perm_name: permission.perm_name,
      perm_type: permission.perm_type,
      parent_id: permission.parent_id || '',
      path: permission.path || '',
      component: permission.component || '',
      icon: permission.icon || '',
      description: permission.description || '',
      status: permission.status,
      sort_order: permission.sort_order
    });
    setIsDialogOpen(true);
  };

  const getPermissionTypeBadge = (type: string) => {
    const colors = {
      menu: 'bg-blue-100 text-blue-800',
      button: 'bg-green-100 text-green-800',
      api: 'bg-orange-100 text-orange-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>权限管理</CardTitle>
            <CardDescription>管理系统权限信息</CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="w-4 h-4 mr-2" />
                添加权限
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingPermission ? '编辑权限' : '添加权限'}</DialogTitle>
                <DialogDescription>
                  {editingPermission ? '修改权限信息' : '创建新的系统权限'}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="perm_code">权限编码</Label>
                    <Input
                      id="perm_code"
                      value={formData.perm_code}
                      onChange={(e) => setFormData({...formData, perm_code: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="perm_name">权限名称</Label>
                    <Input
                      id="perm_name"
                      value={formData.perm_name}
                      onChange={(e) => setFormData({...formData, perm_name: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="perm_type">权限类型</Label>
                    <Select value={formData.perm_type} onValueChange={(value) => setFormData({...formData, perm_type: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="menu">菜单</SelectItem>
                        <SelectItem value="button">按钮</SelectItem>
                        <SelectItem value="api">接口</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="parent_id">父级权限</Label>
                    <Select value={formData.parent_id} onValueChange={(value) => setFormData({...formData, parent_id: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="选择父级权限" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">无</SelectItem>
                        {permissions.filter(p => p.perm_type === 'menu').map((perm) => (
                          <SelectItem key={perm.id} value={perm.id}>{perm.perm_name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="path">路径</Label>
                    <Input
                      id="path"
                      value={formData.path}
                      onChange={(e) => setFormData({...formData, path: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="component">组件</Label>
                    <Input
                      id="component"
                      value={formData.component}
                      onChange={(e) => setFormData({...formData, component: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="icon">图标</Label>
                  <Input
                    id="icon"
                    value={formData.icon}
                    onChange={(e) => setFormData({...formData, icon: e.target.value})}
                  />
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
                  {editingPermission ? '更新' : '创建'}
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
              <TableHead>权限编码</TableHead>
              <TableHead>权限名称</TableHead>
              <TableHead>类型</TableHead>
              <TableHead>路径</TableHead>
              <TableHead>状态</TableHead>
              <TableHead>排序</TableHead>
              <TableHead>操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {permissions.map((permission) => (
              <TableRow key={permission.id}>
                <TableCell>{permission.perm_code}</TableCell>
                <TableCell>{permission.perm_name}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${getPermissionTypeBadge(permission.perm_type)}`}>
                    {permission.perm_type}
                  </span>
                </TableCell>
                <TableCell>{permission.path || '-'}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    permission.status === 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {permission.status === 1 ? '启用' : '禁用'}
                  </span>
                </TableCell>
                <TableCell>{permission.sort_order}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => openEditDialog(permission)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(permission.id)}>
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

export default PermissionManagement;
