
import React, { useState } from 'react';
import Navbar from '../components/navbar';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Search, Plus, FileText, Download, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";

const Documents = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data for documents
  const documents = [
    { 
      id: 1, 
      title: "عريضة دعوى", 
      caseNumber: "2023/01", 
      type: "عريضة",
      date: "2023-05-01",
      fileSize: "245 KB"
    },
    { 
      id: 2, 
      title: "مذكرة دفاع", 
      caseNumber: "2023/02", 
      type: "مذكرة",
      date: "2023-05-05",
      fileSize: "187 KB"
    },
    { 
      id: 3, 
      title: "حكم قضائي", 
      caseNumber: "2022/15", 
      type: "حكم",
      date: "2023-05-10",
      fileSize: "432 KB"
    },
    { 
      id: 4, 
      title: "إفادة شهود", 
      caseNumber: "2023/03", 
      type: "إفادة",
      date: "2023-05-12",
      fileSize: "156 KB"
    },
  ];

  const filteredDocuments = documents.filter(doc => 
    doc.title.includes(searchQuery) || 
    doc.caseNumber.includes(searchQuery) ||
    doc.type.includes(searchQuery)
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
          <h1 className="text-xl font-bold mr-2 arabic-text">المستندات والعرائض</h1>
        </div>

        <div className="relative mb-4">
          <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="بحث عن مستند"
            className="pl-10 pr-10 arabic-text text-right"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="space-y-4 mb-6">
          {filteredDocuments.length > 0 ? (
            filteredDocuments.map(doc => (
              <div key={doc.id} className="bg-lawyer-light p-4 rounded-md border border-lawyer-primary">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-start">
                    <FileText className="h-5 w-5 ml-2 mt-1 text-lawyer-secondary" />
                    <div>
                      <h3 className="font-medium arabic-text">{doc.title}</h3>
                      <div className="text-sm text-gray-600 arabic-text">
                        رقم القضية: {doc.caseNumber} | نوع: {doc.type}
                      </div>
                    </div>
                  </div>
                  <span className="text-sm text-gray-600 arabic-text">{doc.date}</span>
                </div>
                
                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm text-gray-500 arabic-text">{doc.fileSize}</span>
                  
                  <div>
                    <Button size="sm" variant="outline" className="arabic-text ml-2">
                      <Download className="h-4 w-4 ml-1" />
                      تحميل
                    </Button>
                    <Button size="sm" variant="destructive" className="arabic-text">
                      <Trash2 className="h-4 w-4 ml-1" />
                      حذف
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500 arabic-text">
              لا توجد نتائج مطابقة للبحث
            </div>
          )}
        </div>

        <Button className="w-full bg-lawyer-primary hover:bg-lawyer-secondary arabic-text">
          <Plus className="ml-2 h-4 w-4" />
          إضافة مستند جديد
        </Button>
      </div>
    </div>
  );
};

export default Documents;
