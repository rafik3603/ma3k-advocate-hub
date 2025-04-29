
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
import { CalendarIcon, Clock } from "lucide-react";

interface AddAppointmentFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function AddAppointmentForm({ isOpen, onClose, onSuccess }: AddAppointmentFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    client: "",
    location: "",
    time: "10:00",
    duration: "60",
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
    
    // Simulate adding an appointment
    setTimeout(() => {
      toast({
        title: "تم إضافة الموعد",
        description: "تم إضافة الموعد بنجاح",
      });
      
      setIsSubmitting(false);
      setFormData({
        title: "",
        client: "",
        location: "",
        time: "10:00",
        duration: "60",
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
          <SheetTitle className="arabic-text text-right">إضافة موعد جديد</SheetTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </SheetHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="arabic-text block text-right">عنوان الموعد</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="arabic-text text-right"
              placeholder="أدخل عنوان الموعد"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="client" className="arabic-text block text-right">اسم العميل</Label>
            <Input
              id="client"
              name="client"
              value={formData.client}
              onChange={handleChange}
              required
              className="arabic-text text-right"
              placeholder="أدخل اسم العميل"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="date" className="arabic-text block text-right">تاريخ الموعد</Label>
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
          
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-2">
              <Label htmlFor="time" className="arabic-text block text-right">وقت الموعد</Label>
              <div className="flex">
                <Input
                  id="time"
                  name="time"
                  type="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="arabic-text"
                />
                <Clock className="ml-2 h-4 w-4 self-center" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="duration" className="arabic-text block text-right">المدة (دقيقة)</Label>
              <Input
                id="duration"
                name="duration"
                type="number"
                min="15"
                step="15"
                value={formData.duration}
                onChange={handleChange}
                required
                className="arabic-text text-right"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location" className="arabic-text block text-right">المكان</Label>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="arabic-text text-right"
              placeholder="أدخل مكان الموعد"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full mt-6 bg-lawyer-primary hover:bg-lawyer-secondary arabic-text"
            disabled={isSubmitting}
          >
            {isSubmitting ? "جاري الإضافة..." : "إضافة الموعد"}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
