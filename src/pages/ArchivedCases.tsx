
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ArchivedCases = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterYear, setFilterYear] = useState('all');
  const [filterResult, setFilterResult] = useState('all');
  const [selectedCase, setSelectedCase] = useState(null);
  const [showArchiveDialog, setShowArchiveDialog] = useState(false);
  const [showFilesDialog, setShowFilesDialog] = useState(false);
  
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
      compensation: "65000 د.ج",
      archiveNotes: "تم أرشفة جميع الوثائق الأصلية في الصندوق A-15، ونسخ إلكترونية على النظام.",
      archiveLocation: "الرف الثالث - قسم القضايا التجارية",
      files: [
        { name: "صحيفة الدعوى", type: "pdf", size: "1.2 MB", date: "2021-01-15", path: "/files/case_1/complaint.pdf" },
        { name: "المذكرة الجوابية", type: "pdf", size: "0.9 MB", date: "2021-02-10", path: "/files/case_1/response.pdf" },
        { name: "تقرير الخبير", type: "pdf", size: "3.5 MB", date: "2021-04-05", path: "/files/case_1/expert_report.pdf" },
        { name: "الحكم النهائي", type: "pdf", size: "1.8 MB", date: "2021-06-20", path: "/files/case_1/judgment.pdf" },
        { name: "إيصالات رسوم المحكمة", type: "pdf", size: "0.5 MB", date: "2021-01-20", path: "/files/case_1/court_fees.pdf" }
      ]
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
      compensation: "0 د.ج",
      archiveNotes: "تم أرشفة الوثائق بعد استنفاد طرق الطعن. جميع الأصول في الصندوق A-16.",
      archiveLocation: "الرف الثاني - قسم القضايا الإدارية",
      files: [
        { name: "طلب الاستئناف", type: "pdf", size: "1.4 MB", date: "2021-07-15", path: "/files/case_2/appeal.pdf" },
        { name: "المذكرة التفسيرية", type: "docx", size: "0.7 MB", date: "2021-07-20", path: "/files/case_2/explanation.docx" },
        { name: "الحكم الابتدائي", type: "pdf", size: "2.1 MB", date: "2021-05-18", path: "/files/case_2/first_judgment.pdf" },
        { name: "حكم الاستئناف", type: "pdf", size: "1.9 MB", date: "2021-08-05", path: "/files/case_2/appeal_judgment.pdf" }
      ]
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
      compensation: "120000 د.ج",
      archiveNotes: "قضية مهمة تحتوي على سوابق قضائية. تمت أرشفة جميع الوثائق مع نسخ احتياطية إضافية.",
      archiveLocation: "الرف الرابع - قسم القضايا العقارية الهامة",
      files: [
        { name: "صحيفة الدعوى", type: "pdf", size: "1.5 MB", date: "2022-01-05", path: "/files/case_3/complaint.pdf" },
        { name: "عقود الملكية", type: "pdf", size: "4.2 MB", date: "2022-01-05", path: "/files/case_3/property_deeds.pdf" },
        { name: "تقرير الخبرة العقارية", type: "pdf", size: "6.8 MB", date: "2022-01-30", path: "/files/case_3/expert_report.pdf" },
        { name: "الحكم النهائي", type: "pdf", size: "2.3 MB", date: "2022-02-15", path: "/files/case_3/judgment.pdf" },
        { name: "مستندات التعويض", type: "pdf", size: "1.1 MB", date: "2022-03-10", path: "/files/case_3/compensation.pdf" }
      ]
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
      compensation: "25000 د.ج",
      archiveNotes: "تم حفظ المستندات الأصلية مع نسخ من الأدلة الجنائية في ملف منفصل.",
      archiveLocation: "الرف الأول - قسم القضايا الجنائية",
      files: [
        { name: "محضر الضبط", type: "pdf", size: "0.8 MB", date: "2022-01-20", path: "/files/case_4/report.pdf" },
        { name: "شهادات الشهود", type: "pdf", size: "2.4 MB", date: "2022-02-15", path: "/files/case_4/testimonies.pdf" },
        { name: "تقرير الطب الشرعي", type: "pdf", size: "3.7 MB", date: "2022-02-28", path: "/files/case_4/forensic_report.pdf" },
        { name: "قرار المحكمة", type: "pdf", size: "1.6 MB", date: "2022-03-30", path: "/files/case_4/court_decision.pdf" }
      ]
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
      compensation: "0 د.ج",
      archiveNotes: "تم أرشفة جميع المستندات بعد انتهاء المدة القانونية للطعن.",
      archiveLocation: "الرف الثاني - قسم القضايا المدنية",
      files: [
        { name: "صحيفة الدعوى", type: "pdf", size: "1.1 MB", date: "2020-08-15", path: "/files/case_5/complaint.pdf" },
        { name: "مذكرة الدفاع", type: "docx", size: "0.9 MB", date: "2020-09-10", path: "/files/case_5/defense.docx" },
        { name: "مستندات داعمة", type: "pdf", size: "5.2 MB", date: "2020-09-25", path: "/files/case_5/evidence.pdf" },
        { name: "الحكم", type: "pdf", size: "1.4 MB", date: "2020-11-10", path: "/files/case_5/judgment.pdf" }
      ]
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

  const handleBrowseArchive = (caseItem) => {
    setSelectedCase(caseItem);
    setShowArchiveDialog(true);
  };

  const handleViewFiles = (caseItem) => {
    setSelectedCase(caseItem);
    setShowFilesDialog(true);
  };

  const getResultBadge = (result: string) => {
    if (result === "لصالح الموكل") {
      return <Badge className="bg-green-500 hover:bg-green-600">{result}</Badge>;
    } else {
      return <Badge className="bg-red-500 hover:bg-red-600">{result}</Badge>;
    }
  };

  const getFileIcon = (type) => {
    if (type === "pdf") {
      return <FileCheck className="h-5 w-5 text-red-500" />;
    } else if (type === "docx") {
      return <FileCheck className="h-5 w-5 text-blue-500" />;
    } else {
      return <FileCheck className="h-5 w-5 text-gray-500" />;
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
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="arabic-text"
                      onClick={() => handleBrowseArchive(caseItem)}
                    >
                      <Archive className="ml-1 h-4 w-4" />
                      استعراض
                    </Button>
                    {caseItem.result === "لصالح الموكل" ? (
                      <Button 
                        size="sm" 
                        variant="default" 
                        className="arabic-text bg-green-600 hover:bg-green-700"
                        onClick={() => handleViewFiles(caseItem)}
                      >
                        <FileCheck className="ml-1 h-4 w-4" />
                        عرض الملفات
                      </Button>
                    ) : (
                      <Button 
                        size="sm" 
                        variant="default" 
                        className="arabic-text bg-red-600 hover:bg-red-700"
                        onClick={() => handleViewFiles(caseItem)}
                      >
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

      {/* Archive details dialog */}
      <Dialog open={showArchiveDialog} onOpenChange={setShowArchiveDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold arabic-text">تفاصيل الأرشفة</DialogTitle>
            <DialogDescription className="arabic-text">
              معلومات أرشفة القضية رقم {selectedCase?.caseNumber}
            </DialogDescription>
          </DialogHeader>
          
          {selectedCase && (
            <div className="py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 arabic-text">رقم القضية</h3>
                  <p className="arabic-text">{selectedCase.caseNumber}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 arabic-text">تاريخ الأرشفة</h3>
                  <p className="arabic-text">{selectedCase.archiveDate}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 arabic-text">صندوق الأرشيف</h3>
                  <p className="arabic-text">{selectedCase.archiveBox}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 arabic-text">موقع الأرشيف</h3>
                  <p className="arabic-text">{selectedCase.archiveLocation}</p>
                </div>
              </div>
              
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-500 arabic-text">ملاحظات الأرشفة</h3>
                <p className="arabic-text bg-gray-50 p-3 rounded mt-1">{selectedCase.archiveNotes}</p>
              </div>
              
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-500 arabic-text">الملفات المؤرشفة</h3>
                <p className="text-sm text-gray-500 arabic-text">عدد الملفات: {selectedCase.files.length}</p>
                
                <ul className="mt-2 space-y-1">
                  {selectedCase.files.map((file, index) => (
                    <li key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <div className="flex items-center">
                        {getFileIcon(file.type)}
                        <span className="mr-2 arabic-text">{file.name}</span>
                      </div>
                      <div className="text-sm text-gray-500 arabic-text">
                        {file.size} - {file.type.toUpperCase()}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex justify-end gap-2 mt-6">
                <Button variant="outline" className="arabic-text">
                  <Download className="ml-1 h-4 w-4" />
                  تصدير بيانات الأرشيف
                </Button>
                <Button className="arabic-text bg-lawyer-primary hover:bg-lawyer-secondary">
                  تحديث بيانات الأرشيف
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Files dialog */}
      <Dialog open={showFilesDialog} onOpenChange={setShowFilesDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold arabic-text">ملفات القضية</DialogTitle>
            <DialogDescription className="arabic-text">
              الملفات المتعلقة بالقضية رقم {selectedCase?.caseNumber} - {selectedCase?.client}
            </DialogDescription>
          </DialogHeader>
          
          {selectedCase && (
            <div className="py-4">
              <Tabs defaultValue="documents">
                <TabsList className="w-full mb-4">
                  <TabsTrigger value="documents" className="arabic-text">المستندات الرسمية</TabsTrigger>
                  <TabsTrigger value="evidence" className="arabic-text">الأدلة والإثباتات</TabsTrigger>
                  <TabsTrigger value="judgments" className="arabic-text">الأحكام والقرارات</TabsTrigger>
                </TabsList>
                
                <TabsContent value="documents" className="space-y-4">
                  <div className="grid grid-cols-1 gap-2">
                    {selectedCase.files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-white p-3 rounded-md border">
                        <div className="flex items-center">
                          {getFileIcon(file.type)}
                          <span className="mr-2 font-medium arabic-text">{file.name}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm text-gray-500 ml-4 arabic-text">{file.date}</span>
                          <span className="text-sm text-gray-500 ml-4 arabic-text">{file.size}</span>
                          <Button variant="ghost" size="sm" className="ml-2">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="evidence" className="space-y-4">
                  <div className="text-center py-4 arabic-text text-gray-500">
                    <Archive className="mx-auto h-8 w-8 mb-2 text-gray-400" />
                    يمكنك الوصول للأدلة والإثباتات في الأرشيف الفعلي
                  </div>
                </TabsContent>
                
                <TabsContent value="judgments" className="space-y-4">
                  {selectedCase.files
                    .filter(file => file.name.includes("حكم") || file.name.includes("قرار"))
                    .map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-white p-3 rounded-md border">
                        <div className="flex items-center">
                          {getFileIcon(file.type)}
                          <span className="mr-2 font-medium arabic-text">{file.name}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm text-gray-500 ml-4 arabic-text">{file.date}</span>
                          <Button variant="ghost" size="sm" className="ml-2">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    
                    {selectedCase.files.filter(file => file.name.includes("حكم") || file.name.includes("قرار")).length === 0 && (
                      <div className="text-center py-4 arabic-text text-gray-500">
                        <FileX className="mx-auto h-8 w-8 mb-2 text-gray-400" />
                        لا توجد أحكام أو قرارات متاحة رقمياً
                      </div>
                    )}
                </TabsContent>
              </Tabs>
              
              <div className="flex justify-between mt-6">
                <Button variant="outline" className="arabic-text">
                  <Download className="ml-1 h-4 w-4" />
                  تحميل جميع الملفات
                </Button>
                <Button className="arabic-text bg-lawyer-primary hover:bg-lawyer-secondary">
                  طلب نسخ إضافية
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ArchivedCases;
