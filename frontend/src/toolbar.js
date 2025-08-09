import React from 'react';
import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
  const nodeTypes = [
    { type: 'customInput', label: 'Input', description: 'Data source node', icon: '📥' },
    { type: 'llm', label: 'LLM', description: 'Language model processing', icon: '🤖' },
    { type: 'customOutput', label: 'Output', description: 'Data output node', icon: '📤' },
    { type: 'text', label: 'Text', description: 'Text processing with variables', icon: '📝' },
    { type: 'filter', label: 'Filter', description: 'Filter data based on conditions', icon: '🔍' },
    { type: 'transform', label: 'Transform', description: 'Transform text data', icon: '🔄' },
    { type: 'conditional', label: 'Conditional', description: 'Branch based on conditions', icon: '🔀' },
    { type: 'delay', label: 'Delay', description: 'Add processing delay', icon: '⏱️' },
    { type: 'api', label: 'API Call', description: 'External API integration', icon: '🌐' }
  ];

  return (
    <div>
      <h3 style={{ margin: '0 0 20px 0', color: '#1f2937', fontSize: '18px', fontWeight: '600' }}>
        Node Library
      </h3>
      
      <div style={{ marginBottom: '24px' }}>
        <h4 style={{ fontSize: '14px', color: '#6b7280', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Core Nodes
        </h4>
        {nodeTypes.slice(0, 4).map((node) => (
          <DraggableNode 
            key={node.type}
            type={node.type} 
            label={node.label}
            description={node.description}
            icon={node.icon}
          />
        ))}
      </div>

      <div>
        <h4 style={{ fontSize: '14px', color: '#6b7280', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Processing Nodes
        </h4>
        {nodeTypes.slice(4).map((node) => (
          <DraggableNode 
            key={node.type}
            type={node.type} 
            label={node.label}
            description={node.description}
            icon={node.icon}
          />
        ))}
      </div>
    </div>
  );
};
