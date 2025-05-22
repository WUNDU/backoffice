import React, { useEffect, useState } from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { CardProps } from '~/types/types';

export const Card: React.FC<CardProps> = ({
  title,
  value,
  icon,
  trend,
  percentage,
  color,
  isCurrency = true
}) => {
  const Icon = icon;
  const [displayedValue, setDisplayedValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (value === 0) {
      setDisplayedValue(0);
      return;
    }

    setIsAnimating(true);
    const endValue = value;
    const duration = 1500; // 1.5 seconds animation
    const startTime = Date.now();

    const animateCount = () => {
      const currentTime = Date.now();
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Use easing function for smoother animation
      const easedProgress = 1 - Math.pow(1 - progress, 3); // ease-out cubic

      const currentValue = Math.floor(easedProgress * endValue);
      setDisplayedValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      } else {
        setDisplayedValue(endValue);
        setIsAnimating(false);
      }
    };

    // Start animation after a small delay
    const timer = setTimeout(() => {
      requestAnimationFrame(animateCount);
    }, 100);

    console.log(`Card Animation - Title: ${title}, Value: ${value}, Starting animation...`);

    return () => {
      clearTimeout(timer);
      setIsAnimating(false);
    };
  }, [value, title]);

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md animate-fadeInUp"> {/* Reduced padding from p-6 to p-4 */}
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2 rounded-lg ${color === 'primary' ? 'bg-primary/10 text-primary' :
          color === 'secondary' ? 'bg-secondary/10 text-secondary' :
            color === 'success' ? 'bg-green-100 text-green-600' :
              'bg-red-100 text-red-600'
          }`}>
          <Icon size={20} />
        </div>
        {trend && percentage !== undefined && (
          <div className={`flex items-center text-xs font-medium ${percentage > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {percentage > 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={15} />}
            <span>{Math.abs(percentage)}%</span>
          </div>
        )}
      </div>
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      {/* Further adjusted font size for responsiveness to ensure numbers appear well on all screens */}
      <p className={`text-base sm:text-lg md:text-xl font-bold mt-1 text-dark transition-all duration-300 ${isAnimating ? 'text-primary' : ''}`}>
        {isCurrency
          ? new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(displayedValue)
          : displayedValue.toLocaleString()}
      </p>
    </div>
  );
};
