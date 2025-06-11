
-- 创建用户表 (sys_users)
CREATE TABLE public.sys_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  real_name VARCHAR(100),
  phone VARCHAR(20),
  avatar_url TEXT,
  status INTEGER DEFAULT 1, -- 1:启用 0:禁用
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID,
  updated_by UUID
);

-- 创建角色表 (sys_roles)
CREATE TABLE public.sys_roles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  role_code VARCHAR(50) NOT NULL UNIQUE,
  role_name VARCHAR(100) NOT NULL,
  description TEXT,
  status INTEGER DEFAULT 1, -- 1:启用 0:禁用
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID,
  updated_by UUID
);

-- 创建权限表 (sys_perms)
CREATE TABLE public.sys_perms (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  perm_code VARCHAR(100) NOT NULL UNIQUE,
  perm_name VARCHAR(100) NOT NULL,
  perm_type VARCHAR(20) DEFAULT 'menu', -- menu:菜单 button:按钮 api:接口
  parent_id UUID REFERENCES public.sys_perms(id),
  path VARCHAR(200),
  component VARCHAR(200),
  icon VARCHAR(50),
  description TEXT,
  status INTEGER DEFAULT 1, -- 1:启用 0:禁用
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID,
  updated_by UUID
);

-- 创建用户角色关系表 (rel_user_role)
CREATE TABLE public.rel_user_role (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.sys_users(id) ON DELETE CASCADE,
  role_id UUID NOT NULL REFERENCES public.sys_roles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID,
  UNIQUE(user_id, role_id)
);

-- 创建角色权限关系表 (rel_role_perm)
CREATE TABLE public.rel_role_perm (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  role_id UUID NOT NULL REFERENCES public.sys_roles(id) ON DELETE CASCADE,
  perm_id UUID NOT NULL REFERENCES public.sys_perms(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID,
  UNIQUE(role_id, perm_id)
);

-- 为所有表启用RLS
ALTER TABLE public.sys_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sys_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sys_perms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rel_user_role ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rel_role_perm ENABLE ROW LEVEL SECURITY;

-- 创建RLS策略 (暂时允许认证用户访问所有数据，后续可根据具体权限细化)
CREATE POLICY "认证用户可以管理用户" ON public.sys_users FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "认证用户可以管理角色" ON public.sys_roles FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "认证用户可以管理权限" ON public.sys_perms FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "认证用户可以管理用户角色关系" ON public.rel_user_role FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "认证用户可以管理角色权限关系" ON public.rel_role_perm FOR ALL USING (auth.role() = 'authenticated');

-- 插入初始权限数据
INSERT INTO public.sys_perms (perm_code, perm_name, perm_type, path, icon, description, sort_order) VALUES
('system', '系统管理', 'menu', '/system', 'Settings', '系统管理模块', 1),
('system:user', '用户管理', 'menu', '/system/users', 'Users', '用户管理', 1),
('system:user:list', '用户列表', 'button', null, null, '查看用户列表', 1),
('system:user:add', '添加用户', 'button', null, null, '添加用户', 2),
('system:user:edit', '编辑用户', 'button', null, null, '编辑用户', 3),
('system:user:delete', '删除用户', 'button', null, null, '删除用户', 4),
('system:role', '角色管理', 'menu', '/system/roles', 'Shield', '角色管理', 2),
('system:role:list', '角色列表', 'button', null, null, '查看角色列表', 1),
('system:role:add', '添加角色', 'button', null, null, '添加角色', 2),
('system:role:edit', '编辑角色', 'button', null, null, '编辑角色', 3),
('system:role:delete', '删除角色', 'button', null, null, '删除角色', 4),
('system:perm', '权限管理', 'menu', '/system/perms', 'Key', '权限管理', 3),
('system:perm:list', '权限列表', 'button', null, null, '查看权限列表', 1),
('system:perm:add', '添加权限', 'button', null, null, '添加权限', 2),
('system:perm:edit', '编辑权限', 'button', null, null, '编辑权限', 3),
('system:perm:delete', '删除权限', 'button', null, null, '删除权限', 4),
('app', '应用管理', 'menu', '/app', 'Grid', '应用管理模块', 2),
('app:config', '应用配置', 'menu', '/app/configs', 'Settings', '应用配置管理', 1),
('app:config:list', '配置列表', 'button', null, null, '查看配置列表', 1),
('app:config:add', '添加配置', 'button', null, null, '添加配置', 2),
('app:config:edit', '编辑配置', 'button', null, null, '编辑配置', 3),
('app:config:delete', '删除配置', 'button', null, null, '删除配置', 4);

-- 插入初始角色数据
INSERT INTO public.sys_roles (role_code, role_name, description, sort_order) VALUES
('super_admin', '超级管理员', '拥有系统所有权限', 1),
('admin', '管理员', '拥有大部分管理权限', 2),
('user', '普通用户', '基础用户权限', 3);

-- 为超级管理员角色分配所有权限
INSERT INTO public.rel_role_perm (role_id, perm_id)
SELECT r.id, p.id 
FROM public.sys_roles r, public.sys_perms p 
WHERE r.role_code = 'super_admin';

-- 创建更新时间触发器函数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 为所有表添加更新时间触发器
CREATE TRIGGER update_sys_users_updated_at BEFORE UPDATE ON public.sys_users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_sys_roles_updated_at BEFORE UPDATE ON public.sys_roles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_sys_perms_updated_at BEFORE UPDATE ON public.sys_perms FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
