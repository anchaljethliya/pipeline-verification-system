import React from 'react';
import './App.css';
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">VectorShift Pipeline Builder</h1>
        <div style={{ fontSize: '14px', color: '#6b7280' }}>
          Drag nodes from the toolbar to build your pipeline
        </div>
      </header>
      
      <div className="app-content">
        <div className="toolbar-container">
          <PipelineToolbar />
        </div>
        
        <div className="canvas-container">
          <PipelineUI />
          <div className="submit-container">
            <SubmitButton />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
