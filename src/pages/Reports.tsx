
import React, { useState } from 'react';
import Navbar from '../components/navbar';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, FileText, Download, CalendarDays } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

const Reports = () => {
  const [activeTab, setActiveTab] = useState("cases");
  const [selectedCases, setSelectedCases] = useState<number[]>([]);
  const [selectedClients, setSelectedClients] = useState<number[]>([]);
  const [selectedFinancials, setSelectedFinancials] = useState<number[]>([]);
  const [dateRange, setDateRange] = useState("month");
  
  // Mock data for cases
  const cases = [
    { id: 1, caseNumber: "2023/01", client: "أحمد محمد", court: "المحكمة الإبتدائية", status: "مؤجل", nextDate: "2023-05-20" },
    { id: 2, caseNumber: "2023/02", client: "فاطمة علي", court: "محكمة الإستئناف", status: "مؤجل", nextDate: "2023-05-18" },
    { id: 3, caseNumber: "2022/15", client: "خالد عمر", court: "المحكمة العليا", status: "مفصول فيه", result: "لصالح الموكل", date: "2022-12-10" },
  ];
  
  // Mock data for clients
  const clients = [
    { id: 1, name: "أحمد محمد علي", phone: "0123456789", activeCases: 2, totalPaid: 12000, totalDebt: 3000 },
    { id: 2, name: "فاطمة سعيد عمر", phone: "0198765432", activeCases: 1, totalPaid: 5000, totalDebt: 0 },
    { id: 3, name: "محمود خالد رياض", phone: "0123789456", activeCases: 0, totalPaid: 7000, totalDebt: 0 },
  ];
  
  // Mock data for financials
  const financials = [
    { id: 1, client: "أحمد محمد علي", caseNumber: "2023/01", amount: 5000, type: "دفع", date: "2023-05-01" },
    { id: 2, client: "فاطمة سعيد عمر", caseNumber: "2023/02", amount: 3000, type: "دفع", date: "2023-05-05" },
    { id: 3, client: "أحمد محمد علي", caseNumber: "2023/01", amount: 3000, type: "دين", date: "2023-05-10" },
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
        
        <div className="mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg arabic-text">إنشاء تقرير</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
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
            </CardContent>
          </Card>
        </div>
        
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="w-full mb-4">
            <TabsTrigger value="cases" className="w-1/3 arabic-text">القضايا</TabsTrigger>
            <TabsTrigger value="clients" className="w-1/3 arabic-text">الموكلين</TabsTrigger>
            <TabsTrigger value="financials" className="w-1/3 arabic-text">المالية</TabsTrigger>
          </TabsList>
          
          <TabsContent value="cases">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10"></TableHead>
                  <TableHead className="arabic-text">رقم القضية</TableHead>
                  <TableHead className="arabic-text">الموكل</TableHead>
                  <TableHead className="arabic-text">المحكمة</TableHead>
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
                    <TableCell className="arabic-text">{caseItem.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            <div className="flex justify-end mt-4">
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
                    <TableCell className="arabic-text">{client.totalDebt} د.ج</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            <div className="flex justify-end mt-4">
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
          
          <TabsContent value="financials">
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
                    <TableCell className="arabic-text">{transaction.type}</TableCell>
                    <TableCell className="arabic-text">{transaction.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            <div className="flex justify-end mt-4">
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
