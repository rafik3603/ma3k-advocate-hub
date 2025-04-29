
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function SearchBar() {
  return (
    <div className="relative w-full max-w-lg mx-auto my-4 px-4">
      <div className="flex items-center w-full border rounded-md bg-white">
        <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        <Input 
          type="search" 
          placeholder="البحث عن قضية" 
          className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 arabic-text text-right pr-2"
        />
      </div>
    </div>
  );
}
