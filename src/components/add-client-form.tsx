
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { X } from "lucide-react";

interface AddClientFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function AddClientForm({ isOpen, onClose, onSuccess }: AddClientFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate adding a client
    setTimeout(() => {
      toast({
        title: "تم إضافة الموكل",
        description: "تم إضافة الموكل بنجاح",
      });
      
      setIsSubmitting(false);
      setFormData({
        name: "",
        phone: "",
        email: "",
        address: "",
      });
      
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
          <SheetTitle className="arabic-text text-right">إضافة موكل جديد</SheetTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </SheetHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="arabic-text block text-right">اسم الموكل</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="arabic-text text-right"
              placeholder="أدخل اسم الموكل"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone" className="arabic-text block text-right">رقم الهاتف</Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="arabic-text text-right"
              placeholder="أدخل رقم الهاتف"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="arabic-text block text-right">البريد الإلكتروني</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="arabic-text text-right"
              placeholder="أدخل البريد الإلكتروني (اختياري)"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address" className="arabic-text block text-right">العنوان</Label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="arabic-text text-right"
              placeholder="أدخل العنوان"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full mt-6 bg-lawyer-primary hover:bg-lawyer-secondary arabic-text"
            disabled={isSubmitting}
          >
            {isSubmitting ? "جاري الإضافة..." : "إضافة الموكل"}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
