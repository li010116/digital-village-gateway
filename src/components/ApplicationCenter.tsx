import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Wheat, 
  Cloud, 
  TrendingUp, 
  Shield, 
  Users, 
  Car, 
  GraduationCap, 
  Heart, 
  Home, 
  Banknote 
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const ApplicationCenter = () => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const applications = [
    {
      icon: Wheat,
      name: '农作物监测',
      description: '实时监测农作物生长状态',
      details: '通过物联网传感器和卫星遥感技术，实时监测农作物的生长状态、土壤湿度、温度等关键指标，为农民提供科学的种植建议。',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      icon: Cloud,
      name: '天气预报',
      description: '精准的农业气象服务',
      details: '提供精准的本地天气预报和农业气象服务，帮助农民合理安排农事活动，减少天气灾害带来的损失。',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: TrendingUp,
      name: '农产品价格',
      description: '实时农产品市场价格',
      details: '提供实时的农产品市场价格信息，帮助农民选择最佳的销售时机，提高农产品的经济效益。',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      icon: Shield,
      name: '病虫害防治',
      description: '智能病虫害识别预警',
      details: '利用AI图像识别技术，快速识别农作物病虫害，提供专业的防治建议和预警服务。',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
    {
      icon: Users,
      name: '村民服务',
      description: '便民服务一站式平台',
      details: '整合各类便民服务，包括证件办理、政策咨询、投诉建议等，让村民享受便捷的数字化服务。',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      icon: Car,
      name: '农机调度',
      description: '智能农机共享调度',
      details: '提供农机设备的共享调度服务，提高农机利用率，降低农业生产成本。',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
    {
      icon: GraduationCap,
      name: '农技培训',
      description: '在线农业技术培训',
      details: '提供丰富的农业技术培训课程，包括种植技术、养殖技术、农机操作等，提升农民技能水平。',
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
    },
    {
      icon: Heart,
      name: '医疗服务',
      description: '远程医疗健康服务',
      details: '提供远程医疗咨询、健康档案管理、预约挂号等服务，改善农村医疗服务水平。',
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
    },
    {
      icon: Home,
      name: '房屋管理',
      description: '农村房屋信息管理',
      details: '数字化管理农村房屋信息，包括房屋登记、租赁信息、维修记录等，提升房屋管理效率。',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      icon: Banknote,
      name: '金融服务',
      description: '农村数字金融服务',
      details: '提供农村小额贷款、保险服务、支付结算等金融服务，支持农村经济发展。',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
  ];

  const handleCardClick = (index: number) => {
    if (index < 3) {
      navigate(`/app-detail/${index}`);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
      {applications.map((app, index) => (
        <Card
          key={index}
          className="group cursor-pointer relative min-h-[200px] hover:shadow-lg" 
          style={{
            perspective: '1000px',
          }}
          onMouseEnter={() => setHoveredCard(index)}
          onMouseLeave={() => setHoveredCard(null)}
          onClick={() => handleCardClick(index)}
        >
          <div
            className="w-full h-full transition-transform duration-500 ease-out"
            style={{
              transformStyle: 'preserve-3d',
              transform: hoveredCard === index ? 'rotateY(180deg)' : 'rotateY(0deg)',
            }}
          >
            {/* 卡片正面 */}
            <div
              className="absolute w-full h-full backface-hidden"
              style={{
                backfaceVisibility: 'hidden',
              }}
            >
              <CardHeader className="flex flex-row items-center space-y-0 space-x-4">
                <div 
                  className={`w-12 h-12 rounded-lg ${app.bgColor} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}
                >
                  <app.icon className={`h-6 w-6 ${app.color}`} />
                </div>
                <div>
                  <CardTitle className="text-lg font-semibold">{app.name}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    {app.description}
                  </CardDescription>
                  {index < 3 && (
                    <div className="text-xs text-primary mt-1">
                      点击查看详情
                    </div>
                  )}
                </div>
              </CardHeader>
            </div>

            {/* 卡片背面 */}
            <div
              className="absolute w-full h-full backface-hidden p-4"
              style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
            >
              <CardTitle className="text-lg font-semibold mb-2">{app.name}</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                {app.details}
              </CardDescription>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ApplicationCenter;
