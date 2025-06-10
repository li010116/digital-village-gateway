
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { LogOut, Save, Plus, Edit, Trash2 } from 'lucide-react';

interface PageConfig {
  id: string;
  page_name: string;
  title: string;
  description: string;
  content: any;
  banner_image?: string;
}

interface AppConfig {
  id: string;
  name: string;
  description: string;
  image_url: string;
  details: string;
  color: string;
  bg_color: string;
  category: string;
  sort_order: number;
}

const Admin = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [pageConfigs, setPageConfigs] = useState<PageConfig[]>([]);
  const [appConfigs, setAppConfigs] = useState<AppConfig[]>([]);
  const [selectedPageConfig, setSelectedPageConfig] = useState<PageConfig | null>(null);
  const [selectedAppConfig, setSelectedAppConfig] = useState<AppConfig | null>(null);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    loadPageConfigs();
    loadAppConfigs();
  }, [user, navigate]);

  const loadPageConfigs = async () => {
    const { data, error } = await supabase
      .from('page_configs')
      .select('*')
      .order('page_name');
    
    if (error) {
      toast({
        title: "加载失败",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setPageConfigs(data || []);
    }
  };

  const loadAppConfigs = async () => {
    const { data, error } = await supabase
      .from('app_configs')
      .select('*')
      .order('sort_order');
    
    if (error) {
      toast({
        title: "加载失败",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setAppConfigs(data || []);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const savePageConfig = async () => {
    if (!selectedPageConfig) return;

    const { error } = await supabase
      .from('page_configs')
      .update({
        title: selectedPageConfig.title,
        description: selectedPageConfig.description,
        content: selectedPageConfig.content,
        banner_image: selectedPageConfig.banner_image,
      })
      .eq('id', selectedPageConfig.id);

    if (error) {
      toast({
        title: "保存失败",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "保存成功",
        description: "页面配置已更新",
      });
      loadPageConfigs();
    }
  };

  const saveAppConfig = async () => {
    if (!selectedAppConfig) return;

    const { error } = await supabase
      .from('app_configs')
      .update({
        name: selectedAppConfig.name,
        description: selectedAppConfig.description,
        image_url: selectedAppConfig.image_url,
        details: selectedAppConfig.details,
        color: selectedAppConfig.color,
        bg_color: selectedAppConfig.bg_color,
        category: selectedAppConfig.category,
        sort_order: selectedAppConfig.sort_order,
      })
      .eq('id', selectedAppConfig.id);

    if (error) {
      toast({
        title: "保存失败",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "保存成功",
        description: "应用配置已更新",
      });
      loadAppConfigs();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">管</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">数字乡村管理后台</h1>
                <p className="text-sm text-gray-500">欢迎，{user?.email}</p>
              </div>
            </div>
            <Button onClick={handleSignOut} variant="outline">
              <LogOut className="w-4 h-4 mr-2" />
              退出登录
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <Tabs defaultValue="pages" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="pages">页面配置</TabsTrigger>
            <TabsTrigger value="apps">应用配置</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pages" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>页面列表</CardTitle>
                  <CardDescription>选择要编辑的页面</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {pageConfigs.map((config) => (
                      <Button
                        key={config.id}
                        variant={selectedPageConfig?.id === config.id ? "default" : "outline"}
                        className="w-full justify-start"
                        onClick={() => setSelectedPageConfig(config)}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        {config.title}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {selectedPageConfig && (
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>编辑页面: {selectedPageConfig.page_name}</CardTitle>
                    <CardDescription>修改页面配置信息</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="page-title">页面标题</Label>
                      <Input
                        id="page-title"
                        value={selectedPageConfig.title}
                        onChange={(e) => setSelectedPageConfig({
                          ...selectedPageConfig,
                          title: e.target.value
                        })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="page-description">页面描述</Label>
                      <Textarea
                        id="page-description"
                        value={selectedPageConfig.description || ''}
                        onChange={(e) => setSelectedPageConfig({
                          ...selectedPageConfig,
                          description: e.target.value
                        })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="page-banner">横幅图片URL</Label>
                      <Input
                        id="page-banner"
                        value={selectedPageConfig.banner_image || ''}
                        onChange={(e) => setSelectedPageConfig({
                          ...selectedPageConfig,
                          banner_image: e.target.value
                        })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="page-content">页面内容 (JSON)</Label>
                      <Textarea
                        id="page-content"
                        rows={6}
                        value={JSON.stringify(selectedPageConfig.content, null, 2)}
                        onChange={(e) => {
                          try {
                            const content = JSON.parse(e.target.value);
                            setSelectedPageConfig({
                              ...selectedPageConfig,
                              content
                            });
                          } catch (error) {
                            // Invalid JSON, don't update
                          }
                        }}
                      />
                    </div>
                    <Button onClick={savePageConfig} className="w-full">
                      <Save className="w-4 h-4 mr-2" />
                      保存配置
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="apps" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>应用列表</CardTitle>
                  <CardDescription>选择要编辑的应用</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {appConfigs.map((config) => (
                      <Button
                        key={config.id}
                        variant={selectedAppConfig?.id === config.id ? "default" : "outline"}
                        className="w-full justify-start"
                        onClick={() => setSelectedAppConfig(config)}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        {config.name}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {selectedAppConfig && (
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>编辑应用: {selectedAppConfig.name}</CardTitle>
                    <CardDescription>修改应用配置信息</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="app-name">应用名称</Label>
                        <Input
                          id="app-name"
                          value={selectedAppConfig.name}
                          onChange={(e) => setSelectedAppConfig({
                            ...selectedAppConfig,
                            name: e.target.value
                          })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="app-category">分类</Label>
                        <Input
                          id="app-category"
                          value={selectedAppConfig.category}
                          onChange={(e) => setSelectedAppConfig({
                            ...selectedAppConfig,
                            category: e.target.value
                          })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="app-description">应用描述</Label>
                      <Input
                        id="app-description"
                        value={selectedAppConfig.description || ''}
                        onChange={(e) => setSelectedAppConfig({
                          ...selectedAppConfig,
                          description: e.target.value
                        })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="app-details">详细信息</Label>
                      <Textarea
                        id="app-details"
                        rows={3}
                        value={selectedAppConfig.details || ''}
                        onChange={(e) => setSelectedAppConfig({
                          ...selectedAppConfig,
                          details: e.target.value
                        })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="app-image">图片URL</Label>
                      <Input
                        id="app-image"
                        value={selectedAppConfig.image_url || ''}
                        onChange={(e) => setSelectedAppConfig({
                          ...selectedAppConfig,
                          image_url: e.target.value
                        })}
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="app-color">文字颜色</Label>
                        <Input
                          id="app-color"
                          value={selectedAppConfig.color || ''}
                          onChange={(e) => setSelectedAppConfig({
                            ...selectedAppConfig,
                            color: e.target.value
                          })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="app-bg-color">背景颜色</Label>
                        <Input
                          id="app-bg-color"
                          value={selectedAppConfig.bg_color || ''}
                          onChange={(e) => setSelectedAppConfig({
                            ...selectedAppConfig,
                            bg_color: e.target.value
                          })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="app-sort">排序</Label>
                        <Input
                          id="app-sort"
                          type="number"
                          value={selectedAppConfig.sort_order}
                          onChange={(e) => setSelectedAppConfig({
                            ...selectedAppConfig,
                            sort_order: parseInt(e.target.value) || 0
                          })}
                        />
                      </div>
                    </div>
                    <Button onClick={saveAppConfig} className="w-full">
                      <Save className="w-4 h-4 mr-2" />
                      保存配置
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
