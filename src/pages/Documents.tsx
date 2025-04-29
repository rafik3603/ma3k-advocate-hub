
import React, { useState } from 'react';
import Navbar from '../components/navbar';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Search, Plus, FileText, Download, Trash2, Filter, FileCheck, File, FileX, AlertCircle, FileSearch, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Documents = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [activeTab, setActiveTab] = useState('all');
  
  // Mock data for documents
  const documents = [
    { 
      id: 1, 
      title: "عريضة دعوى", 
      caseNumber: "2023/01", 
      client: "أحمد محمد علي",
      type: "عريضة",
      date: "2023-05-01",
      fileSize: "245 KB",
      status: "مكتمل",
      tags: ["دعوى", "عقار"],
      lastModified: "2023-05-02"
    },
    { 
      id: 2, 
      title: "مذكرة دفاع", 
      caseNumber: "2023/02", 
      client: "فاطمة سعيد عمر",
      type: "مذكرة",
      date: "2023-05-05",
      fileSize: "187 KB",
      status: "مكتمل",
      tags: ["دفاع", "تجاري"],
      lastModified: "2023-05-06"
    },
    { 
      id: 3, 
      title: "حكم قضائي", 
      caseNumber: "2022/15", 
      client: "محمود خالد رياض",
      type: "حكم",
      date: "2023-05-10",
      fileSize: "432 KB",
      status: "مكتمل",
      tags: ["حكم", "جنائي"],
      lastModified: "2023-05-10"
    },
    { 
      id: 4, 
      title: "إفادة شهود", 
      caseNumber: "2023/03", 
      client: "سارة أحمد حسين",
      type: "إفادة",
      date: "2023-05-12",
      fileSize: "156 KB",
      status: "قيد المراجعة",
      tags: ["شهادة", "مدني"],
      lastModified: "2023-05-13"
    },
    { 
      id: 5, 
      title: "مسودة عقد إيجار", 
      caseNumber: "2023/05", 
      client: "شركة النور للتجارة",
      type: "عقد",
      date: "2023-05-15",
      fileSize: "278 KB",
      status: "مسودة",
      tags: ["عقد", "إيجار"],
      lastModified: "2023-05-16"
    },
    { 
      id: 6, 
      title: "صحيفة طعن بالنقض", 
      caseNumber: "2022/10", 
      client: "كريم محمد",
      type: "صحيفة",
      date: "2023-05-18",
      fileSize: "310 KB",
      status: "مكتمل",
      tags: ["طعن", "نقض"],
      lastModified: "2023-05-19"
    },
  ];

  // Get unique document types
  const documentTypes = [...new Set(documents.map(doc => doc.type))];

  // Filter documents based on search query, filter type and active tab
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = 
      doc.title.includes(searchQuery) || 
      doc.caseNumber.includes(searchQuery) ||
      doc.client.includes(searchQuery) ||
      doc.tags.some(tag => tag.includes(searchQuery));
    
    const matchesType = filterType === 'all' || doc.type === filterType;
    
    if (activeTab === 'all') return matchesSearch && matchesType;
    if (activeTab === 'completed') return matchesSearch && matchesType && doc.status === "مكتمل";
    if (activeTab === 'drafts') return matchesSearch && matchesType && doc.status === "مسودة";
    if (activeTab === 'review') return matchesSearch && matchesType && doc.status === "قيد المراجعة";
    
    return matchesSearch && matchesType;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "مكتمل":
        return <Badge className="bg-green-500 hover:bg-green-600">{status}</Badge>;
      case "مسودة":
        return <Badge className="bg-amber-500 hover:bg-amber-600">{status}</Badge>;
      case "قيد المراجعة":
        return <Badge className="bg-blue-500 hover:bg-blue-600">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getDocumentTypeIcon = (type: string) => {
    switch (type) {
      case "عريضة":
        return <FileText className="h-5 w-5 ml-2 text-blue-500" />;
      case "مذكرة":
        return <FileCheck className="h-5 w-5 ml-2 text-green-500" />;
      case "حكم":
        return <FileSearch className="h-5 w-5 ml-2 text-purple-500" />;
      case "إفادة":
        return <File className="h-5 w-5 ml-2 text-amber-500" />;
      case "عقد":
        return <FileText className="h-5 w-5 ml-2 text-red-500" />;
      case "صحيفة":
        return <FileX className="h-5 w-5 ml-2 text-indigo-500" />;
      default:
        return <FileText className="h-5 w-5 ml-2 text-gray-500" />;
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
          <h1 className="text-xl font-bold mr-2 arabic-text">المستندات والعرائض</h1>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
          <TabsList className="w-full grid grid-cols-4">
            <TabsTrigger value="all" className="arabic-text">الكل</TabsTrigger>
            <TabsTrigger value="completed" className="arabic-text">مكتمل</TabsTrigger>
            <TabsTrigger value="drafts" className="arabic-text">مسودات</TabsTrigger>
            <TabsTrigger value="review" className="arabic-text">قيد المراجعة</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex flex-col md:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="بحث عن مستند"
              className="pl-10 pr-10 arabic-text text-right"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="نوع المستند" className="arabic-text" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="arabic-text">جميع الأنواع</SelectItem>
              {documentTypes.map(type => (
                <SelectItem key={type} value={type} className="arabic-text">
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4 mb-6">
          {filteredDocuments.length > 0 ? (
            filteredDocuments.map(doc => (
              <div key={doc.id} className="bg-lawyer-light p-4 rounded-md border border-lawyer-primary">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-start">
                    {getDocumentTypeIcon(doc.type)}
                    <div>
                      <h3 className="font-medium arabic-text">{doc.title}</h3>
                      <div className="text-sm text-gray-600 arabic-text">
                        رقم القضية: {doc.caseNumber} | العميل: {doc.client}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center text-sm text-gray-600 arabic-text mb-1">
                      <Calendar className="h-4 w-4 ml-1" />
                      {doc.date}
                    </div>
                    {getStatusBadge(doc.status)}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 mt-2 mb-3">
                  {doc.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="arabic-text">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm text-gray-500 arabic-text">
                    الحجم: {doc.fileSize} | آخر تعديل: {doc.lastModified}
                  </span>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="arabic-text">
                      <Download className="h-4 w-4 ml-1" />
                      تحميل
                    </Button>
                    <Button size="sm" variant="default" className="arabic-text bg-lawyer-primary hover:bg-lawyer-secondary">
                      عرض
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="destructive" className="arabic-text">
                          <Trash2 className="h-4 w-4 ml-1" />
                          حذف
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle className="arabic-text">تأكيد حذف المستند</DialogTitle>
                        </DialogHeader>
                        <div className="py-4 arabic-text">
                          هل أنت متأكد من رغبتك في حذف المستند "{doc.title}"؟ هذا الإجراء لا يمكن التراجع عنه.
                        </div>
                        <DialogFooter>
                          <Button variant="outline" className="arabic-text">إلغاء</Button>
                          <Button variant="destructive" className="arabic-text">تأكيد الحذف</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
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

        <div className="grid grid-cols-2 gap-3">
          <Button className="bg-lawyer-primary hover:bg-lawyer-secondary arabic-text">
            <Plus className="ml-2 h-4 w-4" />
            إضافة مستند جديد
          </Button>
          <Button variant="outline" className="arabic-text">
            <Filter className="ml-2 h-4 w-4" />
            خيارات البحث المتقدمة
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Documents;
