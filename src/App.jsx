import React from 'react';
import PropertyGrid from './components/PropertyGrid.jsx';
import Footer from './components/Footer.jsx';
import { mockProperties } from './data/mockData.js';

function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-gray-900 selection:text-white">
      <main>
        <PropertyGrid properties={mockProperties} isLoading={false} />
      </main>
      <Footer />
    </div>
  );
}

export default App;