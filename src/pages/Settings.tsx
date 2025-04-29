
import React from 'react';
import Navbar from '../components/navbar';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Save } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Settings = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      
      <div className="p-4">
        <div className="flex items-center mb-6">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold mr-2 arabic-text">الإعدادات</h1>
        </div>
        
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="profile" className="w-1/3 arabic-text">الملف الشخصي</TabsTrigger>
            <TabsTrigger value="notifications" className="w-1/3 arabic-text">الإشعارات</TabsTrigger>
            <TabsTrigger value="system" className="w-1/3 arabic-text">إعدادات النظام</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="arabic-text" htmlFor="name">الاسم الكامل</Label>
                <Input id="name" placeholder="أدخل اسمك الكامل" className="arabic-text text-right" />
              </div>
              
              <div className="space-y-2">
                <Label className="arabic-text" htmlFor="email">البريد الإلكتروني</Label>
                <Input id="email" type="email" placeholder="example@domain.com" className="arabic-text text-right" />
              </div>
              
              <div className="space-y-2">
                <Label className="arabic-text" htmlFor="phone">رقم الهاتف</Label>
                <Input id="phone" placeholder="0123456789" className="arabic-text text-right" />
              </div>
              
              <div className="space-y-2">
                <Label className="arabic-text" htmlFor="officeAddress">عنوان المكتب</Label>
                <Input id="officeAddress" placeholder="أدخل عنوان المكتب" className="arabic-text text-right" />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label className="arabic-text" htmlFor="bio">نبذة تعريفية</Label>
                <Textarea id="bio" placeholder="أدخل نبذة تعريفية..." className="arabic-text text-right h-24" />
              </div>
            </div>
            
            <div className="pt-4">
              <h3 className="font-medium text-lg mb-4 arabic-text">تغيير كلمة المرور</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="arabic-text" htmlFor="currentPassword">كلمة المرور الحالية</Label>
                  <Input id="currentPassword" type="password" placeholder="••••••••" className="arabic-text text-right" />
                </div>
                
                <div className="space-y-2">
                  <Label className="arabic-text" htmlFor="newPassword">كلمة المرور الجديدة</Label>
                  <Input id="newPassword" type="password" placeholder="••••••••" className="arabic-text text-right" />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label className="arabic-text" htmlFor="confirmPassword">تأكيد كلمة المرور</Label>
                  <Input id="confirmPassword" type="password" placeholder="••••••••" className="arabic-text text-right" />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end pt-4">
              <Button className="arabic-text bg-lawyer-primary hover:bg-lawyer-secondary">
                <Save className="ml-2 h-4 w-4" />
                حفظ التغييرات
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-6">
            <div>
              <h3 className="font-medium text-lg mb-3 arabic-text">إعدادات الإشعارات</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="arabic-text block mb-1">إشعارات القضايا</Label>
                    <p className="text-sm text-gray-500 arabic-text">تنبيهات حول مواعيد الجلسات والقضايا</p>
                  </div>
                  <Switch id="case-notifications" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="arabic-text block mb-1">إشعارات المواعيد</Label>
                    <p className="text-sm text-gray-500 arabic-text">تنبيهات حول المواعيد القادمة مع الموكلين</p>
                  </div>
                  <Switch id="appointment-notifications" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="arabic-text block mb-1">إشعارات المدفوعات</Label>
                    <p className="text-sm text-gray-500 arabic-text">تنبيهات حول المدفوعات المستلمة والديون المستحقة</p>
                  </div>
                  <Switch id="payment-notifications" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="arabic-text block mb-1">البريد الإلكتروني اليومي</Label>
                    <p className="text-sm text-gray-500 arabic-text">ملخص يومي عن مواعيد وقضايا اليوم</p>
                  </div>
                  <Switch id="daily-email" />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-3 arabic-text">وقت الإشعارات</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="arabic-text" htmlFor="reminder-time">وقت التذكير بالجلسات اليومية</Label>
                  <div className="flex gap-2">
                    <Input id="reminder-time" type="time" defaultValue="07:00" className="arabic-text text-right" />
                    <Button variant="outline" className="arabic-text">تعيين</Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="arabic-text" htmlFor="reminder-days">التذكير قبل الجلسة بـ</Label>
                  <div className="flex gap-2">
                    <Input id="reminder-days" type="number" min={1} max={14} defaultValue={1} className="arabic-text text-right" />
                    <Button variant="outline" className="arabic-text">تعيين</Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end pt-4">
              <Button className="arabic-text bg-lawyer-primary hover:bg-lawyer-secondary">
                <Save className="ml-2 h-4 w-4" />
                حفظ التغييرات
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="system" className="space-y-6">
            <div>
              <h3 className="font-medium text-lg mb-3 arabic-text">خيارات النظام</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="arabic-text block mb-1">الوضع الليلي</Label>
                    <p className="text-sm text-gray-500 arabic-text">تشغيل وضع الألوان الداكنة للتطبيق</p>
                  </div>
                  <Switch id="dark-mode" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="arabic-text block mb-1">النسخ الاحتياطي التلقائي</Label>
                    <p className="text-sm text-gray-500 arabic-text">نسخ احتياطي يومي للبيانات</p>
                  </div>
                  <Switch id="auto-backup" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="arabic-text block mb-1">تخزين البيانات محليًا</Label>
                    <p className="text-sm text-gray-500 arabic-text">الاحتفاظ بنسخة من البيانات على الجهاز</p>
                  </div>
                  <Switch id="local-storage" defaultChecked />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-3 arabic-text">النسخ الاحتياطي والاستعادة</h3>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" className="arabic-text">
                  إنشاء نسخة احتياطية
                </Button>
                <Button variant="outline" className="arabic-text">
                  استعادة من نسخة احتياطية
                </Button>
                <Button variant="outline" className="arabic-text text-red-500 hover:bg-red-50">
                  حذف جميع البيانات
                </Button>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-3 arabic-text">إصدار التطبيق</h3>
              <p className="text-sm text-gray-600 arabic-text">الإصدار الحالي: 1.0.0</p>
              <Button variant="outline" className="arabic-text mt-2">التحقق من التحديثات</Button>
            </div>
            
            <div className="flex justify-end pt-4">
              <Button className="arabic-text bg-lawyer-primary hover:bg-lawyer-secondary">
                <Save className="ml-2 h-4 w-4" />
                حفظ التغييرات
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
