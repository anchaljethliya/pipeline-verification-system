import React from 'react';

export const DraggableNode = ({ type, label, description, icon }) => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className="draggable-node"
      onDragStart={(event) => onDragStart(event, type)}
      draggable
    >
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
        <span style={{ fontSize: '16px', marginRight: '8px' }}>{icon}</span>
        <div className="node-title">{label}</div>
      </div>
      <div className="node-description">{description}</div>
    </div>
  );
};
  