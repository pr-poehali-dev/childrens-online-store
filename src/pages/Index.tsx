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
  category: 'winter' | 'spring' | 'summer' | 'autumn' | 'sale';
  image: string;
}

const products: Product[] = [
  { id: 1, name: 'Зимняя куртка с снежинками', price: 4990, category: 'winter', image: 'https://cdn.poehali.dev/projects/6a7e589a-8a58-4854-8bdb-688da7ee88a3/files/40a2ed5e-abb3-4ae9-b83e-2ccbf97f192c.jpg' },
  { id: 2, name: 'Теплый свитер со снеговиком', price: 2790, category: 'winter', image: 'https://cdn.poehali.dev/projects/6a7e589a-8a58-4854-8bdb-688da7ee88a3/files/40a2ed5e-abb3-4ae9-b83e-2ccbf97f192c.jpg' },
  { id: 3, name: 'Шапка и шарф с оленями', price: 1490, category: 'winter', image: 'https://cdn.poehali.dev/projects/6a7e589a-8a58-4854-8bdb-688da7ee88a3/files/40a2ed5e-abb3-4ae9-b83e-2ccbf97f192c.jpg' },
  { id: 4, name: 'Комбинезон-снеговик', price: 5490, oldPrice: 6990, category: 'sale', image: 'https://cdn.poehali.dev/projects/6a7e589a-8a58-4854-8bdb-688da7ee88a3/files/40a2ed5e-abb3-4ae9-b83e-2ccbf97f192c.jpg' },
  
  { id: 5, name: 'Весенняя ветровка с цветами', price: 3290, category: 'spring', image: 'https://cdn.poehali.dev/projects/6a7e589a-8a58-4854-8bdb-688da7ee88a3/files/e10354df-a39e-4e62-868d-203be80f3746.jpg' },
  { id: 6, name: 'Платье с бабочками', price: 2990, category: 'spring', image: 'https://cdn.poehali.dev/projects/6a7e589a-8a58-4854-8bdb-688da7ee88a3/files/e10354df-a39e-4e62-868d-203be80f3746.jpg' },
  { id: 7, name: 'Легкая кофточка весенняя', price: 1990, category: 'spring', image: 'https://cdn.poehali.dev/projects/6a7e589a-8a58-4854-8bdb-688da7ee88a3/files/e10354df-a39e-4e62-868d-203be80f3746.jpg' },
  { id: 8, name: 'Джинсы с вышивкой цветов', price: 2490, oldPrice: 3490, category: 'sale', image: 'https://cdn.poehali.dev/projects/6a7e589a-8a58-4854-8bdb-688da7ee88a3/files/e10354df-a39e-4e62-868d-203be80f3746.jpg' },
  
  { id: 9, name: 'Летняя футболка с мороженым', price: 1290, category: 'summer', image: 'https://cdn.poehali.dev/projects/6a7e589a-8a58-4854-8bdb-688da7ee88a3/files/e2103b6a-1665-4c3d-b6ea-4823575b0d0c.jpg' },
  { id: 10, name: 'Пляжные шорты с пальмами', price: 1590, category: 'summer', image: 'https://cdn.poehali.dev/projects/6a7e589a-8a58-4854-8bdb-688da7ee88a3/files/e2103b6a-1665-4c3d-b6ea-4823575b0d0c.jpg' },
  { id: 11, name: 'Панамка от солнца', price: 890, category: 'summer', image: 'https://cdn.poehali.dev/projects/6a7e589a-8a58-4854-8bdb-688da7ee88a3/files/e2103b6a-1665-4c3d-b6ea-4823575b0d0c.jpg' },
  { id: 12, name: 'Летнее платье с арбузами', price: 2190, oldPrice: 2990, category: 'sale', image: 'https://cdn.poehali.dev/projects/6a7e589a-8a58-4854-8bdb-688da7ee88a3/files/e2103b6a-1665-4c3d-b6ea-4823575b0d0c.jpg' },
  
  { id: 13, name: 'Осенний свитер с листьями', price: 2790, category: 'autumn', image: 'https://cdn.poehali.dev/projects/6a7e589a-8a58-4854-8bdb-688da7ee88a3/files/32072e04-64ae-46c0-86fd-fb9d40e7f006.jpg' },
  { id: 14, name: 'Джинсы осенние утепленные', price: 2490, category: 'autumn', image: 'https://cdn.poehali.dev/projects/6a7e589a-8a58-4854-8bdb-688da7ee88a3/files/32072e04-64ae-46c0-86fd-fb9d40e7f006.jpg' },
  { id: 15, name: 'Худи с тыквами', price: 2990, category: 'autumn', image: 'https://cdn.poehali.dev/projects/6a7e589a-8a58-4854-8bdb-688da7ee88a3/files/32072e04-64ae-46c0-86fd-fb9d40e7f006.jpg' },
  { id: 16, name: 'Осенний плащ дождевик', price: 3490, oldPrice: 4490, category: 'sale', image: 'https://cdn.poehali.dev/projects/6a7e589a-8a58-4854-8bdb-688da7ee88a3/files/32072e04-64ae-46c0-86fd-fb9d40e7f006.jpg' },
];

export default function Index() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'winter' | 'spring' | 'summer' | 'autumn' | 'sale'>('all');
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
              variant={activeCategory === 'winter' ? 'default' : 'outline'}
              onClick={() => setActiveCategory('winter')}
              className="rounded-full text-lg px-8"
            >
              ❄️ Зима
            </Button>
            <Button 
              size="lg"
              variant={activeCategory === 'spring' ? 'default' : 'outline'}
              onClick={() => setActiveCategory('spring')}
              className="rounded-full text-lg px-8"
            >
              🌸 Весна
            </Button>
            <Button 
              size="lg"
              variant={activeCategory === 'summer' ? 'default' : 'outline'}
              onClick={() => setActiveCategory('summer')}
              className="rounded-full text-lg px-8"
            >
              ☀️ Лето
            </Button>
            <Button 
              size="lg"
              variant={activeCategory === 'autumn' ? 'default' : 'outline'}
              onClick={() => setActiveCategory('autumn')}
              className="rounded-full text-lg px-8"
            >
              🍂 Осень
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