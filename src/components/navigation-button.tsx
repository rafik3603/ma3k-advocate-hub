
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface NavigationButtonProps {
  title: string;
  href: string;
  className?: string;
}

export function NavigationButton({ title, href, className }: NavigationButtonProps) {
  return (
    <Link to={href} className="w-full">
      <Button 
        variant="ghost" 
        className={cn(
          "w-full bg-lawyer-primary hover:bg-lawyer-secondary text-black font-medium py-3 rounded-md mb-4 arabic-text",
          className
        )}
      >
        {title}
      </Button>
    </Link>
  );
}
