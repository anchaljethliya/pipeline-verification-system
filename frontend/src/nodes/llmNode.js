import React from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  const handles = [
    {
      id: `${id}-system`,
      type: 'target',
      position: Position.Left,
    },
    {
      id: `${id}-prompt`,
      type: 'target', 
      position: Position.Left,
    },
    {
      id: `${id}-response`,
      type: 'source',
      position: Position.Right,
    }
  ];

  return (
    <BaseNode 
      id={id} 
      data={data} 
      title="LLM"
      handles={handles}
      style={{ backgroundColor: '#fef3c7', borderColor: '#f59e0b' }}
    >
      <div style={{ 
        textAlign: 'center', 
        color: '#92400e',
        fontSize: '14px',
        fontWeight: '500'
      }}>
        🤖 Language Model
      </div>
    </BaseNode>
  );
};
