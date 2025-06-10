
import { useState } from 'react';
import { Sprout, Users, HeartHandshake, Smartphone } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const ServiceCards = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const services = [
    {
      icon: Sprout,
      title: '智慧农业',
      description: '现代农业技术与物联网结合，提升农业生产效率',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      icon: Users,
      title: '社会治理',
      description: '数字化治理平台，提升乡村管理水平',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: HeartHandshake,
      title: '社会化服务',
      description: '便民服务一站式平台，提供全方位服务',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      icon: Smartphone,
      title: '应用中心',
      description: '丰富的数字应用，满足乡村生活各种需求',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {services.map((service, index) => (
        <Card
          key={index}
          className={`group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-2 ${
            hoveredCard === index ? 'scale-105' : ''
          }`}
          onMouseEnter={() => setHoveredCard(index)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <CardHeader className="text-center">
            <div className={`w-16 h-16 mx-auto rounded-full ${service.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
              <service.icon className={`h-8 w-8 ${service.color}`} />
            </div>
            <CardTitle className="text-lg font-semibold">{service.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-center text-muted-foreground">
              {service.description}
            </CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ServiceCards;
