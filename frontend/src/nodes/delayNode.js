import React, { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const DelayNode = ({ id, data }) => {
  const [duration, setDuration] = useState(data?.duration || '1000');

  const handles = [
    { id: `${id}-input`, type: 'target', position: Position.Left },
    { id: `${id}-output`, type: 'source', position: Position.Right }
  ];

  return (
    <BaseNode 
      id={id} 
      data={data} 
      title="Delay"
      handles={handles}
      style={{ backgroundColor: '#f0f9ff', borderColor: '#0ea5e9' }}
    >
      <div style={{ marginBottom: '8px' }}>
        <label style={{ fontSize: '11px', color: '#374151', display: 'block', marginBottom: '4px' }}>
          Duration (ms):
        </label>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          style={{ width: '100%', padding: '4px', fontSize: '12px' }}
        />
      </div>
      <div style={{ fontSize: '10px', color: '#6b7280' }}>
        ⏱️ Wait before output
      </div>
    </BaseNode>
  );
};
