
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const SocialServices = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold mb-4 text-foreground">社会化服务</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            提供全方位便民服务，让农民享受城市化的便利生活
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-3xl font-semibold text-foreground">一站式便民服务</h2>
            <p className="text-muted-foreground leading-relaxed">
              整合各类公共服务资源，构建便民服务网络，
              让农民就近享受教育、医疗、文化、金融等各类服务。
            </p>
            <ul className="space-y-3">
              {[
                '医疗健康服务',
                '教育培训平台',
                '金融支付服务',
                '物流配送网络',
                '文化娱乐活动'
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
              src="https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?w=600&h=400&fit=crop"
              alt="社会化服务"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SocialServices;
