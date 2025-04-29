
import React from 'react';
import { Bell, Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <div className="w-full flex justify-between items-center py-4 px-4 bg-gradient-to-b from-gray-200 to-gray-100">
      <Button variant="ghost" size="icon" className="text-amber-500">
        <Bell className="h-6 w-6" />
      </Button>
      <Button variant="ghost" size="icon">
        <Menu className="h-6 w-6" />
      </Button>
    </div>
  );
}

export default Navbar;
