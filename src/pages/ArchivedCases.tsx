
import React, { useState } from 'react';
import Navbar from '../components/navbar';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const ArchivedCases = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data for archived cases
  const archivedCases = [
    { id: 1, caseNumber: "2021/10", client: "نادية حسين", court: "المحكمة الإبتدائية", date: "2021-06-20", result: "لصالح الموكل" },
    { id: 2, caseNumber: "2021/15", client: "يوسف مالك", court: "محكمة الإستئناف", date: "2021-08-05", result: "ضد الموكل" },
    { id: 3, caseNumber: "2022/03", client: "سارة علي", court: "المحكمة العليا", date: "2022-02-15", result: "لصالح الموكل" },
  ];

  const filteredCases = archivedCases.filter(caseItem => 
    caseItem.caseNumber.includes(searchQuery) || 
    caseItem.client.includes(searchQuery)
  );

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

        <div className="relative mb-4">
          <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="بحث عن قضية أو موكل"
            className="pl-10 pr-10 arabic-text text-right"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="space-y-4">
          {filteredCases.map(caseItem => (
            <div key={caseItem.id} className="bg-lawyer-light p-4 rounded-md border border-lawyer-primary">
              <div className="flex justify-between mb-2">
                <span className="font-medium arabic-text">رقم القضية: {caseItem.caseNumber}</span>
                <span className="text-gray-600 arabic-text">{caseItem.date}</span>
              </div>
              <div className="arabic-text mb-1">العميل: {caseItem.client}</div>
              <div className="arabic-text text-gray-600 mb-1">المحكمة: {caseItem.court}</div>
              <div className={`arabic-text ${caseItem.result === "لصالح الموكل" ? "text-green-600" : "text-red-600"}`}>
                النتيجة: {caseItem.result}
              </div>
              <div className="flex justify-end mt-3">
                <Button size="sm" variant="outline" className="arabic-text">استرجاع</Button>
                <Button size="sm" variant="default" className="arabic-text mr-2 bg-lawyer-primary hover:bg-lawyer-secondary">عرض الملفات</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArchivedCases;
