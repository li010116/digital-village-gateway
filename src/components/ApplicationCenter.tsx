import { useState, useEffect } from 'react';
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
  const [flippedCard, setFlippedCard] = useState<number | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);

  const applications = [
    // 保持原有应用数据不变...
  ];

  // 防止快速切换导致的多次翻转
  useEffect(() => {
    if (flippedCard !== null) {
      setIsFlipping(true);
      const timeout = setTimeout(() => {
        setIsFlipping(false);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [flippedCard]);

  const handleCardClick = (index: number) => {
    if (index < 3) {
      navigate(`/app-detail/${index}`);
    }
  };

  const handleMouseEnter = (index: number) => {
    if (!isFlipping) {
      setFlippedCard(index);
    }
  };

  const handleMouseLeave = () => {
    if (!isFlipping) {
      setFlippedCard(null);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"> {/* 增大容器宽度和间距 */}
      {applications.map((app, index) => (
        <Card
          key={index}
          className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 p-6" {/* 增加内边距 */}
          style={{
            transformStyle: 'preserve-3d',
            transform: flippedCard === index ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleCardClick(index)}
        >
          <CardHeader 
            className="flex flex-row items-center space-y-0 space-x-6" {/* 增大间距 */}
            style={{
              transform: flippedCard === index ? 'rotateY(-180deg)' : 'rotateY(0deg)',
              backfaceVisibility: 'hidden',
              position: 'relative'
            }}
          >
            <div className={`w-16 h-16 rounded-lg ${app.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}> {/* 增大图标容器 */}
              <app.icon className={`h-8 w-8 ${app.color}`} /> {/* 增大图标尺寸 */}
            </div>
            <div>
              <CardTitle className="text-xl font-semibold">{app.name}</CardTitle> {/* 增大标题字体 */}
              <CardDescription className="text-base text-muted-foreground"> {/* 增大描述字体 */}
                {app.description}
              </CardDescription>
              {index < 3 && (
                <div className="text-sm text-primary mt-2"> {/* 增大提示文字 */}
                  点击查看详情
                </div>
              )}
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};

export default ApplicationCenter;    
