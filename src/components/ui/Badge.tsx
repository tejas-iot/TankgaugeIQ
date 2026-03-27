

type BadgeVariant = 'producing' | 'si' | 'maintenance' | 'default';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children: React.ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  producing: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  si: 'bg-orange-100 text-orange-800 border-orange-200',
  maintenance: 'bg-rose-100 text-rose-800 border-rose-200',
  default: 'bg-slate-100 text-slate-800 border-slate-200',
};

export function Badge({ children, variant = 'default', className = '', ...props }: BadgeProps) {
  return (
    <span
      className={`px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded border ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
