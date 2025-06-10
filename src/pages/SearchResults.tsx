
import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [filteredResults, setFilteredResults] = useState<any[]>([]);

  // 所有可搜索的内容
  const searchableContent = [
    {
      id: '0',
      type: 'app',
      name: '农作物监测',
      description: '实时监测农作物生长状态',
      category: '智慧农业',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      path: '/app-detail/0'
    },
    {
      id: '1',
      type: 'app',
      name: '天气预报',
      description: '精准的农业气象服务',
      category: '智慧农业',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      path: '/app-detail/1'
    },
    {
      id: '2',
      type: 'app',
      name: '农产品价格',
      description: '实时农产品市场价格',
      category: '智慧农业',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      path: '/app-detail/2'
    },
    {
      id: 'smart-agriculture',
      type: 'page',
      name: '智慧农业',
      description: '现代化农业技术与数字化管理',
      category: '页面',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      path: '/smart-agriculture'
    },
    {
      id: 'social-governance',
      type: 'page',
      name: '社会治理',
      description: '数字化社会管理与治理服务',
      category: '页面',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      path: '/social-governance'
    },
    {
      id: 'social-services',
      type: 'page',
      name: '社会化服务',
      description: '全方位便民服务平台',
      category: '页面',
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
      path: '/social-services'
    }
  ];

  useEffect(() => {
    const query = searchParams.get('q') || '';
    setSearchQuery(query);
    
    if (query.trim()) {
      const results = searchableContent.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredResults(results);
    } else {
      setFilteredResults([]);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* 搜索头部 */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4 text-foreground">搜索结果</h1>
            
            {/* 搜索框 */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="搜索应用、页面..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {searchQuery && (
              <p className="text-muted-foreground">
                找到 <span className="font-medium">{filteredResults.length}</span> 个关于 "
                <span className="font-medium">{searchQuery}</span>" 的结果
              </p>
            )}
          </div>

          {/* 搜索结果 */}
          <div className="space-y-4">
            {filteredResults.length > 0 ? (
              filteredResults.map((item) => (
                <Link key={item.id} to={item.path}>
                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardHeader className="flex flex-row items-center space-y-0 space-x-4">
                      <div className={`w-12 h-12 rounded-lg ${item.bgColor} flex items-center justify-center flex-shrink-0`}>
                        <span className={`text-lg font-bold ${item.color}`}>
                          {item.name.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{item.name}</CardTitle>
                        <CardDescription className="mt-1">
                          {item.description}
                        </CardDescription>
                        <div className="flex items-center space-x-2 mt-2">
                          <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                            {item.category}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {item.type === 'app' ? '应用' : '页面'}
                          </span>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
              ))
            ) : searchQuery ? (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">未找到相关结果</h3>
                <p className="text-muted-foreground">
                  尝试使用不同的关键词或检查拼写
                </p>
              </div>
            ) : (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">开始搜索</h3>
                <p className="text-muted-foreground">
                  输入关键词搜索应用和页面
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SearchResults;
