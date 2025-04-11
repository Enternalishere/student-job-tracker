import React from 'react';
import { createRoot } from 'react-dom/client';
import JobTracker from './components/JobTracker';

const root = createRoot(document.getElementById('root'));
root.render(<JobTracker />);
