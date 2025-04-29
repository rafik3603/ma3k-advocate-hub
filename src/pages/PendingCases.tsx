
import React from 'react';
import Navbar from '../components/navbar';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const PendingCases = () => {
  // Mock data for pending cases
  const pendingCases = [
    { id: 1, caseNumber: "2023/01", client: "أحمد محمد", court: "المحكمة الإبتدائية", date: "2023-05-15" },
    { id: 2, caseNumber: "2023/02", client: "فاطمة علي", court: "محكمة الإستئناف", date: "2023-05-18" },
    { id: 3, caseNumber: "2023/03", client: "محمود عبدالله", court: "المحكمة الإبتدائية", date: "2023-05-20" },
  ];

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

        <div className="space-y-4">
          {pendingCases.map(caseItem => (
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
          ))}
        </div>

        <Button className="w-full mt-6 bg-lawyer-primary hover:bg-lawyer-secondary arabic-text">
          إضافة قضية جديدة
        </Button>
      </div>
    </div>
  );
};

export default PendingCases;
