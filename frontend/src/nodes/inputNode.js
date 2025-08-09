import React, { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  const handles = [
    {
      id: `${id}-input`,
      type: 'target',
      position: Position.Left
    },
    {
      id: `${id}-value`,
      type: 'source',
      position: Position.Right
    }
  ];

  return (
    <BaseNode 
      id={id} 
      data={data} 
      title="Input"
      handles={handles}
      style={{ backgroundColor: '#f0fdf4', borderColor: '#22c55e' }}
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
          value={inputType}
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
          <option value="File">File</option>
        </select>
      </div>
    </BaseNode>
  );
};
