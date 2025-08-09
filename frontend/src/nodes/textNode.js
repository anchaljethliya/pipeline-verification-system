import React, { useState, useEffect, useCallback } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const [dimensions, setDimensions] = useState({ width: 200, height: 100 });

  // Extract variables from text using regex
  const extractVariables = useCallback((text) => {
    const regex = /\{\{(\w+)\}\}/g;
    const matches = [];
    let match;
    
    while ((match = regex.exec(text)) !== null) {
      if (!matches.includes(match[1])) {
        matches.push(match[1]);
      }
    }
    
    return matches;
  }, []);

  // Calculate dynamic dimensions based on text content
  const calculateDimensions = useCallback((text) => {
    const lines = text.split('\n').length;
    const maxLineLength = Math.max(...text.split('\n').map(line => line.length));
    
    const width = Math.max(200, Math.min(400, maxLineLength * 8 + 40));
    const height = Math.max(100, lines * 20 + 80);
    
    return { width, height };
  }, []);

  // Update variables and dimensions when text changes
  useEffect(() => {
    const newVariables = extractVariables(currText);
    const newDimensions = calculateDimensions(currText);
    
    setVariables(newVariables);
    setDimensions(newDimensions);
  }, [currText, extractVariables, calculateDimensions]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  // Create handles: variable inputs on left, output on right
  const handles = [
    // Dynamic input handles for each variable
    ...variables.map((variable, index) => ({
      id: `${id}-${variable}`,
      type: 'target',
      position: Position.Left,
      style: {
        top: `${30 + (index * 25)}px`
      }
    })),
    // Output handle
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
      title="Text"
      handles={handles}
      style={{ 
        backgroundColor: '#f8fafc', 
        borderColor: '#64748b',
        width: dimensions.width,
        minHeight: dimensions.height,
        resize: 'both'
      }}
    >
      <div style={{ marginBottom: '12px' }}>
        <textarea
          value={currText}
          onChange={handleTextChange}
          placeholder="Enter text with {{variables}}..."
          style={{
            width: '100%',
            height: `${Math.max(60, dimensions.height - 100)}px`,
            padding: '8px',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            fontSize: '12px',
            fontFamily: 'monospace',
            resize: 'vertical',
            outline: 'none'
          }}
        />
      </div>

      {/* Display detected variables */}
      {variables.length > 0 && (
        <div style={{ 
          fontSize: '10px', 
          color: '#6b7280',
          borderTop: '1px solid #e5e7eb',
          paddingTop: '8px'
        }}>
          <div style={{ fontWeight: '500', marginBottom: '4px' }}>Variables:</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            {variables.map((variable, index) => (
              <span 
                key={variable}
                style={{
                  backgroundColor: '#dbeafe',
                  color: '#1e40af',
                  padding: '2px 6px',
                  borderRadius: '12px',
                  fontSize: '10px'
                }}
              >
                {variable}
              </span>
            ))}
          </div>
        </div>
      )}
    </BaseNode>
  );
};
