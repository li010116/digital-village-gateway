
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const SocialGovernance = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold mb-4 text-foreground">社会治理</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            构建数字化治理体系，提升乡村治理现代化水平
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1493962853295-0fd70327578a?w=600&h=400&fit=crop"
              alt="社会治理"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
          
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-3xl font-semibold text-foreground">数字化治理新模式</h2>
            <p className="text-muted-foreground leading-relaxed">
              运用大数据、云计算等技术手段，构建智慧治理平台，
              实现治理主体多元化、治理方式智能化、治理过程透明化。
            </p>
            <ul className="space-y-3">
              {[
                '网格化管理',
                '便民服务平台',
                '矛盾纠纷调解',
                '应急指挥系统',
                '党建工作平台'
              ].map((item, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SocialGovernance;
