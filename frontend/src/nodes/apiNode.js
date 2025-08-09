import React, { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const ApiNode = ({ id, data }) => {
  const [url, setUrl] = useState(data?.url || '');
  const [method, setMethod] = useState(data?.method || 'GET');

  const handles = [
    { id: `${id}-input`, type: 'target', position: Position.Left },
    { id: `${id}-response`, type: 'source', position: Position.Right }
  ];

  return (
    <BaseNode 
      id={id} 
      data={data} 
      title="API Call"
      handles={handles}
      style={{ backgroundColor: '#fdf4ff', borderColor: '#c084fc' }}
    >
      <select
        value={method}
        onChange={(e) => setMethod(e.target.value)}
        style={{ width: '100%', marginBottom: '8px', padding: '4px', fontSize: '12px' }}
      >
        <option value="GET">GET</option>
        <option value="POST">POST</option>
        <option value="PUT">PUT</option>
      </select>
      <input
        type="text"
        value={url}
        placeholder="API URL..."
        onChange={(e) => setUrl(e.target.value)}
        style={{ width: '100%', padding: '4px', fontSize: '12px' }}
      />
    </BaseNode>
  );
};
