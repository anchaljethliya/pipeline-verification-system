import React, { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const ConditionalNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || 'if length > 10');

  const handles = [
    { id: `${id}-input`, type: 'target', position: Position.Left },
    { id: `${id}-true`, type: 'source', position: Position.Right },
    { id: `${id}-false`, type: 'source', position: Position.Right }
  ];

  return (
    <BaseNode 
      id={id} 
      data={data} 
      title="Conditional"
      handles={handles}
      style={{ backgroundColor: '#fef7cd', borderColor: '#eab308' }}
    >
      <input
        type="text"
        value={condition}
        placeholder="Condition..."
        onChange={(e) => setCondition(e.target.value)}
        style={{ width: '100%', padding: '6px', fontSize: '12px' }}
      />
      <div style={{ fontSize: '10px', color: '#6b7280', marginTop: '4px' }}>
        TRUE ↗ FALSE ↘
      </div>
    </BaseNode>
  );
};
