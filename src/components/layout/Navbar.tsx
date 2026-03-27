import { NavLink } from 'react-router-dom';
import { Activity, LayoutDashboard, FileUp } from 'lucide-react';

export function Navbar() {
  return (
    <header className="bg-[#3d3028] text-white p-6 shadow-md border-b-4 border-[#a68a76]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-xs font-bold tracking-[0.3em] text-[#dcd3cc] uppercase">Asante Resources, LLC</h1>
          <h2 className="text-2xl font-black tracking-tighter">WINDMILL CREEK PROJECT</h2>
        </div>
        
        <nav className="flex items-center gap-6">
          <NavLink 
            to="/" 
            className={({isActive}) => 
              `flex items-center gap-2 text-[11px] font-black uppercase tracking-widest transition-colors ${isActive ? 'text-[#a68a76]' : 'text-slate-300 hover:text-white'}`
            }
          >
            <LayoutDashboard size={14} /> Production
          </NavLink>
          
          <NavLink 
            to="/operations" 
            className={({isActive}) => 
              `flex items-center gap-2 text-[11px] font-black uppercase tracking-widest transition-colors ${isActive ? 'text-[#a68a76]' : 'text-slate-300 hover:text-white'}`
            }
          >
            <Activity size={14} /> Operations
          </NavLink>

          <NavLink 
            to="/upload" 
            className={({isActive}) => 
              `flex items-center gap-2 text-[11px] font-black uppercase tracking-widest transition-colors ${isActive ? 'text-[#a68a76]' : 'text-slate-300 hover:text-white'}`
            }
          >
            <FileUp size={14} /> Data Ingestion
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
