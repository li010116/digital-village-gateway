
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Application {
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

const ApplicationCenter = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
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
      setApplications(data || []);
    }
  };

  const handleCardClick = (index: number) => {
    if (index < 3) {
      navigate(`/app-detail/${index}`);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto py-8">
      {applications.map((app, index) => (
        <Card
          key={app.id}
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
                  src={app.image_url}
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
