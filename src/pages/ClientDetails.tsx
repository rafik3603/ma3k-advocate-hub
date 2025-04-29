
import React, { useState } from 'react';
import Navbar from '../components/navbar';
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, Phone, Mail, MapPin, FileText } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { ar } from 'date-fns/locale';

const ClientDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("info");
  
  // Mock data for a client
  const clientData = {
    id: Number(id) || 1,
    name: "أحمد محمد علي",
    phone: "0123456789",
    email: "ahmed@example.com",
    address: "الجزائر العاصمة، شارع ديدوش مراد رقم 45",
    notes: "موكل منذ عام 2021، متعاون ودقيق في المواعيد",
    registerDate: new Date(2021, 1, 15),
    cases: [
      { id: 1, caseNumber: "2023/01", court: "المحكمة الإبتدائية", status: "مؤجل", nextDate: new Date(2023, 5, 20) },
      { id: 2, caseNumber: "2022/15", court: "محكمة الإستئناف", status: "مفصول فيه", result: "لصالح الموكل", date: new Date(2022, 11, 10) },
    ],
    financials: [
      { id: 1, date: new Date(2023, 3, 10), type: "دفع", amount: 5000, description: "أتعاب تقديم الدعوى", caseNumber: "2023/01" },
      { id: 2, date: new Date(2023, 4, 15), type: "دين", amount: 3000, description: "أتعاب جلسة الإستماع", caseNumber: "2023/01" },
      { id: 3, date: new Date(2022, 11, 10), type: "دفع", amount: 7000, description: "تسوية نهائية", caseNumber: "2022/15" },
    ],
    appointments: [
      { id: 1, title: "مناقشة تفاصيل القضية", date: new Date(2023, 5, 18, 10, 0), duration: 60, location: "مكتب المحامي" },
    ]
  };
  
  // Calculate financial summary
  const totalPaid = clientData.financials
    .filter(t => t.type === "دفع")
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalDebt = clientData.financials
    .filter(t => t.type === "دين")
    .reduce((sum, t) => sum + t.amount, 0);
  
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      
      <div className="p-4">
        <div className="flex items-center mb-6">
          <Link to="/clients">
            <Button variant="ghost" size="icon">
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold mr-2 arabic-text">معلومات الموكل</h1>
        </div>
        
        <div className="bg-lawyer-light p-4 rounded-md mb-6 border border-lawyer-primary">
          <h2 className="font-bold text-xl arabic-text mb-3">{clientData.name}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <Phone className="h-5 w-5 ml-2 text-lawyer-secondary" />
              <span className="arabic-text">{clientData.phone}</span>
            </div>
            
            <div className="flex items-center">
              <Mail className="h-5 w-5 ml-2 text-lawyer-secondary" />
              <span className="arabic-text">{clientData.email}</span>
            </div>
            
            <div className="flex items-center col-span-1 md:col-span-2">
              <MapPin className="h-5 w-5 ml-2 text-lawyer-secondary" />
              <span className="arabic-text">{clientData.address}</span>
            </div>
          </div>
          
          <div className="mt-4 text-sm text-gray-600 arabic-text">
            موكل منذ: {format(clientData.registerDate, "dd MMMM yyyy", { locale: ar })}
          </div>
        </div>
        
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="w-full mb-4">
            <TabsTrigger value="info" className="w-1/4 arabic-text">معلومات</TabsTrigger>
            <TabsTrigger value="cases" className="w-1/4 arabic-text">القضايا</TabsTrigger>
            <TabsTrigger value="financials" className="w-1/4 arabic-text">المالية</TabsTrigger>
            <TabsTrigger value="appointments" className="w-1/4 arabic-text">المواعيد</TabsTrigger>
          </TabsList>
          
          <TabsContent value="info" className="space-y-4">
            <div className="bg-white p-4 rounded-md border border-gray-200">
              <h3 className="font-medium text-lg mb-2 arabic-text">ملاحظات</h3>
              <p className="text-gray-700 arabic-text">{clientData.notes}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-md border border-gray-200 text-center">
                <h3 className="font-medium arabic-text mb-1">مجموع المدفوعات</h3>
                <p className="text-green-600 font-bold text-lg arabic-text">{totalPaid} د.ج</p>
              </div>
              
              <div className="bg-white p-4 rounded-md border border-gray-200 text-center">
                <h3 className="font-medium arabic-text mb-1">مجموع الديون</h3>
                <p className="text-red-600 font-bold text-lg arabic-text">{totalDebt} د.ج</p>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button variant="outline" className="arabic-text ml-2">تعديل المعلومات</Button>
              <Button variant="default" className="arabic-text bg-lawyer-primary hover:bg-lawyer-secondary">إضافة ملاحظة</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="cases" className="space-y-4">
            <Button className="w-full bg-lawyer-primary hover:bg-lawyer-secondary arabic-text mb-4">
              <FileText className="ml-2 h-4 w-4" />
              إضافة قضية جديدة
            </Button>
            
            {clientData.cases.map(caseItem => (
              <div key={caseItem.id} className="bg-white p-4 rounded-md border border-gray-200">
                <div className="flex justify-between mb-2">
                  <h3 className="font-medium arabic-text">رقم القضية: {caseItem.caseNumber}</h3>
                  {'result' in caseItem ? (
                    <span className={`text-sm font-medium arabic-text ${
                      caseItem.result === "لصالح الموكل" ? "text-green-600" : "text-red-600"
                    }`}>
                      {caseItem.result}
                    </span>
                  ) : (
                    <span className="text-sm text-gray-600 arabic-text">
                      {format(caseItem.nextDate, "dd MMMM yyyy", { locale: ar })}
                    </span>
                  )}
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-600 arabic-text">
                    المحكمة: {caseItem.court}
                  </div>
                  <span className="text-sm font-medium arabic-text">
                    {caseItem.status}
                  </span>
                </div>
                
                <div className="flex justify-end mt-3">
                  <Link to={`/case/${caseItem.id}`}>
                    <Button size="sm" variant="default" className="arabic-text bg-lawyer-primary hover:bg-lawyer-secondary">
                      عرض التفاصيل
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="financials" className="space-y-4">
            <Button className="w-full bg-lawyer-primary hover:bg-lawyer-secondary arabic-text mb-4">
              إضافة معاملة مالية جديدة
            </Button>
            
            {clientData.financials.map(transaction => (
              <div key={transaction.id} className="bg-white p-4 rounded-md border border-gray-200">
                <div className="flex justify-between">
                  <span className="font-medium arabic-text">
                    {transaction.description}
                  </span>
                  <span className="text-sm text-gray-500 arabic-text">
                    {format(transaction.date, "dd MMMM yyyy", { locale: ar })}
                  </span>
                </div>
                <div className="text-sm text-gray-600 arabic-text mb-2">
                  رقم القضية: {transaction.caseNumber}
                </div>
                <div className="flex justify-between items-center">
                  <span className={`text-sm font-medium arabic-text ${
                    transaction.type === "دفع" ? "text-green-600" : "text-red-600"
                  }`}>
                    {transaction.type}
                  </span>
                  <span className="font-bold arabic-text">{transaction.amount} د.ج</span>
                </div>
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="appointments" className="space-y-4">
            <Button className="w-full bg-lawyer-primary hover:bg-lawyer-secondary arabic-text mb-4">
              إضافة موعد جديد
            </Button>
            
            {clientData.appointments.length > 0 ? (
              clientData.appointments.map(appointment => (
                <div key={appointment.id} className="bg-white p-4 rounded-md border border-gray-200">
                  <h3 className="font-medium arabic-text mb-2">{appointment.title}</h3>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600 arabic-text">
                      {format(appointment.date, "EEEE, dd MMMM yyyy", { locale: ar })}
                    </span>
                    <span className="text-sm text-gray-600 arabic-text">
                      {format(appointment.date, "HH:mm", { locale: ar })}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 arabic-text mb-2">
                    المدة: {appointment.duration} دقيقة
                  </div>
                  <div className="text-sm text-gray-600 arabic-text mb-3">
                    المكان: {appointment.location}
                  </div>
                  <div className="flex justify-end">
                    <Button size="sm" variant="outline" className="arabic-text ml-2">إلغاء</Button>
                    <Button size="sm" variant="default" className="arabic-text bg-lawyer-primary hover:bg-lawyer-secondary">
                      تعديل
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500 arabic-text">
                لا توجد مواعيد مسجلة حاليا
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ClientDetails;
