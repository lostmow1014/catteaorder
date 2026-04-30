import { useState } from 'react';
import { motion } from 'motion/react';
import { Scroll, CheckCircle, Clock, XCircle, Filter } from 'lucide-react';

interface Order {
  id: string;
  customerName: string;
  items: string;
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
  time: string;
}

const MOCK_ORDERS: Order[] = [
  { id: 'Q-7781', customerName: '費倫 (Fern)', items: '茉綠茶凍拿鐵 L x1', total: 65, status: 'pending', time: '14:20' },
  { id: 'Q-7782', customerName: '修塔爾克 (Stark)', items: '頂級可可拿鐵 L x2', total: 150, status: 'completed', time: '13:45' },
  { id: 'Q-7783', customerName: '海塔 (Heiter)', items: '鮮奶茶 M x1', total: 45, status: 'cancelled', time: '12:10' },
];

export default function Admin() {
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

  const filteredOrders = orders.filter(o => filter === 'all' || o.status === filter);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-4xl mb-2">一級魔導士考驗面板</h2>
          <p className="font-serif text-slate-500 italic">「工作就像是為了以後能輕鬆一點，現在才要努力。」</p>
        </div>
        
        <div className="flex gap-2">
          {['all', 'pending', 'completed'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-4 py-1 rounded-full text-sm font-serif border transition-all ${filter === f ? 'border-gold bg-gold text-white' : 'border-slate-200 text-slate-400'}`}
            >
              {f.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6">
        {filteredOrders.map((order, i) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="magic-card p-6 flex flex-col md:flex-row justify-between items-center group relative overflow-hidden"
          >
            {/* Status Indicator Bar */}
            <div className={`absolute left-0 top-0 bottom-0 w-1 ${
              order.status === 'completed' ? 'bg-green-400' : 
              order.status === 'pending' ? 'bg-gold' : 'bg-red-400'
            }`} />

            <div className="flex gap-6 items-center">
              <div className="bg-slate-50 p-4 rounded-xl text-center min-w-[80px]">
                <p className="text-xs text-slate-400 font-mono">{order.id}</p>
                <p className="text-sm font-serif font-bold text-slate-600">{order.time}</p>
              </div>
              
              <div>
                <h4 className="text-xl text-slate-800">{order.customerName}</h4>
                <p className="text-slate-500 font-serif">{order.items}</p>
              </div>
            </div>

            <div className="flex items-center gap-12 mt-4 md:mt-0">
              <div className="text-right">
                <p className="text-xs text-slate-400 uppercase tracking-widest">Total</p>
                <p className="text-2xl font-serif text-gold">${order.total}</p>
              </div>

              <div className="flex gap-2">
                {order.status === 'pending' && (
                  <button className="p-2 text-green-500 hover:bg-green-50 rounded-full transition-colors" title="完成委託">
                    <CheckCircle size={24} />
                  </button>
                )}
                <button className="p-2 text-red-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors" title="取消委託">
                  <XCircle size={24} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-20 glass-panel p-12 rounded-3xl text-center border-dashed border-2 border-gold/20">
        <Scroll className="text-gold/30 mx-auto mb-4" size={48} />
        <h3 className="text-2xl text-slate-400 mb-4">更多冒險紀錄正在同步中...</h3>
        <p className="text-sm text-slate-300 font-serif">
          Firebase 資料庫連接狀態: <span className="text-red-300">尚未初始化 (需接受服務條款)</span>
        </p>
      </div>
    </div>
  );
}
