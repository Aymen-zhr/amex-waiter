import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Flame } from 'lucide-react';
import { Badge } from '../common/Badge';
import { tapSpring } from '../../styles/motion';
import type { DiningOrder } from '../../types/order';

interface OrderCardProps {
  order: DiningOrder;
  onFireNextCourse?: (orderId: string) => void;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order, onFireNextCourse }) => {
  return (
    <motion.div
      whileTap={tapSpring.whileTap}
      transition={tapSpring.transition}
      className="p-5 bg-white rounded-2xl border border-lumiere-border shadow-luxury flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-lumiere-borderLight">
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-2xl font-medium text-lumiere-textPrimary">
              Table {order.tableNumber}
            </span>
            <span className="font-mono text-xs text-lumiere-textCaption">
              Srv: {order.serverName}
            </span>
          </div>
          <Badge
            variant={
              order.status === 'urgent'
                ? 'terracotta'
                : order.status === 'active'
                ? 'brass'
                : 'emerald'
            }
            dot
            size="sm"
          >
            {order.status.toUpperCase()}
          </Badge>
        </div>

        {/* Order Items */}
        <div className="py-3 space-y-2.5">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-start justify-between text-xs">
              <div className="flex items-start gap-2">
                <span className="font-mono font-bold text-lumiere-brass">
                  {item.quantity}×
                </span>
                <div>
                  <span className="font-medium text-lumiere-textPrimary">
                    {item.name}
                  </span>
                  {item.notes && (
                    <p className="text-[11px] text-lumiere-textCaption italic mt-0.5">
                      {item.notes}
                    </p>
                  )}
                  {item.allergens && (
                    <span className="inline-block mt-0.5 text-[10px] text-lumiere-terracotta font-mono font-medium">
                      Allergy: {item.allergens.join(', ')}
                    </span>
                  )}
                </div>
              </div>
              <span className="font-mono text-lumiere-textMuted tabular-nums">
                € {(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Dispatch Actions */}
      <div className="pt-3 border-t border-lumiere-borderLight flex items-center justify-between">
        <div className="flex items-center gap-1.5 font-mono text-xs text-lumiere-textCaption">
          <Clock className="w-3.5 h-3.5" />
          <span>{order.orderedAt}</span>
        </div>

        <button
          onClick={() => onFireNextCourse?.(order.id)}
          className="h-8 px-3 rounded-lg bg-lumiere-textPrimary hover:bg-black text-white text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Flame className="w-3.5 h-3.5 text-lumiere-brassLight" />
          Fire Next
        </button>
      </div>
    </motion.div>
  );
};