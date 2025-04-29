
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: number;
  className?: string;
}

export function StatsCard({ title, value, className }: StatsCardProps) {
  return (
    <div 
      className={cn(
        "bg-lawyer-primary rounded-md p-4 text-center flex flex-col items-center justify-center",
        className
      )}
    >
      <h3 className="text-sm font-medium text-black mb-1 arabic-text">{title}</h3>
      <span className="text-3xl font-bold">{value}</span>
    </div>
  );
}
