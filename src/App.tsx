
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import ProductionDashboard from './pages/ProductionDashboard';
import OperationsReport from './pages/OperationsReport';
import DataUpload from './pages/DataUpload';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ProductionDashboard />} />
          <Route path="operations" element={<OperationsReport />} />
          <Route path="upload" element={<DataUpload />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
