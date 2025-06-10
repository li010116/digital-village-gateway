
-- 创建用户资料表
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建页面配置表
CREATE TABLE public.page_configs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page_name TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT,
  banner_image TEXT,
  content JSONB,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建应用配置表
CREATE TABLE public.app_configs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  details TEXT,
  color TEXT,
  bg_color TEXT,
  category TEXT,
  is_featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 为profiles表启用RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 为page_configs表启用RLS
ALTER TABLE public.page_configs ENABLE ROW LEVEL SECURITY;

-- 为app_configs表启用RLS
ALTER TABLE public.app_configs ENABLE ROW LEVEL SECURITY;

-- profiles表的RLS策略
CREATE POLICY "用户可以查看所有资料" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "用户可以更新自己的资料" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "用户可以插入自己的资料" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- page_configs表的RLS策略（公开读取，需要登录才能修改）
CREATE POLICY "所有人可以查看页面配置" ON public.page_configs FOR SELECT USING (true);
CREATE POLICY "认证用户可以管理页面配置" ON public.page_configs FOR ALL USING (auth.role() = 'authenticated');

-- app_configs表的RLS策略（公开读取，需要登录才能修改）
CREATE POLICY "所有人可以查看应用配置" ON public.app_configs FOR SELECT USING (true);
CREATE POLICY "认证用户可以管理应用配置" ON public.app_configs FOR ALL USING (auth.role() = 'authenticated');

-- 创建触发器函数来自动创建用户资料
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, username)
  VALUES (new.id, new.raw_user_meta_data->>'username');
  RETURN new;
END;
$$;

-- 创建触发器
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 插入初始页面配置数据
INSERT INTO public.page_configs (page_name, title, description, content) VALUES
('home', '数字乡村首页', '数字乡村平台首页配置', '{"hero_title": "数字乡村", "hero_subtitle": "智慧农业 · 现代治理 · 便民服务"}'),
('smart-agriculture', '智慧农业', '智慧农业服务页面', '{"title": "智慧农业", "description": "利用现代信息技术提升农业生产效率"}'),
('social-governance', '社会治理', '社会治理服务页面', '{"title": "社会治理", "description": "构建现代化社会治理体系"}'),
('social-services', '社会化服务', '社会化服务页面', '{"title": "社会化服务", "description": "提供便民利民的数字化服务"}'),
('app-center', '应用中心', '应用中心页面', '{"title": "应用中心", "description": "汇聚各类便民应用服务"}');

-- 插入初始应用配置数据
INSERT INTO public.app_configs (name, description, image_url, details, color, bg_color, category, sort_order) VALUES
('农作物监测', '实时监测农作物生长状态', 'https://gulubkimg.guluy.top/%E5%BC%80%E5%8F%91/image.jpg', '通过物联网传感器和卫星遥感技术，实时监测农作物的生长状态、土壤湿度、温度等关键指标，为农民提供科学的种植建议。', 'text-green-600', 'bg-green-50', 'agriculture', 1),
('天气预报', '精准的农业气象服务', 'https://gulubkimg.guluy.top/%E5%BC%80%E5%8F%91/image.jpg', '提供精准的本地天气预报和农业气象服务，帮助农民合理安排农事活动，减少天气灾害带来的损失。', 'text-blue-600', 'bg-blue-50', 'agriculture', 2),
('农产品价格', '实时农产品市场价格', 'https://gulubkimg.guluy.top/%E5%BC%80%E5%8F%91/image.jpg', '提供实时的农产品市场价格信息，帮助农民选择最佳的销售时机，提高农产品的经济效益。', 'text-orange-600', 'bg-orange-50', 'agriculture', 3),
('病虫害防治', '智能病虫害识别预警', 'https://gulubkimg.guluy.top/%E5%BC%80%E5%8F%91/image.jpg', '利用AI图像识别技术，快速识别农作物病虫害，提供专业的防治建议和预警服务。', 'text-red-600', 'bg-red-50', 'agriculture', 4),
('村民服务', '便民服务一站式平台', 'https://gulubkimg.guluy.top/%E5%BC%80%E5%8F%91/image.jpg', '整合各类便民服务，包括证件办理、政策咨询、投诉建议等，让村民享受便捷的数字化服务。', 'text-purple-600', 'bg-purple-50', 'service', 5),
('农机调度', '智能农机共享调度', 'https://gulubkimg.guluy.top/%E5%BC%80%E5%8F%91/image.jpg', '提供农机设备的共享调度服务，提高农机利用率，降低农业生产成本。', 'text-indigo-600', 'bg-indigo-50', 'agriculture', 6),
('农技培训', '在线农业技术培训', 'https://gulubkimg.guluy.top/%E5%BC%80%E5%8F%91/image.jpg', '提供丰富的农业技术培训课程，包括种植技术、养殖技术、农机操作等，提升农民技能水平。', 'text-teal-600', 'bg-teal-50', 'education', 7),
('医疗服务', '远程医疗健康服务', 'https://gulubkimg.guluy.top/%E5%BC%80%E5%8F%91/image.jpg', '提供远程医疗咨询、健康档案管理、预约挂号等服务，改善农村医疗服务水平。', 'text-pink-600', 'bg-pink-50', 'health', 8),
('房屋管理', '农村房屋信息管理', 'https://gulubkimg.guluy.top/%E5%BC%80%E5%8F%91/image.jpg', '数字化管理农村房屋信息，包括房屋登记、租赁信息、维修记录等，提升房屋管理效率。', 'text-yellow-600', 'bg-yellow-50', 'governance', 9),
('金融服务', '农村数字金融服务', 'https://gulubkimg.guluy.top/%E5%BC%80%E5%8F%91/image.jpg', '提供农村小额贷款、保险服务、支付结算等金融服务，支持农村经济发展。', 'text-emerald-600', 'bg-emerald-50', 'finance', 10);
