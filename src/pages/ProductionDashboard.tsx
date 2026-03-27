import { useMemo } from 'react';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

// Fallback dynamic mock generation for WOW factor
const generateMockSeries = () => {
    const vol = [];
    const bopd = [];
    const now = new Date();
    let currentVol = 1200;
    
    for(let i = 14; i >= 0; i--) {
        const d = new Date(now.getTime() - (i * 24 * 60 * 60 * 1000));
        vol.push({ x: d, y: currentVol });
        // Simulating daily production of 200-300 bopd subtracted by sales/hauls
        const dailyBopd = 200 + Math.random() * 80;
        bopd.push({ x: d, y: dailyBopd });
        currentVol += dailyBopd - (Math.random() > 0.7 ? 800 : 0); // Haul 800 bbl occasionally
        if (currentVol < 200) currentVol = 200;
    }
    return { vol, bopd };
};

export default function ProductionDashboard() {
  const { vol, bopd } = useMemo(() => generateMockSeries(), []);
  
  const totalVol = vol[vol.length - 1].y.toFixed(1);
  const totalBopd = (bopd.reduce((a, b) => a + b.y, 0) / bopd.length).toFixed(1);

  const commonOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'time',
        time: { unit: 'day', tooltipFormat: 'MMM d, yyyy' },
        grid: { display: false },
        ticks: { font: { size: 10, weight: 'bold', family: 'Inter' } }
      },
      y: {
        beginAtZero: true,
        grid: { color: '#e2e8f0', borderDash: [4, 4] },
        ticks: { font: { size: 10, weight: 'bold', family: 'Inter' } }
      }
    },
    plugins: { legend: { display: false }, tooltip: { mode: 'index', intersect: false } }
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row justify-between items-center gap-4 border-b-2 border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Windmill Creek Project</h1>
          <p className="text-[10px] text-slate-600 font-bold uppercase tracking-[0.2em] mt-1">Field Operations Dashboard</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-900 text-white px-3 py-1.5 rounded-md shadow-sm border border-slate-700">
             <span className="text-[9px] font-black uppercase tracking-widest text-[#a68a76]">WTI</span>
             <span className="text-sm font-black text-emerald-400">$84.15</span>
          </div>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-slate-800 p-2">
           <CardContent>
             <p className="stat-label mb-1">Field Inventory (Total)</p>
             <p className="text-4xl font-black text-slate-900">{totalVol} <span className="text-base text-slate-400 font-medium">BBL</span></p>
           </CardContent>
        </Card>
        <Card className="border-l-4 border-l-amber-600 p-2">
           <CardContent>
             <p className="stat-label mb-1">Field Flow Rate (7 Day Avg)</p>
             <p className="text-4xl font-black text-slate-900">{totalBopd} <span className="text-base text-slate-400 font-medium">BOPD</span></p>
           </CardContent>
        </Card>
        <Card className="bg-slate-800 border-none text-white p-2">
           <CardContent className="h-full flex flex-col justify-center">
             <p className="stat-label text-slate-300 mb-1">Status</p>
             <p className="text-sm font-bold tracking-widest text-emerald-400 flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                LIVE STREAM
             </p>
             <p className="text-[10px] text-slate-400 mt-2 font-mono">Sample Mode Active</p>
           </CardContent>
        </Card>
      </section>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
             <h3 className="stat-label mb-0">Daily Inventory @ 10PM (BBL)</h3>
          </CardHeader>
          <CardContent className="h-[300px]">
             <Bar 
               data={{
                 datasets: [{
                    label: 'Field Inventory',
                    data: vol,
                    backgroundColor: '#1e293b',
                    borderRadius: 4
                 }]
               }} 
               options={commonOptions} 
             />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
             <h3 className="stat-label mb-0">Daily Production Intensity (BOPD)</h3>
          </CardHeader>
          <CardContent className="h-[300px]">
             <Line 
               data={{
                 datasets: [{
                    label: 'Field Flow Rate',
                    data: bopd,
                    borderColor: '#b45309',
                    backgroundColor: 'rgba(180, 83, 9, 0.1)',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 4,
                    borderWidth: 3
                 }]
               }} 
               options={commonOptions} 
             />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
