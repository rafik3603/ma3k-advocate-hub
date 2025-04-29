
import React, { useState } from 'react';
import Navbar from '../components/navbar';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { AddCaseForm } from "../components/add-case-form";

const PendingCases = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  
  // Mock data for pending cases
  const pendingCases = [
    { id: 1, caseNumber: "2023/01", client: "أحمد محمد", court: "المحكمة الإبتدائية", date: "2023-05-15" },
    { id: 2, caseNumber: "2023/02", client: "فاطمة علي", court: "محكمة الإستئناف", date: "2023-05-18" },
    { id: 3, caseNumber: "2023/03", client: "محمود عبدالله", court: "المحكمة الإبتدائية", date: "2023-05-20" },
  ];

  const filteredCases = pendingCases.filter(caseItem => 
    caseItem.caseNumber.includes(searchQuery) || 
    caseItem.client.includes(searchQuery)
  );

  const handleAddCase = () => {
    setShowAddForm(true);
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
                  <span className="font-medium arabic-text">رقم القضية: {caseItem.caseNumber}</span>
                  <span className="text-gray-600 arabic-text">{caseItem.date}</span>
                </div>
                <div className="arabic-text mb-1">العميل: {caseItem.client}</div>
                <div className="arabic-text text-gray-600">المحكمة: {caseItem.court}</div>
                <div className="flex justify-end mt-3">
                  <Button size="sm" variant="outline" className="arabic-text ml-2">التفاصيل</Button>
                  <Button size="sm" variant="default" className="arabic-text bg-lawyer-primary hover:bg-lawyer-secondary">تحديث</Button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500 arabic-text">
              لا توجد نتائج مطابقة للبحث
            </div>
          )}
        </div>

        <Button 
          className="w-full mt-6 bg-lawyer-primary hover:bg-lawyer-secondary arabic-text"
          onClick={handleAddCase}
        >
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
