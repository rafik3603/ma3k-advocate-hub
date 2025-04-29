
import React from 'react';
import Navbar from '../components/navbar';
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, FileText, Download, Printer, Share, Trash2, Edit } from "lucide-react";

const DocumentDetails = () => {
  const { id } = useParams();
  
  // Mock data for a document
  const document = {
    id: Number(id) || 1,
    title: "عريضة دعوى",
    caseNumber: "2023/01",
    clientName: "أحمد محمد علي",
    type: "عريضة",
    date: "2023-05-01",
    fileSize: "245 KB",
    content: `بسم الله الرحمن الرحيم

السيد(ة) رئيس محكمة الجزائر
السيد(ة) قاضي الأمور المستعجلة

عريضة افتتاح دعوى

المدعي: السيد أحمد محمد علي
الساكن بـ: الجزائر العاصمة، شارع ديدوش مراد رقم 45
بواسطة الأستاذ: محمد الأمين، محامي معتمد لدى المحكمة العليا

ضد

المدعى عليه: السيد رياض سعيد
الساكن بـ: الجزائر العاصمة، حي بلوزداد رقم 23

الموضوع: المطالبة بتعويض الضرر المادي والمعنوي

الوقائع:
بتاريخ 15 مارس 2023 تعرض موكلي لحادث مرور تسبب فيه المدعى عليه أثناء قيادته لسيارته بطريقة متهورة...

لهذه الأسباب
نلتمس من سيادتكم:
- قبول الدعوى شكلاً
- في الموضوع: الحكم على المدعى عليه بدفع مبلغ 500,000 دينار جزائري كتعويض عن الضرر المادي والمعنوي
- تحميل المدعى عليه المصاريف القضائية

حرر بالجزائر في: 01/05/2023
المحامي`
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      
      <div className="p-4">
        <div className="flex items-center mb-6">
          <Link to="/documents">
            <Button variant="ghost" size="icon">
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold mr-2 arabic-text">عرض المستند</h1>
        </div>
        
        <div className="bg-lawyer-light p-4 rounded-md mb-6 border border-lawyer-primary">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <FileText className="h-6 w-6 ml-2 text-lawyer-secondary" />
              <h2 className="font-bold text-xl arabic-text">{document.title}</h2>
            </div>
            <span className="text-sm text-gray-500 arabic-text">{document.fileSize}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="text-sm text-gray-600 arabic-text">
              رقم القضية: {document.caseNumber}
            </div>
            <div className="text-sm text-gray-600 arabic-text">
              الموكل: {document.clientName}
            </div>
            <div className="text-sm text-gray-600 arabic-text">
              النوع: {document.type}
            </div>
            <div className="text-sm text-gray-600 arabic-text">
              التاريخ: {document.date}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="outline" className="arabic-text">
              <Download className="ml-1 h-4 w-4" />
              تحميل
            </Button>
            <Button size="sm" variant="outline" className="arabic-text">
              <Printer className="ml-1 h-4 w-4" />
              طباعة
            </Button>
            <Button size="sm" variant="outline" className="arabic-text">
              <Share className="ml-1 h-4 w-4" />
              مشاركة
            </Button>
            <Button size="sm" variant="default" className="arabic-text bg-lawyer-primary hover:bg-lawyer-secondary">
              <Edit className="ml-1 h-4 w-4" />
              تعديل
            </Button>
            <Button size="sm" variant="destructive" className="arabic-text">
              <Trash2 className="ml-1 h-4 w-4" />
              حذف
            </Button>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-md border border-gray-200 mb-6">
          <pre className="whitespace-pre-wrap text-gray-800 arabic-text leading-relaxed">{document.content}</pre>
        </div>
      </div>
    </div>
  );
};

export default DocumentDetails;
