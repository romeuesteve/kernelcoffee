import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const products = [
  {
    id: 1,
    icon: '[c]',
    name: 'Kernel Blend',
    description: 'Our signature blend, perfect for all-night coding sessions.',
    price: '$18.99',
  },
  {
    id: 2,
    icon: '{j}',
    name: 'Java Junkie',
    description: 'Extra bold roast for the serious caffeine enthusiast.',
    price: '$21.99',
  },
  {
    id: 3,
    icon: '</>',
    name: 'Script Brew',
    description: 'Light and smooth, ideal for morning standups.',
    price: '$19.99',
  },
  {
    id: 4,
    icon: '#',
    name: 'Python Press',
    description: 'Complex flavors with elegant simplicity.',
    price: '$20.99',
  },
  {
    id: 5,
    icon: '$',
    name: 'Shell Script',
    description: 'Powerful and direct, just like your favorite terminal commands.',
    price: '$17.99',
  },
  {
    id: 6,
    icon: '*',
    name: 'Wildcard Roast',
    description: 'A little bit of everything, perfect for any coding task.',
    price: '$22.99',
  },
];

export function Products() {
  return (
    <section id="products" className="min-h-screen py-24">
      <div className="container mx-auto px-8">
        <h2 className="text-5xl font-bold text-center mb-16">Our Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="hover:translate-y-[-4px] transition-transform duration-200 hover:border-primary">
              <CardHeader className="pb-4">
                <div className="w-full h-48 bg-gradient-to-br from-background to-secondary flex items-center justify-center rounded-t-lg">
                  <span className="text-6xl text-primary font-mono">{product.icon}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <CardTitle className="text-xl">{product.name}</CardTitle>
                <CardDescription>{product.description}</CardDescription>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <span className="text-2xl font-bold text-primary">{product.price}</span>
                <Button size="sm">Add to Cart</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
