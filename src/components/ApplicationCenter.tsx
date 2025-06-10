import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const ApplicationCenter = () => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const applications = [
    {
      imageUrl: 'https://gulubkimg.guluy.top/%E5%BC%80%E5%8F%91/image.jpg',
      name: '农作物监测',
      description: '实时监测农作物生长状态',
      details: '通过物联网传感器和卫星遥感技术，实时监测农作物的生长状态、土壤湿度、温度等关键指标，为农民提供科学的种植建议。',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      imageUrl: 'https://gulubkimg.guluy.top/%E5%BC%80%E5%8F%91/image.jpg',
      name: '天气预报',
      description: '精准的农业气象服务',
      details: '提供精准的本地天气预报和农业气象服务，帮助农民合理安排农事活动，减少天气灾害带来的损失。',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      imageUrl: 'https://gulubkimg.guluy.top/%E5%BC%80%E5%8F%91/image.jpg',
      name: '农产品价格',
      description: '实时农产品市场价格',
      details: '提供实时的农产品市场价格信息，帮助农民选择最佳的销售时机，提高农产品的经济效益。',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      imageUrl: 'https://gulubkimg.guluy.top/%E5%BC%80%E5%8F%91/image.jpg',
      name: '病虫害防治',
      description: '智能病虫害识别预警',
      details: '利用AI图像识别技术，快速识别农作物病虫害，提供专业的防治建议和预警服务。',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
    {
      imageUrl: 'https://gulubkimg.guluy.top/%E5%BC%80%E5%8F%91/image.jpg',
      name: '村民服务',
      description: '便民服务一站式平台',
      details: '整合各类便民服务，包括证件办理、政策咨询、投诉建议等，让村民享受便捷的数字化服务。',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      imageUrl: 'https://gulubkimg.guluy.top/%E5%BC%80%E5%8F%91/image.jpg',
      name: '农机调度',
      description: '智能农机共享调度',
      details: '提供农机设备的共享调度服务，提高农机利用率，降低农业生产成本。',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
    {
      imageUrl: 'https://gulubkimg.guluy.top/%E5%BC%80%E5%8F%91/image.jpg',
      name: '农技培训',
      description: '在线农业技术培训',
      details: '提供丰富的农业技术培训课程，包括种植技术、养殖技术、农机操作等，提升农民技能水平。',
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
    },
    {
      imageUrl: 'https://gulubkimg.guluy.top/%E5%BC%80%E5%8F%91/image.jpg',
      name: '医疗服务',
      description: '远程医疗健康服务',
      details: '提供远程医疗咨询、健康档案管理、预约挂号等服务，改善农村医疗服务水平。',
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
    },
    {
      imageUrl: 'https://gulubkimg.guluy.top/%E5%BC%80%E5%8F%91/image.jpg',
      name: '房屋管理',
      description: '农村房屋信息管理',
      details: '数字化管理农村房屋信息，包括房屋登记、租赁信息、维修记录等，提升房屋管理效率。',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      imageUrl: 'https://gulubkimg.guluy.top/%E5%BC%80%E5%8F%91/image.jpg',
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto py-8">
      {applications.map((app, index) => (
        <Card
          key={index}
          className="group cursor-pointer relative h-80 w-full rounded-xl overflow-hidden shadow-lg"
          style={{ perspective: '1000px' }}
          onMouseEnter={() => setHoveredCard(index)}
          onMouseLeave={() => setHoveredCard(null)}
          onClick={() => handleCardClick(index)}
        >
          <div
            className="absolute inset-0 w-full h-full transition-transform duration-500"
            style={{
              transformStyle: 'preserve-3d',
              transform: hoveredCard === index ? 'rotateY(180deg)' : 'rotateY(0deg)',
            }}
          >
            {/* 正面 */}
            <div
              className="absolute inset-0 flex flex-col bg-white"
              style={{
                backfaceVisibility: 'hidden',
              }}
            >
              <div className="h-40 w-full overflow-hidden">
                <img
                  src={app.imageUrl}
                  alt={app.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 flex flex-col justify-center items-center p-4">
                <CardTitle className="text-lg font-bold mb-1">{app.name}</CardTitle>
                <CardDescription className="text-sm text-gray-500">{app.description}</CardDescription>
                {index < 3 && (
                  <div className="text-xs text-primary mt-2">点击查看详情</div>
                )}
              </div>
            </div>
            {/* 背面 */}
            <div
              className="absolute inset-0 flex flex-col justify-center items-center bg-gray-50 p-6"
              style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
            >
              <CardTitle className="text-lg font-bold mb-2">{app.name}</CardTitle>
              <CardDescription className="text-sm text-gray-600 text-center">{app.details}</CardDescription>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ApplicationCenter;
