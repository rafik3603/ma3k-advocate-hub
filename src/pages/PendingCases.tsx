
import React, { useState } from 'react';
import Navbar from '../components/navbar';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Search, Plus, Calendar, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { AddCaseForm } from "../components/add-case-form";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const PendingCases = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [filterType, setFilterType] = useState("all");
  
  // Mock data for pending cases
  const pendingCases = [
    { 
      id: 1, 
      caseNumber: "2023/01", 
      client: "أحمد محمد", 
      court: "المحكمة الإبتدائية", 
      date: "2023-05-15", 
      urgency: "عادي",
      subject: "نزاع عقاري",
      notes: "تم تقديم الدفوعات الأولية"
    },
    { 
      id: 2, 
      caseNumber: "2023/02", 
      client: "فاطمة علي", 
      court: "محكمة الإستئناف", 
      date: "2023-05-18", 
      urgency: "عاجل",
      subject: "نزاع تجاري",
      notes: "بانتظار تقديم المستندات المطلوبة"
    },
    { 
      id: 3, 
      caseNumber: "2023/03", 
      client: "محمود عبدالله", 
      court: "المحكمة الإبتدائية", 
      date: "2023-05-20", 
      urgency: "حرج",
      subject: "قضية جنائية",
      notes: "تم طلب تأجيل الجلسة القادمة"
    },
    { 
      id: 4, 
      caseNumber: "2023/04", 
      client: "سعيد المنصور", 
      court: "المحكمة العمالية", 
      date: "2023-05-22", 
      urgency: "عادي",
      subject: "نزاع عمالي",
      notes: "بانتظار رد المدعى عليه"
    },
    { 
      id: 5, 
      caseNumber: "2023/05", 
      client: "ليلى حسين", 
      court: "محكمة الأسرة", 
      date: "2023-05-25", 
      urgency: "عاجل",
      subject: "قضية أحوال شخصية",
      notes: "بحاجة لإعداد صحيفة الدعوى الجديدة"
    },
  ];

  // Filter cases based on search query and filter type
  const filteredCases = pendingCases.filter(caseItem => {
    const matchesSearch = 
      caseItem.caseNumber.includes(searchQuery) || 
      caseItem.client.includes(searchQuery) ||
      caseItem.subject.includes(searchQuery);
    
    if (filterType === "all") return matchesSearch;
    if (filterType === "urgent") return matchesSearch && (caseItem.urgency === "عاجل" || caseItem.urgency === "حرج");
    if (filterType === "regular") return matchesSearch && caseItem.urgency === "عادي";
    
    return matchesSearch;
  });

  const handleAddCase = () => {
    setShowAddForm(true);
  };

  const getUrgencyBadge = (urgency: string) => {
    if (urgency === "عاجل") {
      return <Badge className="bg-amber-500 hover:bg-amber-600">{urgency}</Badge>;
    } else if (urgency === "حرج") {
      return <Badge className="bg-red-500 hover:bg-red-600">{urgency}</Badge>;
    } else {
      return <Badge className="bg-green-500 hover:bg-green-600">{urgency}</Badge>;
    }
  };

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
          <h1 className="text-xl font-bold mr-2 arabic-text">القضايا المؤجلة</h1>
        </div>

        <div className="flex flex-col md:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="بحث عن قضية"
              className="pl-10 pr-10 arabic-text text-right"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="تصفية حسب" className="arabic-text" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="arabic-text">جميع القضايا</SelectItem>
              <SelectItem value="urgent" className="arabic-text">القضايا العاجلة</SelectItem>
              <SelectItem value="regular" className="arabic-text">القضايا العادية</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          {filteredCases.length > 0 ? (
            filteredCases.map(caseItem => (
              <div key={caseItem.id} className="bg-lawyer-light p-4 rounded-md border border-lawyer-primary">
                <div className="flex justify-between mb-2 items-start">
                  <div>
                    <span className="font-medium arabic-text">رقم القضية: {caseItem.caseNumber}</span>
                    <div className="text-sm arabic-text mt-1">{caseItem.subject}</div>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 ml-1 text-lawyer-secondary" />
                    <span className="text-gray-600 arabic-text">{caseItem.date}</span>
                  </div>
                </div>
                
                <div className="arabic-text mb-1">العميل: {caseItem.client}</div>
                <div className="arabic-text text-gray-600 mb-2">المحكمة: {caseItem.court}</div>
                
                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm text-gray-500 arabic-text">
                    {caseItem.notes}
                  </div>
                  <div>{getUrgencyBadge(caseItem.urgency)}</div>
                </div>
                
                <div className="flex justify-end mt-3">
                  <Button size="sm" variant="outline" className="arabic-text ml-2">التفاصيل</Button>
                  <Button size="sm" variant="default" className="arabic-text bg-lawyer-primary hover:bg-lawyer-secondary">تحديث</Button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500 arabic-text">
              <AlertCircle className="mx-auto h-8 w-8 mb-2 text-gray-400" />
              لا توجد نتائج مطابقة للبحث
            </div>
          )}
        </div>

        <Button 
          className="w-full mt-6 bg-lawyer-primary hover:bg-lawyer-secondary arabic-text"
          onClick={handleAddCase}
        >
          <Plus className="ml-2 h-4 w-4" />
          إضافة قضية جديدة
        </Button>
      </div>
      
      <AddCaseForm 
        isOpen={showAddForm} 
        onClose={() => setShowAddForm(false)} 
      />
    </div>
  );
};

export default PendingCases;
