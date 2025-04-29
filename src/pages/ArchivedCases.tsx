
import React, { useState } from 'react';
import Navbar from '../components/navbar';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Search, Download, Archive, AlertCircle, FileX, FileCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const ArchivedCases = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterYear, setFilterYear] = useState('all');
  const [filterResult, setFilterResult] = useState('all');
  
  // Mock data for archived cases
  const archivedCases = [
    { 
      id: 1, 
      caseNumber: "2021/10", 
      client: "نادية حسين", 
      court: "المحكمة الإبتدائية", 
      date: "2021-06-20", 
      result: "لصالح الموكل",
      subject: "نزاع تجاري",
      archiveDate: "2021-12-25",
      archiveBox: "A-15",
      compensation: "65000 د.ج"
    },
    { 
      id: 2, 
      caseNumber: "2021/15", 
      client: "يوسف مالك", 
      court: "محكمة الإستئناف", 
      date: "2021-08-05", 
      result: "ضد الموكل",
      subject: "قضية إدارية",
      archiveDate: "2022-01-10",
      archiveBox: "A-16",
      compensation: "0 د.ج"
    },
    { 
      id: 3, 
      caseNumber: "2022/03", 
      client: "سارة علي", 
      court: "المحكمة العليا", 
      date: "2022-02-15", 
      result: "لصالح الموكل",
      subject: "نزاع عقاري",
      archiveDate: "2022-08-20",
      archiveBox: "A-20",
      compensation: "120000 د.ج"
    },
    { 
      id: 4, 
      caseNumber: "2022/08", 
      client: "محمود حسن", 
      court: "محكمة الجنح", 
      date: "2022-03-30", 
      result: "لصالح الموكل",
      subject: "قضية جنائية",
      archiveDate: "2022-09-15",
      archiveBox: "B-05",
      compensation: "25000 د.ج"
    },
    { 
      id: 5, 
      caseNumber: "2020/22", 
      client: "كمال سعيد", 
      court: "المحكمة الإبتدائية", 
      date: "2020-11-10", 
      result: "ضد الموكل",
      subject: "نزاع مدني",
      archiveDate: "2021-04-20",
      archiveBox: "A-08",
      compensation: "0 د.ج"
    },
  ];

  // Get unique years from case numbers
  const years = [...new Set(archivedCases.map(c => c.caseNumber.split('/')[0]))];

  // Filter cases based on search query and filters
  const filteredCases = archivedCases.filter(caseItem => {
    const matchesSearch = 
      caseItem.caseNumber.includes(searchQuery) || 
      caseItem.client.includes(searchQuery) ||
      caseItem.subject.includes(searchQuery);
    
    const matchesYear = filterYear === 'all' || caseItem.caseNumber.startsWith(filterYear);
    const matchesResult = filterResult === 'all' || caseItem.result === filterResult;
    
    return matchesSearch && matchesYear && matchesResult;
  });

  const getResultBadge = (result: string) => {
    if (result === "لصالح الموكل") {
      return <Badge className="bg-green-500 hover:bg-green-600">{result}</Badge>;
    } else {
      return <Badge className="bg-red-500 hover:bg-red-600">{result}</Badge>;
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
          <h1 className="text-xl font-bold mr-2 arabic-text">القضايا المؤرشفة</h1>
        </div>

        <div className="flex flex-col md:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="بحث عن قضية أو موكل"
              className="pl-10 pr-10 arabic-text text-right"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Select value={filterYear} onValueChange={setFilterYear}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="السنة" className="arabic-text" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="arabic-text">كل السنوات</SelectItem>
              {years.map(year => (
                <SelectItem key={year} value={year} className="arabic-text">
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={filterResult} onValueChange={setFilterResult}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="النتيجة" className="arabic-text" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="arabic-text">كل النتائج</SelectItem>
              <SelectItem value="لصالح الموكل" className="arabic-text">لصالح الموكل</SelectItem>
              <SelectItem value="ضد الموكل" className="arabic-text">ضد الموكل</SelectItem>
            </SelectContent>
          </Select>
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
                  <div className="flex flex-col items-end">
                    <span className="text-gray-600 arabic-text">تاريخ الحكم: {caseItem.date}</span>
                    <span className="text-gray-600 arabic-text text-sm">تاريخ الأرشفة: {caseItem.archiveDate}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                  <div className="arabic-text mb-1">العميل: {caseItem.client}</div>
                  <div className="arabic-text text-gray-600 mb-1">المحكمة: {caseItem.court}</div>
                  <div className="arabic-text text-gray-600">صندوق الأرشيف: {caseItem.archiveBox}</div>
                  <div className="arabic-text">التعويضات: {caseItem.compensation}</div>
                </div>
                
                <div className="flex justify-between items-center mt-3">
                  <div>{getResultBadge(caseItem.result)}</div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="arabic-text">
                      <Archive className="ml-1 h-4 w-4" />
                      استعراض
                    </Button>
                    {caseItem.result === "لصالح الموكل" ? (
                      <Button size="sm" variant="default" className="arabic-text bg-green-600 hover:bg-green-700">
                        <FileCheck className="ml-1 h-4 w-4" />
                        عرض الملفات
                      </Button>
                    ) : (
                      <Button size="sm" variant="default" className="arabic-text bg-red-600 hover:bg-red-700">
                        <FileX className="ml-1 h-4 w-4" />
                        عرض الملفات
                      </Button>
                    )}
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
        
        <div className="flex gap-3 mt-6">
          <Button variant="outline" className="flex-1 arabic-text">
            <Download className="ml-2 h-4 w-4" />
            تصدير قائمة الأرشيف
          </Button>
          <Button className="flex-1 bg-lawyer-primary hover:bg-lawyer-secondary arabic-text">
            <Archive className="ml-2 h-4 w-4" />
            إدارة الأرشيف
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ArchivedCases;
