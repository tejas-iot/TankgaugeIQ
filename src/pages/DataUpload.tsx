import { useState } from 'react';
import Papa from 'papaparse';
import { Card, CardHeader, CardContent } from '../components/ui/Card';

// Helper to convert excel serial dates if they occur in the CSVs
function excelToJSDate(serial: number) {
  const utc_days = Math.floor(serial - 25569);
  const date_info = new Date(utc_days * 86400 * 1000);
  const fractional_day = serial - Math.floor(serial) + 0.0000001;
  const total_seconds = Math.floor(86400 * fractional_day);
  return new Date(
    date_info.getFullYear(),
    date_info.getMonth(),
    date_info.getDate(),
    Math.floor(total_seconds / 3600),
    Math.floor((total_seconds % 3600) / 60),
    total_seconds % 60
  );
}

export default function DataUpload() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, battery: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setMessage(`Parsing data for Battery ${battery}...`);

    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: async (res) => {
        const cleanData = res.data.map((row: any) => {
          const timeVal = row["Inventory Time"] || row["Inventory Time (UTC)"];
          const volVal = row["Inventory"];

          if (!timeVal) return null;

          let timestamp;
          if (typeof timeVal === 'number') {
            timestamp = excelToJSDate(timeVal);
          } else {
            timestamp = new Date(timeVal);
          }

          if (isNaN(timestamp.getTime())) return null;

          return {
            battery_id: battery,
            inventory_timestamp: timestamp.toISOString(),
            volume: parseFloat(volVal) || 0,
            raw_data: row
          };
        }).filter(Boolean);

        setMessage(`Found ${cleanData.length} valid records for Battery ${battery}. Ready to sync to Supabase.`);
        console.log("Parsed Data Payload:", cleanData.slice(0, 5));
        
        // Uncomment when Supabase table 'inventory_logs' is ready
        /*
        const { error } = await supabase.from('inventory_logs').insert(cleanData);
        if (error) {
           setMessage(`Error syncing: ${error.message}`);
        } else {
           setMessage(`Successfully synced ${cleanData.length} records!`);
        }
        */
        
        setLoading(false);
      },
      error: (err) => {
        setMessage(`Error parsing CSV: ${err.message}`);
        setLoading(false);
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-black text-slate-800 tracking-tight">Field Data Ingestion</h2>
          <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mt-1">Upload daily CSV logs</p>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
              <label className="block text-[10px] font-black mb-2 text-slate-500 uppercase tracking-widest">Battery 497</label>
              <input 
                 type="file" 
                 accept=".csv"
                 onChange={(e) => handleFileUpload(e, '497')}
                 className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-bold file:bg-[#1e293b] file:text-white hover:file:bg-[#334155] cursor-pointer"
              />
            </div>
            
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
              <label className="block text-[10px] font-black mb-2 text-[#9a3412] uppercase tracking-widest">Battery 499</label>
              <input 
                 type="file" 
                 accept=".csv"
                 onChange={(e) => handleFileUpload(e, '499')}
                 className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-bold file:bg-[#9a3412] file:text-white hover:file:bg-[#7c2d12] cursor-pointer"
              />
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
              <label className="block text-[10px] font-black mb-2 text-slate-700 uppercase tracking-widest">Battery 500</label>
              <input 
                 type="file" 
                 accept=".csv"
                 onChange={(e) => handleFileUpload(e, '500')}
                 className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-bold file:bg-slate-700 file:text-white hover:file:bg-slate-800 cursor-pointer"
              />
            </div>
          </div>

          <div className={`p-4 rounded border font-mono text-xs font-medium text-center transition-all ${loading ? 'bg-amber-50 border-amber-200 text-amber-800' : message.includes('Error') ? 'bg-red-50 border-red-200 text-red-800' : message ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
            {message || 'Awaiting uploads... Check browser console to see parsed CSV records.'}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
