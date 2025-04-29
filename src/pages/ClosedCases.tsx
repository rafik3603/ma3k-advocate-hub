
import React from 'react';
import Navbar from '../components/navbar';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const ClosedCases = () => {
  // Mock data for closed cases
  const closedCases = [
    { id: 1, caseNumber: "2022/05", client: "سليم رياض", court: "المحكمة الإبتدائية", date: "2022-11-30", result: "لصالح الموكل" },
    { id: 2, caseNumber: "2022/08", client: "ليلى حسن", court: "محكمة الإستئناف", date: "2022-12-10", result: "ضد الموكل" },
    { id: 3, caseNumber: "2023/01", client: "كريم سعيد", court: "المحكمة العليا", date: "2023-01-05", result: "لصالح الموكل" },
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
          <h1 className="text-xl font-bold mr-2 arabic-text">القضايا المفصول فيها</h1>
        </div>

        <div className="space-y-4">
          {closedCases.map(caseItem => (
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
                <Button size="sm" variant="outline" className="arabic-text">عرض التفاصيل</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClosedCases;
