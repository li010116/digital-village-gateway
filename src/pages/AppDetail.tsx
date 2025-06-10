
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Download, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const AppDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // 应用数据映射
  const appData: { [key: string]: any } = {
    '0': {
      name: '农作物监测',
      description: '实时监测农作物生长状态',
      fullDescription: '通过物联网传感器和卫星遥感技术，实时监测农作物的生长状态、土壤湿度、温度等关键指标，为农民提供科学的种植建议。该系统能够24小时不间断监测，提供精准的数据分析和预警服务。',
      features: [
        '实时土壤湿度监测',
        '温度和湿度数据采集',
        '生长状态智能分析',
        '病虫害早期预警',
        '科学施肥建议'
      ],
      version: '2.1.0',
      developer: '智慧农业科技有限公司',
      rating: 4.8,
      downloads: '50,000+',
      category: '智慧农业',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    '1': {
      name: '天气预报',
      description: '精准的农业气象服务',
      fullDescription: '提供精准的本地天气预报和农业气象服务，帮助农民合理安排农事活动，减少天气灾害带来的损失。支持未来15天天气预报，包含降雨量、风速、紫外线指数等详细信息。',
      features: [
        '15天精准天气预报',
        '农业气象指导',
        '灾害天气预警',
        '最佳农事时间推荐',
        '历史天气数据查询'
      ],
      version: '3.2.1',
      developer: '气象服务中心',
      rating: 4.6,
      downloads: '80,000+',
      category: '智慧农业',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    '2': {
      name: '农产品价格',
      description: '实时农产品市场价格',
      fullDescription: '提供实时的农产品市场价格信息，帮助农民选择最佳的销售时机，提高农产品的经济效益。覆盖全国主要批发市场，支持价格走势分析和预测。',
      features: [
        '实时价格更新',
        '价格走势分析',
        '市场供需信息',
        '最佳销售时机推荐',
        '价格预测功能'
      ],
      version: '1.8.3',
      developer: '农产品交易平台',
      rating: 4.7,
      downloads: '65,000+',
      category: '智慧农业',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  };

  const app = appData[id || '0'] || appData['0'];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center space-x-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>返回</span>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 主要信息 */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 rounded-xl ${app.bgColor} flex items-center justify-center`}>
                      <span className={`text-2xl font-bold ${app.color}`}>
                        {app.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <CardTitle className="text-2xl">{app.name}</CardTitle>
                      <CardDescription className="text-base mt-1">
                        {app.description}
                      </CardDescription>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{app.rating}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {app.downloads} 下载
                        </span>
                        <span className="text-sm text-muted-foreground">
                          版本 {app.version}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button>
                      <Download className="h-4 w-4 mr-2" />
                      安装
                    </Button>
                    <Button variant="outline">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      访问
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>应用介绍</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {app.fullDescription}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>主要功能</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {app.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* 侧边栏信息 */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>应用信息</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-1">开发者</h4>
                  <p className="text-sm text-muted-foreground">{app.developer}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">分类</h4>
                  <p className="text-sm text-muted-foreground">{app.category}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">版本</h4>
                  <p className="text-sm text-muted-foreground">{app.version}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">下载量</h4>
                  <p className="text-sm text-muted-foreground">{app.downloads}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">评分</h4>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= Math.floor(app.rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">{app.rating}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>更新历史</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div>
                    <div className="font-medium">版本 {app.version}</div>
                    <div className="text-muted-foreground text-xs mt-1">
                      2024-01-15
                    </div>
                    <div className="text-muted-foreground mt-1">
                      修复已知问题，优化用户体验
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AppDetail;
