/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Sparkles, ScrollText, User, ShoppingCart } from 'lucide-react';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Admin from './pages/Admin';
import Cart from './pages/Cart';
import { CartProvider, useCart } from './context/CartContext';

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div className="min-h-screen relative overflow-hidden flex flex-col">
          {/* Background Magical Elements */}
          <div className="fixed inset-0 pointer-events-none">
            <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-frieren-blue/10 blur-[100px] rounded-full animate-pulse" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-gold/5 blur-[100px] rounded-full animate-pulse " style={{ animationDelay: '2s' }} />
          </div>

          {/* Navigation */}
          <nav className="glass-panel sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 group">
              <Sparkles className="text-gold group-hover:rotate-12 transition-transform" />
              <span className="font-serif text-2xl tracking-widest text-slate-800">
                Frieren Tea
              </span>
            </Link>
            
            <div className="flex items-center gap-6">
              <Link to="/menu" className="flex items-center gap-1 text-slate-600 hover:text-gold transition-colors font-serif">
                <ScrollText size={20} />
                <span>菜單</span>
              </Link>
              <Link to="/admin" className="flex items-center gap-1 text-slate-600 hover:text-gold transition-colors font-serif">
                <User size={20} />
                <span>魔導考驗 (後台)</span>
              </Link>
              <Link to="/cart" className="relative p-2 text-slate-700 hover:text-gold transition-colors">
                <ShoppingCart size={24} />
                <CartBadge />
              </Link>
            </div>
          </nav>

          <main className="flex-grow container mx-auto px-4 py-8 relative z-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </main>

          <footer className="py-8 text-center text-slate-400 font-serif text-sm">
            <p>即使是一千多年後，茶的味道依然不變。</p>
            <p className="mt-2">© 2026 Frieren Tea Journey</p>
          </footer>
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

function CartBadge() {
  const { items } = useCart();
  const count = items.reduce((sum, i) => sum + i.quantity, 0);
  
  if (count === 0) return null;

  return (
    <span className="absolute top-0 right-0 bg-gold text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full animate-bounce">
      {count}
    </span>
  );
}
