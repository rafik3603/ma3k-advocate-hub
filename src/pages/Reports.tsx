
import React, { useState } from 'react';
import Navbar from '../components/navbar';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, FileText, Download, CalendarDays, AlertCircle, Printer, Mail, BarChart3, PieChart } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const Reports = () => {
  const [activeTab, setActiveTab] = useState("cases");
  const [selectedCases, setSelectedCases] = useState<number[]>([]);
  const [selectedClients, setSelectedClients] = useState<number[]>([]);
  const [selectedFinancials, setSelectedFinancials] = useState<number[]>([]);
  const [dateRange, setDateRange] = useState("month");
  const [reportFormat, setReportFormat] = useState("pdf");
  
  // Mock data for cases
  const cases = [
    { 
      id: 1, 
      caseNumber: "2023/01", 
      client: "أحمد محمد", 
      court: "المحكمة الإبتدائية", 
      status: "مؤجل", 
      nextDate: "2023-05-20",
      type: "نزاع عقاري"
    },
    { 
      id: 2, 
      caseNumber: "2023/02", 
      client: "فاطمة علي", 
      court: "محكمة الإستئناف", 
      status: "مؤجل", 
      nextDate: "2023-05-18",
      type: "نزاع تجاري"
    },
    { 
      id: 3, 
      caseNumber: "2022/15", 
      client: "خالد عمر", 
      court: "المحكمة العليا", 
      status: "مفصول فيه", 
      result: "لصالح الموكل", 
      date: "2022-12-10",
      type: "قضية جنائية"
    },
    { 
      id: 4, 
      caseNumber: "2023/03", 
      client: "سارة حسين", 
      court: "محكمة الأسرة", 
      status: "مؤجل", 
      nextDate: "2023-06-01",
      type: "أحوال شخصية"
    },
    { 
      id: 5, 
      caseNumber: "2023/04", 
      client: "شركة النور", 
      court: "المحكمة العمالية", 
      status: "مؤجل", 
      nextDate: "2023-05-25",
      type: "نزاع عمالي"
    },
  ];
  
  // Mock data for clients
  const clients = [
    { 
      id: 1, 
      name: "أحمد محمد علي", 
      phone: "0123456789", 
      activeCases: 2, 
      totalPaid: 12000, 
      totalDebt: 3000,
      clientSince: "2022-06-15"
    },
    { 
      id: 2, 
      name: "فاطمة سعيد عمر", 
      phone: "0198765432", 
      activeCases: 1, 
      totalPaid: 5000, 
      totalDebt: 0,
      clientSince: "2021-09-20"
    },
    { 
      id: 3, 
      name: "محمود خالد رياض", 
      phone: "0123789456", 
      activeCases: 0, 
      totalPaid: 7000, 
      totalDebt: 0,
      clientSince: "2020-11-05"
    },
    { 
      id: 4, 
      name: "شركة النور للتجارة", 
      phone: "0770123456", 
      activeCases: 3, 
      totalPaid: 45000, 
      totalDebt: 15000,
      clientSince: "2019-08-15"
    },
    { 
      id: 5, 
      name: "سارة أحمد حسين", 
      phone: "0661234567", 
      activeCases: 2, 
      totalPaid: 12000, 
      totalDebt: 3000,
      clientSince: "2023-01-10"
    },
  ];
  
  // Mock data for financials
  const financials = [
    { 
      id: 1, 
      client: "أحمد محمد علي", 
      caseNumber: "2023/01", 
      amount: 5000, 
      type: "دفع", 
      date: "2023-05-01",
      category: "أتعاب محاماة"
    },
    { 
      id: 2, 
      client: "فاطمة سعيد عمر", 
      caseNumber: "2023/02", 
      amount: 3000, 
      type: "دفع", 
      date: "2023-05-05",
      category: "استشارة"
    },
    { 
      id: 3, 
      client: "أحمد محمد علي", 
      caseNumber: "2023/01", 
      amount: 3000, 
      type: "دين", 
      date: "2023-05-10",
      category: "أتعاب محاماة"
    },
    { 
      id: 4, 
      client: "شركة النور للتجارة", 
      caseNumber: "2023/04", 
      amount: 15000, 
      type: "دفع", 
      date: "2023-05-12",
      category: "أتعاب محاماة"
    },
    { 
      id: 5, 
      client: "سارة أحمد حسين", 
      caseNumber: "2023/05", 
      amount: 2500, 
      type: "مصروف", 
      date: "2023-05-15",
      category: "رسوم محكمة"
    },
  ];
  
  // Toggle case selection
  const toggleCaseSelection = (id: number) => {
    if (selectedCases.includes(id)) {
      setSelectedCases(selectedCases.filter(caseId => caseId !== id));
    } else {
      setSelectedCases([...selectedCases, id]);
    }
  };
  
  // Toggle client selection
  const toggleClientSelection = (id: number) => {
    if (selectedClients.includes(id)) {
      setSelectedClients(selectedClients.filter(clientId => clientId !== id));
    } else {
      setSelectedClients([...selectedClients, id]);
    }
  };
  
  // Toggle financial selection
  const toggleFinancialSelection = (id: number) => {
    if (selectedFinancials.includes(id)) {
      setSelectedFinancials(selectedFinancials.filter(transactionId => transactionId !== id));
    } else {
      setSelectedFinancials([...selectedFinancials, id]);
    }
  };

  // Calculate summary stats
  const activeCasesCount = cases.filter(c => c.status === "مؤجل").length;
  const closedCasesCount = cases.filter(c => c.status === "مفصول فيه").length;
  const totalRevenue = financials.filter(f => f.type === "دفع").reduce((sum, f) => sum + f.amount, 0);
  const totalExpenses = financials.filter(f => f.type === "مصروف").reduce((sum, f) => sum + f.amount, 0);
  
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
          <h1 className="text-xl font-bold mr-2 arabic-text">التقارير</h1>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <Card>
            <CardHeader className="py-2 px-4">
              <CardTitle className="text-sm arabic-text">القضايا النشطة</CardTitle>
            </CardHeader>
            <CardContent className="py-2 px-4">
              <p className="text-2xl font-bold">{activeCasesCount}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="py-2 px-4">
              <CardTitle className="text-sm arabic-text">القضايا المغلقة</CardTitle>
            </CardHeader>
            <CardContent className="py-2 px-4">
              <p className="text-2xl font-bold">{closedCasesCount}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="py-2 px-4">
              <CardTitle className="text-sm arabic-text">إجمالي الإيرادات</CardTitle>
            </CardHeader>
            <CardContent className="py-2 px-4">
              <p className="text-2xl font-bold">{totalRevenue} د.ج</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="py-2 px-4">
              <CardTitle className="text-sm arabic-text">إجمالي المصروفات</CardTitle>
            </CardHeader>
            <CardContent className="py-2 px-4">
              <p className="text-2xl font-bold">{totalExpenses} د.ج</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg arabic-text">إنشاء تقرير</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <h3 className="text-sm font-medium mb-2 arabic-text">الفترة الزمنية</h3>
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      size="sm" 
                      variant={dateRange === "week" ? "default" : "outline"} 
                      className="arabic-text"
                      onClick={() => setDateRange("week")}
                    >
                      الأسبوع الحالي
                    </Button>
                    <Button 
                      size="sm" 
                      variant={dateRange === "month" ? "default" : "outline"} 
                      className="arabic-text"
                      onClick={() => setDateRange("month")}
                    >
                      الشهر الحالي
                    </Button>
                    <Button 
                      size="sm" 
                      variant={dateRange === "quarter" ? "default" : "outline"} 
                      className="arabic-text"
                      onClick={() => setDateRange("quarter")}
                    >
                      الربع الحالي
                    </Button>
                    <Button 
                      size="sm" 
                      variant={dateRange === "year" ? "default" : "outline"} 
                      className="arabic-text"
                      onClick={() => setDateRange("year")}
                    >
                      السنة الحالية
                    </Button>
                    <Button 
                      size="sm" 
                      variant={dateRange === "custom" ? "default" : "outline"} 
                      className="arabic-text"
                      onClick={() => setDateRange("custom")}
                    >
                      <CalendarDays className="ml-1 h-4 w-4" />
                      مخصص
                    </Button>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2 arabic-text">تنسيق التقرير</h3>
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      size="sm" 
                      variant={reportFormat === "pdf" ? "default" : "outline"} 
                      className="arabic-text"
                      onClick={() => setReportFormat("pdf")}
                    >
                      PDF
                    </Button>
                    <Button 
                      size="sm" 
                      variant={reportFormat === "excel" ? "default" : "outline"} 
                      className="arabic-text"
                      onClick={() => setReportFormat("excel")}
                    >
                      Excel
                    </Button>
                    <Button 
                      size="sm" 
                      variant={reportFormat === "print" ? "default" : "outline"} 
                      className="arabic-text"
                      onClick={() => setReportFormat("print")}
                    >
                      <Printer className="ml-1 h-4 w-4" />
                      طباعة
                    </Button>
                    <Button 
                      size="sm" 
                      variant={reportFormat === "email" ? "default" : "outline"} 
                      className="arabic-text"
                      onClick={() => setReportFormat("email")}
                    >
                      <Mail className="ml-1 h-4 w-4" />
                      بريد إلكتروني
                    </Button>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2 arabic-text">نوع التقرير</h3>
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="arabic-text"
                      onClick={() => setActiveTab("cases")}
                    >
                      <BarChart3 className="ml-1 h-4 w-4" />
                      تفصيلي
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="arabic-text"
                      onClick={() => setActiveTab("financial")}
                    >
                      <PieChart className="ml-1 h-4 w-4" />
                      إحصائي
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="cases" className="arabic-text">القضايا</TabsTrigger>
            <TabsTrigger value="clients" className="arabic-text">الموكلين</TabsTrigger>
            <TabsTrigger value="financial" className="arabic-text">المالية</TabsTrigger>
          </TabsList>
          
          <TabsContent value="cases">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium arabic-text">تقارير القضايا</h3>
              <Select defaultValue="all">
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="نوع القضية" className="arabic-text" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" className="arabic-text">جميع القضايا</SelectItem>
                  <SelectItem value="active" className="arabic-text">قضايا نشطة</SelectItem>
                  <SelectItem value="closed" className="arabic-text">قضايا مغلقة</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-10"></TableHead>
                      <TableHead className="arabic-text">رقم القضية</TableHead>
                      <TableHead className="arabic-text">الموكل</TableHead>
                      <TableHead className="arabic-text">المحكمة</TableHead>
                      <TableHead className="arabic-text">النوع</TableHead>
                      <TableHead className="arabic-text">الحالة</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cases.map(caseItem => (
                      <TableRow key={caseItem.id}>
                        <TableCell>
                          <Checkbox 
                            checked={selectedCases.includes(caseItem.id)} 
                            onCheckedChange={() => toggleCaseSelection(caseItem.id)}
                          />
                        </TableCell>
                        <TableCell className="arabic-text">{caseItem.caseNumber}</TableCell>
                        <TableCell className="arabic-text">{caseItem.client}</TableCell>
                        <TableCell className="arabic-text">{caseItem.court}</TableCell>
                        <TableCell className="arabic-text">{caseItem.type}</TableCell>
                        <TableCell className="arabic-text">
                          <Badge className={caseItem.status === "مؤجل" ? "bg-amber-500" : "bg-green-500"}>
                            {caseItem.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                    {cases.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center arabic-text">
                          <AlertCircle className="mx-auto h-8 w-8 mb-2 text-gray-400" />
                          لا توجد بيانات متاحة
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            <div className="flex justify-end mt-4 gap-2">
              <Button 
                variant="outline" 
                className="arabic-text"
                disabled={selectedCases.length === 0}
              >
                <Download className="ml-2 h-4 w-4" />
                تصدير المحدد
              </Button>
              <Button 
                variant="default" 
                className="arabic-text bg-lawyer-primary hover:bg-lawyer-secondary"
                disabled={selectedCases.length === 0}
              >
                <FileText className="ml-2 h-4 w-4" />
                إنشاء تقرير القضايا
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="clients">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium arabic-text">تقارير الموكلين</h3>
              <Select defaultValue="all">
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="تصنيف" className="arabic-text" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" className="arabic-text">جميع الموكلين</SelectItem>
                  <SelectItem value="active" className="arabic-text">موكلين نشطين</SelectItem>
                  <SelectItem value="inactive" className="arabic-text">موكلين غير نشطين</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-10"></TableHead>
                      <TableHead className="arabic-text">الإسم</TableHead>
                      <TableHead className="arabic-text">الهاتف</TableHead>
                      <TableHead className="arabic-text">القضايا النشطة</TableHead>
                      <TableHead className="arabic-text">المدفوعات</TableHead>
                      <TableHead className="arabic-text">الديون</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {clients.map(client => (
                      <TableRow key={client.id}>
                        <TableCell>
                          <Checkbox 
                            checked={selectedClients.includes(client.id)} 
                            onCheckedChange={() => toggleClientSelection(client.id)}
                          />
                        </TableCell>
                        <TableCell className="arabic-text">{client.name}</TableCell>
                        <TableCell className="arabic-text">{client.phone}</TableCell>
                        <TableCell className="arabic-text">{client.activeCases}</TableCell>
                        <TableCell className="arabic-text">{client.totalPaid} د.ج</TableCell>
                        <TableCell className={`arabic-text ${client.totalDebt > 0 ? 'text-red-600' : ''}`}>
                          {client.totalDebt} د.ج
                        </TableCell>
                      </TableRow>
                    ))}
                    {clients.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center arabic-text">
                          <AlertCircle className="mx-auto h-8 w-8 mb-2 text-gray-400" />
                          لا توجد بيانات متاحة
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            <div className="flex justify-end mt-4 gap-2">
              <Button 
                variant="outline" 
                className="arabic-text"
                disabled={selectedClients.length === 0}
              >
                <Mail className="ml-2 h-4 w-4" />
                إرسال للمحددين
              </Button>
              <Button 
                variant="default" 
                className="arabic-text bg-lawyer-primary hover:bg-lawyer-secondary"
                disabled={selectedClients.length === 0}
              >
                <FileText className="ml-2 h-4 w-4" />
                إنشاء تقرير الموكلين
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="financial">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium arabic-text">التقارير المالية</h3>
              <Select defaultValue="all">
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="نوع المعاملة" className="arabic-text" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" className="arabic-text">جميع المعاملات</SelectItem>
                  <SelectItem value="income" className="arabic-text">الإيرادات</SelectItem>
                  <SelectItem value="expenses" className="arabic-text">المصروفات</SelectItem>
                  <SelectItem value="debts" className="arabic-text">الديون</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-10"></TableHead>
                      <TableHead className="arabic-text">الموكل</TableHead>
                      <TableHead className="arabic-text">رقم القضية</TableHead>
                      <TableHead className="arabic-text">المبلغ</TableHead>
                      <TableHead className="arabic-text">النوع</TableHead>
                      <TableHead className="arabic-text">التاريخ</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {financials.map(transaction => (
                      <TableRow key={transaction.id}>
                        <TableCell>
                          <Checkbox 
                            checked={selectedFinancials.includes(transaction.id)} 
                            onCheckedChange={() => toggleFinancialSelection(transaction.id)}
                          />
                        </TableCell>
                        <TableCell className="arabic-text">{transaction.client}</TableCell>
                        <TableCell className="arabic-text">{transaction.caseNumber}</TableCell>
                        <TableCell className="arabic-text">{transaction.amount} د.ج</TableCell>
                        <TableCell className="arabic-text">
                          <Badge className={transaction.type === "دفع" 
                            ? "bg-green-500"
                            : transaction.type === "دين"
                              ? "bg-amber-500"
                              : "bg-red-500"
                          }>
                            {transaction.type}
                          </Badge>
                        </TableCell>
                        <TableCell className="arabic-text">{transaction.date}</TableCell>
                      </TableRow>
                    ))}
                    {financials.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center arabic-text">
                          <AlertCircle className="mx-auto h-8 w-8 mb-2 text-gray-400" />
                          لا توجد بيانات متاحة
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            <div className="flex justify-end mt-4 gap-2">
              <Button 
                variant="outline" 
                className="arabic-text"
              >
                <PieChart className="ml-2 h-4 w-4" />
                عرض الرسوم البيانية
              </Button>
              <Button 
                variant="default" 
                className="arabic-text bg-lawyer-primary hover:bg-lawyer-secondary"
                disabled={selectedFinancials.length === 0}
              >
                <Download className="ml-2 h-4 w-4" />
                إنشاء تقرير مالي
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Reports;
