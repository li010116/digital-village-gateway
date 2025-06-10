
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const SmartAgriculture = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold mb-4 text-foreground">智慧农业</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            运用现代信息技术，推动农业生产智能化、精准化、数字化发展
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-3xl font-semibold text-foreground">科技赋能现代农业</h2>
            <p className="text-muted-foreground leading-relaxed">
              通过物联网、大数据、人工智能等先进技术，实现农业生产的精准管理，
              提高农产品质量和产量，降低生产成本，促进农业可持续发展。
            </p>
            <ul className="space-y-3">
              {[
                '智能灌溉系统',
                '作物生长监测',
                '病虫害预警',
                '精准施肥指导',
                '农机智能调度'
              ].map((item, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1472396961693-142e6e269027?w=600&h=400&fit=crop"
              alt="智慧农业"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SmartAgriculture;
