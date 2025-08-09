import React, { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const TransformNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || 'uppercase');

  const handles = [
    { id: `${id}-input`, type: 'target', position: Position.Left },
    { id: `${id}-output`, type: 'source', position: Position.Right }
  ];

  return (
    <BaseNode 
      id={id} 
      data={data} 
      title="Transform"
      handles={handles}
      style={{ backgroundColor: '#ecfccb', borderColor: '#65a30d' }}
    >
      <select
        value={operation}
        onChange={(e) => setOperation(e.target.value)}
        style={{ width: '100%', padding: '6px', fontSize: '12px' }}
      >
        <option value="uppercase">UPPERCASE</option>
        <option value="lowercase">lowercase</option>
        <option value="trim">Trim spaces</option>
        <option value="reverse">Reverse</option>
      </select>
    </BaseNode>
  );
};
