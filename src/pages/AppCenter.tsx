
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ApplicationCenter from '@/components/ApplicationCenter';

const AppCenter = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold mb-4 text-foreground">应用中心</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            丰富的数字应用生态，满足乡村生活的各种需求
          </p>
        </div>

        <div className="mb-16">
          <ApplicationCenter />
        </div>

        <div className="text-center animate-fade-in">
          <p className="text-muted-foreground">
            更多应用正在开发中，敬请期待...
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AppCenter;
