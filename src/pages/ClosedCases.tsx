
import React, { useState } from 'react';
import Navbar from '../components/navbar';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Search, Download, FileText, PieChart, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ClosedCases = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState("all");
  
  // Mock data for closed cases
  const closedCases = [
    { 
      id: 1, 
      caseNumber: "2022/05", 
      client: "سليم رياض", 
      court: "المحكمة الإبتدائية", 
      date: "2022-11-30", 
      result: "لصالح الموكل",
      subject: "نزاع تجاري",
      compensation: "50000 د.ج",
      judge: "فريد محمد"
    },
    { 
      id: 2, 
      caseNumber: "2022/08", 
      client: "ليلى حسن", 
      court: "محكمة الإستئناف", 
      date: "2022-12-10", 
      result: "ضد الموكل",
      subject: "قضية إدارية",
      compensation: "0 د.ج",
      judge: "سمير أحمد"
    },
    { 
      id: 3, 
      caseNumber: "2023/01", 
      client: "كريم سعيد", 
      court: "المحكمة العليا", 
      date: "2023-01-05", 
      result: "لصالح الموكل",
      subject: "نزاع عمالي",
      compensation: "35000 د.ج",
      judge: "نادية حسين"
    },
    { 
      id: 4, 
      caseNumber: "2023/04", 
      client: "محمد عبد الله", 
      court: "المحكمة الإبتدائية", 
      date: "2023-02-15", 
      result: "صلح",
      subject: "نزاع مدني",
      compensation: "20000 د.ج",
      judge: "أمين خالد"
    },
    { 
      id: 5, 
      caseNumber: "2023/07", 
      client: "فاطمة العربي", 
      court: "محكمة الأسرة", 
      date: "2023-03-20", 
      result: "لصالح الموكل",
      subject: "قضية أحوال شخصية",
      compensation: "15000 د.ج",
      judge: "ياسمين عمر"
    },
  ];

  // Statistics
  const totalCases = closedCases.length;
  const wonCases = closedCases.filter(c => c.result === "لصالح الموكل").length;
  const lostCases = closedCases.filter(c => c.result === "ضد الموكل").length;
  const settledCases = closedCases.filter(c => c.result === "صلح").length;
  
  // Total compensation
  const totalCompensation = closedCases.reduce((total, c) => {
    const value = parseInt(c.compensation.replace(/\D/g,'')) || 0;
    return total + value;
  }, 0);

  // Filter cases based on search query and tab
  const filteredCases = closedCases.filter(caseItem => {
    const matchesSearch = 
      caseItem.caseNumber.includes(searchQuery) || 
      caseItem.client.includes(searchQuery) ||
      caseItem.subject.includes(searchQuery);
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "won") return matchesSearch && caseItem.result === "لصالح الموكل";
    if (activeTab === "lost") return matchesSearch && caseItem.result === "ضد الموكل";
    if (activeTab === "settled") return matchesSearch && caseItem.result === "صلح";
    
    return matchesSearch;
  });

  const getResultBadge = (result: string) => {
    if (result === "لصالح الموكل") {
      return <Badge className="bg-green-500 hover:bg-green-600">{result}</Badge>;
    } else if (result === "ضد الموكل") {
      return <Badge className="bg-red-500 hover:bg-red-600">{result}</Badge>;
    } else {
      return <Badge className="bg-blue-500 hover:bg-blue-600">{result}</Badge>;
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
          <h1 className="text-xl font-bold mr-2 arabic-text">القضايا المفصول فيها</h1>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <Card>
            <CardHeader className="py-2 px-4">
              <CardTitle className="text-sm arabic-text">إجمالي القضايا</CardTitle>
            </CardHeader>
            <CardContent className="py-2 px-4">
              <p className="text-2xl font-bold">{totalCases}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="py-2 px-4">
              <CardTitle className="text-sm arabic-text text-green-600">قضايا مكسوبة</CardTitle>
            </CardHeader>
            <CardContent className="py-2 px-4">
              <p className="text-2xl font-bold text-green-600">{wonCases}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="py-2 px-4">
              <CardTitle className="text-sm arabic-text text-red-600">قضايا مخسورة</CardTitle>
            </CardHeader>
            <CardContent className="py-2 px-4">
              <p className="text-2xl font-bold text-red-600">{lostCases}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="py-2 px-4">
              <CardTitle className="text-sm arabic-text">إجمالي التعويضات</CardTitle>
            </CardHeader>
            <CardContent className="py-2 px-4">
              <p className="text-2xl font-bold">{totalCompensation} د.ج</p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
          <TabsList className="w-full grid grid-cols-4">
            <TabsTrigger value="all" className="arabic-text">الكل</TabsTrigger>
            <TabsTrigger value="won" className="arabic-text">مكسوبة</TabsTrigger>
            <TabsTrigger value="lost" className="arabic-text">مخسورة</TabsTrigger>
            <TabsTrigger value="settled" className="arabic-text">صلح</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="relative mb-4">
          <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="بحث عن قضية"
            className="pl-10 pr-10 arabic-text text-right"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="space-y-4">
          {filteredCases.length > 0 ? (
            filteredCases.map(caseItem => (
              <div key={caseItem.id} className="bg-lawyer-light p-4 rounded-md border border-lawyer-primary">
                <div className="flex justify-between mb-2">
                  <div>
                    <span className="font-medium arabic-text">رقم القضية: {caseItem.caseNumber}</span>
                    <div className="text-sm arabic-text mt-1">{caseItem.subject}</div>
                  </div>
                  <span className="text-gray-600 arabic-text">{caseItem.date}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <div className="arabic-text">العميل: {caseItem.client}</div>
                  <div className="arabic-text text-gray-600">المحكمة: {caseItem.court}</div>
                  <div className="arabic-text text-gray-600">القاضي: {caseItem.judge}</div>
                  <div className="arabic-text">التعويضات: {caseItem.compensation}</div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>{getResultBadge(caseItem.result)}</div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="arabic-text">
                      <FileText className="ml-1 h-4 w-4" />
                      عرض الحكم
                    </Button>
                    <Button size="sm" variant="default" className="arabic-text bg-lawyer-primary hover:bg-lawyer-secondary">
                      عرض التفاصيل
                    </Button>
                  </div>
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
        
        <div className="flex mt-6 gap-3">
          <Button className="flex-1 bg-lawyer-primary hover:bg-lawyer-secondary arabic-text">
            <PieChart className="ml-2 h-4 w-4" />
            إنشاء تقرير إحصائي
          </Button>
          <Button className="flex-1 variant-outline arabic-text">
            <Download className="ml-2 h-4 w-4" />
            تصدير القائمة
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ClosedCases;
