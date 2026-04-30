import { motion } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto py-12 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="flex justify-center mb-8">
          <div className="relative">
             <div className="absolute inset-0 bg-gold/20 blur-2xl rounded-full scale-110" />
             <Sparkles size={64} className="text-gold relative animate-pulse" />
          </div>
        </div>
        
        <h1 className="text-5xl md:text-7xl mb-6 text-slate-800 leading-tight">
          漫長的旅程中，<br />
          <span className="text-gold">那一杯茶的回憶。</span>
        </h1>
        
        <p className="text-xl text-slate-500 font-serif mb-12 max-w-2xl mx-auto leading-relaxed italic">
          「這杯茶的味道，和八十年前海塔泡的一模一樣呢。」
        </p>

        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <Link to="/menu" className="gold-button flex items-center gap-2 group">
            開啟菜單 <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <p className="text-slate-400 font-serif text-sm">
            Frieren: Beyond Journey's End Style Tea Experience
          </p>
        </div>
      </motion.div>

      <div className="mt-24 grid md:grid-cols-3 gap-8">
        {[
          { title: '精選茶葉', desc: '從邊境森林採集的魔法茶葉' },
          { title: '即時配送', desc: '比飛行魔法還要迅速' },
          { title: '管理面板', desc: '為魔導士準備的後台系統' }
        ].map((feat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.2 }}
            className="magic-card p-6"
          >
            <h3 className="text-xl mb-2 text-gold">{feat.title}</h3>
            <p className="text-slate-500 font-serif">{feat.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
