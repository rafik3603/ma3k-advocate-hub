
import React, { useState } from 'react';
import Navbar from '../components/navbar';
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, Calendar, FileText, User, Building, Gavel, Clock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { ar } from 'date-fns/locale';

const CaseDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("details");
  
  // Mock data for a case
  const caseData = {
    id: Number(id) || 1,
    caseNumber: "2023/01",
    client: "أحمد محمد",
    court: "المحكمة الإبتدائية",
    judge: "محمد سليم",
    type: "مدني",
    status: "مؤجل",
    nextDate: new Date(2023, 5, 20),
    filingDate: new Date(2023, 3, 10),
    description: "دعوى تعويض عن الضرر المادي والمعنوي الناتج عن حادث مرور",
    notes: "المتهم غائب في الجلسة الأخيرة. يجب التأكد من إبلاغه بموعد الجلسة القادمة",
    documents: [
      { id: 1, title: "عريضة الدعوى", date: "2023-04-10", size: "245 KB" },
      { id: 2, title: "تقرير الخبير", date: "2023-05-05", size: "1.2 MB" },
    ],
    events: [
      { id: 1, title: "تقديم الدعوى", date: new Date(2023, 3, 10), notes: "تم قبول الدعوى" },
      { id: 2, title: "جلسة الإستماع", date: new Date(2023, 4, 15), notes: "تأجيل لغياب المدعى عليه" },
    ],
    financials: [
      { id: 1, date: new Date(2023, 3, 10), type: "دفع", amount: 5000, description: "أتعاب تقديم الدعوى" },
      { id: 2, date: new Date(2023, 4, 15), type: "دين", amount: 3000, description: "أتعاب جلسة الإستماع" },
    ]
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      
      <div className="p-4">
        <div className="flex items-center mb-6">
          <Link to="/pending-cases">
            <Button variant="ghost" size="icon">
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold mr-2 arabic-text">تفاصيل القضية</h1>
          <span className="text-gray-500 arabic-text">{caseData.caseNumber}</span>
        </div>
        
        <div className="bg-lawyer-light p-4 rounded-md mb-6 border border-lawyer-primary">
          <div className="flex justify-between mb-4">
            <div className="flex items-start">
              <Gavel className="h-5 w-5 ml-2 mt-1 text-lawyer-secondary" />
              <div>
                <h2 className="font-bold text-lg arabic-text">{caseData.caseNumber} - {caseData.type}</h2>
                <div className="flex items-center mt-1 text-gray-600">
                  <User className="h-4 w-4 ml-1" />
                  <span className="arabic-text">الموكل: {caseData.client}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600 arabic-text">
                تاريخ التسجيل: {format(caseData.filingDate, "dd MMMM yyyy", { locale: ar })}
              </div>
              <div className="flex items-center mt-1 text-gray-600 justify-end">
                <Clock className="h-4 w-4 ml-1" />
                <span className="arabic-text">{caseData.status}</span>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between">
            <div className="flex items-center text-sm text-gray-600">
              <Building className="h-4 w-4 ml-1" />
              <span className="arabic-text">المحكمة: {caseData.court}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="h-4 w-4 ml-1" />
              <span className="arabic-text">
                الجلسة القادمة: {format(caseData.nextDate, "dd MMMM yyyy", { locale: ar })}
              </span>
            </div>
          </div>
        </div>
        
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="w-full mb-4">
            <TabsTrigger value="details" className="w-1/3 arabic-text">التفاصيل</TabsTrigger>
            <TabsTrigger value="documents" className="w-1/3 arabic-text">المستندات</TabsTrigger>
            <TabsTrigger value="financials" className="w-1/3 arabic-text">المالية</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="space-y-4">
            <div className="bg-white p-4 rounded-md border border-gray-200">
              <h3 className="font-medium text-lg mb-2 arabic-text">وصف القضية</h3>
              <p className="text-gray-700 arabic-text">{caseData.description}</p>
            </div>
            
            <div className="bg-white p-4 rounded-md border border-gray-200">
              <h3 className="font-medium text-lg mb-2 arabic-text">ملاحظات</h3>
              <p className="text-gray-700 arabic-text">{caseData.notes}</p>
            </div>
            
            <div className="bg-white p-4 rounded-md border border-gray-200">
              <h3 className="font-medium text-lg mb-2 arabic-text">الأحداث</h3>
              <div className="space-y-3">
                {caseData.events.map(event => (
                  <div key={event.id} className="border-b border-gray-100 pb-3 last:border-0">
                    <div className="flex justify-between">
                      <span className="font-medium arabic-text">{event.title}</span>
                      <span className="text-sm text-gray-500 arabic-text">
                        {format(event.date, "dd MMMM yyyy", { locale: ar })}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1 arabic-text">{event.notes}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="documents" className="space-y-4">
            <Button className="w-full bg-lawyer-primary hover:bg-lawyer-secondary arabic-text mb-4">
              <FileText className="ml-2 h-4 w-4" />
              إضافة مستند جديد
            </Button>
            
            {caseData.documents.map(document => (
              <div key={document.id} className="bg-white p-4 rounded-md border border-gray-200">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 ml-2 text-lawyer-secondary" />
                  <div className="flex-1">
                    <h3 className="font-medium arabic-text">{document.title}</h3>
                    <div className="flex justify-between mt-1">
                      <span className="text-sm text-gray-500 arabic-text">{document.date}</span>
                      <span className="text-sm text-gray-500 arabic-text">{document.size}</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end mt-3">
                  <Button size="sm" variant="outline" className="arabic-text">تحميل</Button>
                  <Button size="sm" variant="destructive" className="arabic-text mr-2">حذف</Button>
                </div>
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="financials" className="space-y-4">
            <Button className="w-full bg-lawyer-primary hover:bg-lawyer-secondary arabic-text mb-4">
              إضافة معاملة مالية جديدة
            </Button>
            
            {caseData.financials.map(transaction => (
              <div key={transaction.id} className="bg-white p-4 rounded-md border border-gray-200">
                <div className="flex justify-between">
                  <span className="font-medium arabic-text">
                    {transaction.description}
                  </span>
                  <span className="text-sm text-gray-500 arabic-text">
                    {format(transaction.date, "dd MMMM yyyy", { locale: ar })}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-2">
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
        </Tabs>
      </div>
    </div>
  );
};

export default CaseDetails;
