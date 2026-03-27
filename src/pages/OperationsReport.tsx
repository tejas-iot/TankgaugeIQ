import { useState } from 'react';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { MOCK_WELLS_DATA, type WellStatus } from '../lib/mockData';

export default function OperationsReport() {
  const [wells, setWells] = useState<WellStatus[]>(MOCK_WELLS_DATA);

  const total = wells.length;
  const producing = wells.filter(w => w.status === 'producing').length;
  const efficiency = total > 0 ? Math.round((producing / total) * 100) : 0;

  const groupedWells = wells.reduce((acc, well) => {
    if (!acc[well.battery]) acc[well.battery] = [];
    acc[well.battery].push(well);
    return acc;
  }, {} as Record<string, WellStatus[]>);

  const activeMaintenance = wells.filter(w => w.status === 'maintenance');

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1 flex flex-col justify-center border-l-4 border-l-[#a68a76]">
          <CardHeader>
            <h2 className="text-[#8c7e73] text-[10px] uppercase tracking-[0.2em] font-bold">Total Field Performance</h2>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center bg-[#fcfbf9] py-3 rounded border border-[#f0edea]">
                <p className="text-2xl font-black text-[#3d3028]">{total}</p>
                <p className="text-[10px] text-[#8c7e73] uppercase font-bold">Total Wells</p>
              </div>
              <div className="text-center bg-emerald-50 py-3 rounded border border-emerald-100">
                <p className="text-2xl font-black text-emerald-600">{producing}</p>
                <p className="text-[10px] text-emerald-700 uppercase font-bold">Producing</p>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-[#f0edea]">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-bold text-[#8c7e73] uppercase">Field Uptime</span>
                <span className="text-xs font-bold text-[#8b9474]">{efficiency}%</span>
              </div>
              <div className="w-full bg-[#f0edea] rounded-full h-2">
                <div 
                  className="bg-[#8b9474] h-2 rounded-full transition-all duration-500" 
                  style={{ width: `${efficiency}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <h2 className="text-[#8c7e73] text-[10px] uppercase tracking-[0.2em] font-bold">Battery Performance Matrix</h2>
          </CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.keys(groupedWells).map(bat => {
               const bWells = groupedWells[bat];
               const prod = bWells.filter(w => w.status === 'producing').length;
               const eff = Math.round((prod / bWells.length) * 100);
               
               return (
                 <div key={bat} className="bg-[#fdfcfb] border border-[#e9e4e0] rounded-lg p-3 flex flex-col justify-between">
                    <div className="mb-2">
                        <p className="text-[10px] font-black text-[#a68a76] uppercase">Battery</p>
                        <p className="text-lg font-bold text-[#4a3f35] leading-none">{bat}</p>
                    </div>
                    <div className="flex items-end justify-between">
                        <p className={`text-2xl font-black ${eff > 70 ? 'text-emerald-600' : 'text-orange-500'}`}>
                           {prod}<span className="text-xs text-[#a68a76] font-normal">/{bWells.length}</span>
                        </p>
                        <p className="text-sm font-black text-[#5c5149]">{eff}%</p>
                    </div>
                 </div>
               )
            })}
          </CardContent>
        </Card>
      </section>

      {/* Tank Battery Tables */}
      <div className="space-y-8">
        {Object.keys(groupedWells).sort().map(battery => (
          <Card key={battery} className="overflow-hidden">
            <div className="bg-[#fcfbf9] px-6 py-3 border-b border-[#e9e4e0]">
              <h2 className="text-sm font-bold text-[#4a3f35] uppercase tracking-wider">Tank Battery {battery}</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm min-w-[700px]">
                <thead className="bg-[#faf9f7] text-[#8c7e73] font-semibold uppercase text-[10px] tracking-wider border-b border-[#e9e4e0]">
                  <tr>
                    <th className="px-6 py-3 w-20">Well</th>
                    <th className="px-6 py-3 w-40">Status</th>
                    <th className="px-6 py-3 w-40">Depth/Perfs</th>
                    <th className="px-6 py-3">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f0edea]">
                  {groupedWells[battery].map(well => (
                    <tr key={well.id} className={`row-${well.status}`}>
                      <td className="px-6 py-3 font-bold text-[#3d3028]">#{well.id}</td>
                      <td className="px-6 py-3">
                        <select 
                          className={`text-[10px] font-black uppercase tracking-wider rounded border cursor-pointer outline-none bg-transparent p-1
                            ${well.status === 'producing' ? 'text-emerald-800 border-emerald-200' : ''}
                            ${well.status === 'si' ? 'text-orange-800 border-orange-200' : ''}
                            ${well.status === 'maintenance' ? 'text-rose-800 border-rose-200' : ''}
                          `}
                          value={well.status}
                          onChange={(e) => {
                             const newStatus = e.target.value as WellStatus['status'];
                             setWells(wells.map(w => w.id === well.id ? { ...w, status: newStatus } : w));
                          }}
                        >
                          <option value="producing">Producing</option>
                          <option value="si">Shut-In</option>
                          <option value="maintenance">Maintenance</option>
                        </select>
                      </td>
                      <td className="px-6 py-3 text-xs font-mono text-slate-500">{well.info}</td>
                      <td className="px-6 py-3">
                         <input 
                           type="text" 
                           className="w-full bg-transparent border-b border-transparent focus:border-[#a68a76] focus:ring-0 text-xs py-1 outline-none font-medium" 
                           value={well.action}
                           onChange={(e) => {
                             setWells(wells.map(w => w.id === well.id ? { ...w, action: e.target.value } : w));
                           }} 
                         />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        ))}
      </div>

      {/* Maintenance Tasks */}
      <Card className="overflow-hidden border-orange-200">
        <div className="bg-[#3d3028] px-6 py-4 flex justify-between items-center">
            <h2 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
                <span className="opacity-70">⚠</span> Open Maintenance Tasks
            </h2>
        </div>
        <div className="overflow-x-auto p-0">
          <table className="w-full text-left text-sm min-w-[600px]">
            <thead className="bg-[#faf9f7] text-[#8c7e73] font-semibold uppercase text-[9px] tracking-wider border-b border-[#e9e4e0]">
                <tr>
                    <th className="px-6 py-2 w-24">Battery</th>
                    <th className="px-6 py-2 w-20">Well</th>
                    <th className="px-6 py-2 w-32">Status</th>
                    <th className="px-6 py-2">Maintenance Required</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-[#f0edea] bg-white">
                {activeMaintenance.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-[#8c7e73] italic text-xs uppercase font-bold tracking-widest opacity-50">
                      No Active Maintenance Tickets
                    </td>
                  </tr>
                ) : activeMaintenance.map(task => (
                  <tr key={task.id} className="hover:bg-rose-50 transition-colors">
                      <td className="px-6 py-3 text-[10px] font-bold text-[#a68a76] uppercase tracking-tight">{task.battery}</td>
                      <td className="px-6 py-3 font-black text-[#3d3028]">#{task.id}</td>
                      <td className="px-6 py-3"><Badge variant="maintenance">MAINTENANCE</Badge></td>
                      <td className="px-6 py-3 text-xs font-medium text-[#4a3f35]">{task.action}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
