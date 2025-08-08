# 🚀 VectorShift Pipeline Builder

A powerful visual pipeline builder application for creating data processing workflows with drag-and-drop functionality.

## ✨ Features

- **Visual Pipeline Creation**: Drag and drop nodes to build complex workflows
- **9 Node Types**: Input, LLM, Output, Text, Filter, Transform, Conditional, Delay, API
- **Dynamic Text Nodes**: Auto-resizing with variable parsing (`{{variable}}` syntax)
- **DAG Validation**: Automatic cycle detection for pipeline validation
- **Modern UI**: Dark theme with glassmorphism effects
- **Real-time Processing**: Live pipeline analysis and validation

## 🛠️ Tech Stack

**Frontend**:
- React 18 with Create React App
- ReactFlow for visual workflows
- Zustand for state management
- Modern CSS with glassmorphism design

**Backend**:
- FastAPI (Python)
- Pydantic for data validation
- CORS enabled for frontend integration

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Python 3.8+

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/anchaljethliya/pipeline-verification-system.git
cd pipeline-verification-system
```

2. **Frontend Setup**
```bash
cd frontend
npm install
npm start
```

3. **Backend Setup**
```bash
cd backend
pip install fastapi uvicorn
python -m uvicorn main:app --reload
```

### Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000

## 🎯 How to Use

1. **Build Pipeline**: Drag nodes from the left sidebar to the canvas
2. **Connect Nodes**: Click and drag between node handles to create connections
3. **Configure Nodes**: Set names, types, and parameters for each node
4. **Test Variables**: Use `{{variable}}` syntax in Text nodes to create dynamic inputs
5. **Validate**: Click "Submit Pipeline" to check for cycles and get analysis

## 📊 Pipeline Analysis

The system provides:
- **Node Count**: Total number of nodes in the pipeline
- **Edge Count**: Total number of connections
- **DAG Validation**: Checks if the pipeline forms a valid Directed Acyclic Graph
- **Cycle Detection**: Identifies any circular dependencies

## 🏗️ Architecture

### Node Abstraction
All nodes inherit from a base `BaseNode` component for consistency and maintainability.

### State Management
Uses Zustand for efficient state management with ReactFlow integration.

### Backend Validation
FastAPI backend with sophisticated cycle detection algorithm using DFS traversal.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Developer

**Anchal Jethliya**
- GitHub: [@anchaljethliya](https://github.com/anchaljethliya)
- Email: anchaljethliya@gmail.com

---

⭐ Star this repository if you find it helpful!
