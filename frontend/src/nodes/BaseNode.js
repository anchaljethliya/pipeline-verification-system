import React from 'react';
import { Handle } from 'reactflow';

export const BaseNode = ({ 
  id, 
  data, 
  title,
  children,
  handles = [],
  className = "",
  style = {}
}) => {

  const defaultStyle = {
    width: 200,
    minHeight: 80,
    padding: '12px',
    backgroundColor: '#ffffff',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    fontFamily: 'Inter, sans-serif',
    ...style
  };

  return (
    <div className={`base-node ${className}`} style={defaultStyle}>
      <div style={{ 
        fontSize: '12px', 
        fontWeight: 'bold', 
        color: '#64748b',
        marginBottom: '8px',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
      }}>
        {title}
      </div>
      
      <div style={{ flex: 1 }}>
        {children}
      </div>

      {/* Render dynamic handles */}
      {handles.map((handle) => (
        <Handle
          key={handle.id}
          type={handle.type}
          position={handle.position}
          id={handle.id}
          style={{
            backgroundColor: handle.type === 'source' ? '#10b981' : '#3b82f6',
            width: '8px',
            height: '8px',
            border: '2px solid white',
            ...handle.style
          }}
        />
      ))}
    </div>
  );
};
