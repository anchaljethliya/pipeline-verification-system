import React, { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  const handles = [
    {
      id: `${id}-value`,
      type: 'target',
      position: Position.Left
    },
    {
      id: `${id}-output`,
      type: 'source',
      position: Position.Right
    }
  ];

  return (
    <BaseNode 
      id={id} 
      data={data} 
      title="Output"
      handles={handles}
      style={{ backgroundColor: '#fef2f2', borderColor: '#ef4444' }}
    >
      <div style={{ marginBottom: '8px' }}>
        <label style={{ fontSize: '11px', color: '#374151', display: 'block', marginBottom: '4px' }}>
          Name:
        </label>
        <input
          type="text"
          value={currName}
          onChange={handleNameChange}
          style={{
            width: '100%',
            padding: '4px 8px',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            fontSize: '12px'
          }}
        />
      </div>
      
      <div>
        <label style={{ fontSize: '11px', color: '#374151', display: 'block', marginBottom: '4px' }}>
          Type:
        </label>
        <select
          value={outputType}
          onChange={handleTypeChange}
          style={{
            width: '100%',
            padding: '4px 8px',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            fontSize: '12px'
          }}
        >
          <option value="Text">Text</option>
          <option value="Image">Image</option>
        </select>
      </div>
    </BaseNode>
  );
};
