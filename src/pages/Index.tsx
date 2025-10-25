import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  category: 'boys' | 'girls' | 'sale';
  image: string;
}

const products: Product[] = [
  { id: 1, name: 'Платье принцессы', price: 2990, category: 'girls', image: 'https://cdn.poehali.dev/projects/6a7e589a-8a58-4854-8bdb-688da7ee88a3/files/ce9ab5dc-faea-4781-a388-5ad0eaa09eae.jpg' },
  { id: 2, name: 'Футболка с динозавром', price: 1290, category: 'boys', image: 'https://cdn.poehali.dev/projects/6a7e589a-8a58-4854-8bdb-688da7ee88a3/files/6103551c-70d3-44a9-97ff-15f1b9ad7ac6.jpg' },
  { id: 3, name: 'Юбка с единорогом', price: 1890, oldPrice: 2890, category: 'sale', image: 'https://cdn.poehali.dev/projects/6a7e589a-8a58-4854-8bdb-688da7ee88a3/files/ce9ab5dc-faea-4781-a388-5ad0eaa09eae.jpg' },
  { id: 4, name: 'Комбинезон супергероя', price: 3490, category: 'boys', image: 'https://cdn.poehali.dev/projects/6a7e589a-8a58-4854-8bdb-688da7ee88a3/files/6103551c-70d3-44a9-97ff-15f1b9ad7ac6.jpg' },
  { id: 5, name: 'Свитер с бабочками', price: 2190, oldPrice: 3190, category: 'sale', image: 'https://cdn.poehali.dev/projects/6a7e589a-8a58-4854-8bdb-688da7ee88a3/files/ce9ab5dc-faea-4781-a388-5ad0eaa09eae.jpg' },
  { id: 6, name: 'Штаны с машинками', price: 1590, category: 'boys', image: 'https://cdn.poehali.dev/projects/6a7e589a-8a58-4854-8bdb-688da7ee88a3/files/6103551c-70d3-44a9-97ff-15f1b9ad7ac6.jpg' },
  { id: 7, name: 'Платье балерины', price: 3290, category: 'girls', image: 'https://cdn.poehali.dev/projects/6a7e589a-8a58-4854-8bdb-688da7ee88a3/files/ce9ab5dc-faea-4781-a388-5ad0eaa09eae.jpg' },
  { id: 8, name: 'Куртка космонавта', price: 4490, oldPrice: 5990, category: 'sale', image: 'https://cdn.poehali.dev/projects/6a7e589a-8a58-4854-8bdb-688da7ee88a3/files/6103551c-70d3-44a9-97ff-15f1b9ad7ac6.jpg' },
];

export default function Index() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'boys' | 'girls' | 'sale'>('all');
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.product.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.product.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.product.id !== productId));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent via-secondary to-muted">
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b-4 border-primary/20 shadow-lg">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-4xl magic-twinkle">✨</div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Сказочный магазин
            </h1>
          </div>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button size="lg" className="relative bg-gradient-to-r from-primary to-accent hover:scale-105 transition-transform">
                <Icon name="ShoppingCart" size={24} />
                {cartCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-destructive text-white rounded-full h-6 w-6 flex items-center justify-center">
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-lg">
              <SheetHeader>
                <SheetTitle className="text-2xl">Ваша корзина 🛒</SheetTitle>
              </SheetHeader>
              <div className="mt-8 space-y-4">
                {cart.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">Корзина пуста</p>
                ) : (
                  <>
                    {cart.map(item => (
                      <Card key={item.product.id}>
                        <CardContent className="p-4 flex items-center gap-4">
                          <img 
                            src={item.product.image} 
                            alt={item.product.name}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold">{item.product.name}</h3>
                            <p className="text-sm text-muted-foreground">Количество: {item.quantity}</p>
                            <p className="font-bold text-primary">{item.product.price * item.quantity} ₽</p>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => removeFromCart(item.product.id)}
                          >
                            <Icon name="Trash2" size={20} />
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                    <div className="border-t pt-4 mt-4">
                      <div className="flex justify-between text-xl font-bold mb-4">
                        <span>Итого:</span>
                        <span className="text-primary">{cartTotal} ₽</span>
                      </div>
                      <Button size="lg" className="w-full bg-gradient-to-r from-primary to-accent">
                        Оформить заказ ✨
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      <section className="relative py-20 overflow-hidden">
        <div className="absolute top-10 left-10 text-6xl magic-float opacity-30">☁️</div>
        <div className="absolute top-20 right-20 text-5xl magic-twinkle opacity-40">⭐</div>
        <div className="absolute bottom-10 left-1/4 text-4xl magic-float opacity-30">🌈</div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Волшебный мир детской моды
          </h2>
          <p className="text-xl md:text-2xl text-foreground/80 mb-8 animate-fade-in">
            Сказочная одежда для самых маленьких волшебников! ✨
          </p>
          <div className="relative w-full max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl animate-scale-in">
            <img 
              src="https://cdn.poehali.dev/projects/6a7e589a-8a58-4854-8bdb-688da7ee88a3/files/a6c94ebb-b12b-4ac3-828e-71b7c7254ab6.jpg"
              alt="Сказочный магазин"
              className="w-full h-[400px] object-cover"
            />
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <Button 
              size="lg"
              variant={activeCategory === 'all' ? 'default' : 'outline'}
              onClick={() => setActiveCategory('all')}
              className="rounded-full text-lg px-8"
            >
              🌟 Все товары
            </Button>
            <Button 
              size="lg"
              variant={activeCategory === 'boys' ? 'default' : 'outline'}
              onClick={() => setActiveCategory('boys')}
              className="rounded-full text-lg px-8"
            >
              🚀 Для мальчиков
            </Button>
            <Button 
              size="lg"
              variant={activeCategory === 'girls' ? 'default' : 'outline'}
              onClick={() => setActiveCategory('girls')}
              className="rounded-full text-lg px-8"
            >
              🦄 Для девочек
            </Button>
            <Button 
              size="lg"
              variant={activeCategory === 'sale' ? 'default' : 'outline'}
              onClick={() => setActiveCategory('sale')}
              className="rounded-full text-lg px-8"
            >
              🎁 Скидки
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <Card 
                key={product.id} 
                className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in border-4 border-primary/10"
              >
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-64 object-cover"
                  />
                  {product.oldPrice && (
                    <Badge className="absolute top-4 right-4 bg-destructive text-white text-lg px-3 py-1">
                      🔥 Скидка
                    </Badge>
                  )}
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3">{product.name}</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl font-bold text-primary">{product.price} ₽</span>
                    {product.oldPrice && (
                      <span className="text-lg text-muted-foreground line-through">{product.oldPrice} ₽</span>
                    )}
                  </div>
                  <Button 
                    className="w-full bg-gradient-to-r from-primary to-accent hover:scale-105 transition-transform"
                    onClick={() => addToCart(product)}
                  >
                    <Icon name="ShoppingCart" size={20} className="mr-2" />
                    В корзину
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 py-12 mt-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center gap-4 mb-6 text-4xl">
            <span className="magic-twinkle">✨</span>
            <span className="magic-float">🌟</span>
            <span className="magic-twinkle">💫</span>
          </div>
          <p className="text-lg text-foreground/80">
            © 2024 Сказочный магазин. Волшебство каждый день! 🎈
          </p>
        </div>
      </footer>
    </div>
  );
}