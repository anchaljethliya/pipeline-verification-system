import React, { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const FilterNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || 'contains');
  const [value, setValue] = useState(data?.value || '');

  const handles = [
    { id: `${id}-input`, type: 'target', position: Position.Left },
    { id: `${id}-output`, type: 'source', position: Position.Right }
  ];

  return (
    <BaseNode 
      id={id} 
      data={data} 
      title="Filter"
      handles={handles}
      style={{ backgroundColor: '#f3e8ff', borderColor: '#8b5cf6' }}
    >
      <select
        value={condition}
        onChange={(e) => setCondition(e.target.value)}
        style={{ width: '100%', marginBottom: '8px', padding: '4px', fontSize: '12px' }}
      >
        <option value="contains">Contains</option>
        <option value="equals">Equals</option>
        <option value="startsWith">Starts with</option>
      </select>
      <input
        type="text"
        value={value}
        placeholder="Filter value"
        onChange={(e) => setValue(e.target.value)}
        style={{ width: '100%', padding: '4px', fontSize: '12px' }}
      />
    </BaseNode>
  );
};
