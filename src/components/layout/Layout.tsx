import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';

export function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 w-full p-4 md:p-6 bg-[#f1f5f9]">
        <Outlet />
      </main>
      <footer className="w-full text-center border-t border-slate-300 py-6 mt-auto">
        <p className="text-slate-500 text-[10px] uppercase font-black tracking-[0.3em]">
          Powered by TankGaugeIQ &copy; {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}
