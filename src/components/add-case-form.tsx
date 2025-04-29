
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";

interface AddCaseFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function AddCaseForm({ isOpen, onClose, onSuccess }: AddCaseFormProps) {
  const [formData, setFormData] = useState({
    caseNumber: "",
    client: "",
    court: "",
    description: "",
  });
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate adding a case
    setTimeout(() => {
      toast({
        title: "تم إضافة القضية",
        description: "تم إضافة القضية بنجاح",
      });
      
      setIsSubmitting(false);
      setFormData({
        caseNumber: "",
        client: "",
        court: "",
        description: "",
      });
      setDate(new Date());
      
      if (onSuccess) {
        onSuccess();
      }
      
      onClose();
    }, 1000);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="rtl-direction">
        <SheetHeader className="flex flex-row items-center justify-between">
          <SheetTitle className="arabic-text text-right">إضافة قضية جديدة</SheetTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </SheetHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <div className="space-y-2">
            <Label htmlFor="caseNumber" className="arabic-text block text-right">رقم القضية</Label>
            <Input
              id="caseNumber"
              name="caseNumber"
              value={formData.caseNumber}
              onChange={handleChange}
              required
              className="arabic-text text-right"
              placeholder="أدخل رقم القضية"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="client" className="arabic-text block text-right">اسم الموكل</Label>
            <Input
              id="client"
              name="client"
              value={formData.client}
              onChange={handleChange}
              required
              className="arabic-text text-right"
              placeholder="أدخل اسم الموكل"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="court" className="arabic-text block text-right">المحكمة</Label>
            <Input
              id="court"
              name="court"
              value={formData.court}
              onChange={handleChange}
              required
              className="arabic-text text-right"
              placeholder="أدخل اسم المحكمة"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="date" className="arabic-text block text-right">تاريخ الجلسة</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={"outline"}
                  className={cn(
                    "w-full justify-between text-right font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  {date ? format(date, "dd MMMM yyyy", { locale: ar }) : <span>اختر التاريخ</span>}
                  <CalendarIcon className="ml-2 h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  locale={ar}
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description" className="arabic-text block text-right">وصف القضية</Label>
            <Input
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="arabic-text text-right"
              placeholder="أدخل وصف القضية (اختياري)"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full mt-6 bg-lawyer-primary hover:bg-lawyer-secondary arabic-text"
            disabled={isSubmitting}
          >
            {isSubmitting ? "جاري الإضافة..." : "إضافة القضية"}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
