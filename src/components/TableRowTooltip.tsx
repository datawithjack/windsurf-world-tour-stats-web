import { useState } from 'react';
import type { ReactNode } from 'react';

interface TableRowTooltipProps {
  children: ReactNode;
  content: string;
  className?: string;
}

const TableRowTooltip = ({ children, content, className = '' }: TableRowTooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: e.clientX,
      y: rect.top - 10, // Position above the row
    });
    setIsVisible(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: e.clientX,
      y: rect.top - 10,
    });
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  return (
    <>
      <tr
        className={className}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </tr>
      {isVisible && (
        <div
          className="fixed z-50 bg-slate-800/95 backdrop-blur-sm border border-slate-700/50 rounded-lg px-3 py-2 shadow-lg pointer-events-none"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
            transform: 'translate(-50%, -100%)',
          }}
        >
          <p className="text-xs text-gray-300 whitespace-nowrap">{content}</p>
        </div>
      )}
    </>
  );
};

export default TableRowTooltip;
