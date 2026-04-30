import { useState } from 'react';
import { motion } from 'motion/react';
import { Star, Heart, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const PRODUCTS = [
  { id: '1', name: '茉綠茶凍拿鐵', category: '鮮奶/拿鐵系列', priceM: null, priceL: 65, isStar: true },
  { id: '2', name: '粉條鮮奶茶', category: '鮮奶/拿鐵系列', priceM: 50, priceL: 65, isStar: true },
  { id: '3', name: '鮮奶茶', category: '鮮奶/拿鐵系列', priceM: 45, priceL: 60, isHeart: true },
  { id: '4', name: '珍珠鮮奶茶', category: '鮮奶/拿鐵系列', priceM: 45, priceL: 60, isHeart: true },
  { id: '5', name: '珍珠蜂蜜鮮奶普洱', category: '鮮奶/拿鐵系列', priceM: 50, priceL: 70, isHeart: true },
  { id: '6', name: '頂級可可拿鐵', category: '鮮奶/拿鐵系列', priceM: 60, priceL: 75, isHeart: true },
  { id: '7', name: '鮮奶冬瓜', category: '鮮奶/拿鐵系列', priceM: null, priceL: 60 },
  { id: '8', name: '粉圓鮮奶茶', category: '鮮奶/拿鐵系列', priceM: 45, priceL: 60 },
  { id: '9', name: '珍珠芝麻拿鐵', category: '鮮奶/拿鐵系列', priceM: null, priceL: 65, isHeart: true },
];

export default function Menu() {
  return (
    <div className="max-w-5xl mx-auto">
      <header className="mb-12 text-center">
        <h2 className="text-4xl mb-2 text-slate-800">魔法飲品選單</h2>
        <p className="font-serif text-slate-500">鮮奶 / 拿鐵系列</p>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PRODUCTS.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>
    </div>
  );
}

function ProductCard(props: any) {
  const { product, index } = props;
  const { addToCart } = useCart();
  const [size, setSize] = useState<'M' | 'L'>(product.priceM ? 'M' : 'L');
  const [qty, setQty] = useState(1);

  const price = size === 'M' ? product.priceM : product.priceL;

  const handleAdd = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: price!,
      size,
      quantity: qty
    });
    // Visual feedback could be added here
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      className="magic-card p-6 flex flex-col justify-between"
    >
      <div>
        <div className="flex justify-between items-start mb-4">
          <div className="flex gap-1">
            {product.isStar && <Star size={18} className="fill-gold text-gold" />}
            {product.isHeart && <Heart size={18} className="fill-red-400 text-red-400" />}
          </div>
          <span className="text-xs font-serif text-slate-400">#魔導飲品</span>
        </div>
        
        <h3 className="text-2xl mb-2 text-slate-800">{product.name}</h3>
        <p className="text-sm font-serif text-slate-500 mb-6">品味這一刻的從容。</p>
      </div>

      <div>
        <div className="flex gap-4 mb-4">
          {product.priceM && (
            <button 
              onClick={() => setSize('M')}
              className={`flex-1 py-1 rounded-md border transition-all ${size === 'M' ? 'border-gold bg-gold/5 text-gold' : 'border-slate-200 text-slate-400'}`}
            >
              M ${product.priceM}
            </button>
          )}
          <button 
            onClick={() => setSize('L')}
            className={`flex-1 py-1 rounded-md border transition-all ${size === 'L' ? 'border-gold bg-gold/5 text-gold' : 'border-slate-200 text-slate-400'}`}
          >
            L ${product.priceL}
          </button>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
            <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-2 hover:bg-slate-50"><Minus size={16}/></button>
            <span className="px-4 font-serif">{qty}</span>
            <button onClick={() => setQty(qty + 1)} className="p-2 hover:bg-slate-50"><Plus size={16}/></button>
          </div>
          
          <button 
            onClick={handleAdd}
            className="bg-gold/10 hover:bg-gold/20 text-gold p-3 rounded-full transition-colors"
          >
            <ShoppingBag size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
