
import React, { useState } from 'react';
import Navbar from '../components/navbar';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Search, Plus, DollarSign, TrendingUp, TrendingDown, Calendar, AlertCircle, Download, PieChart, User, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { StatsCard } from '../components/stats-card';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const Financial = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState("all");
  
  // Mock data for financial transactions
  const transactions = [
    { 
      id: 1, 
      client: "أحمد محمد علي", 
      amount: 5000, 
      type: "دفع",
      date: "2023-05-01",
      caseNumber: "2023/01",
      paymentMethod: "تحويل بنكي",
      description: "دفعة أولى - قضية نزاع عقاري",
      category: "أتعاب محاماة"
    },
    { 
      id: 2, 
      client: "فاطمة سعيد عمر", 
      amount: 3000, 
      type: "دفع",
      date: "2023-05-05",
      caseNumber: "2023/02",
      paymentMethod: "نقدي",
      description: "دفعة كاملة - استشارة قانونية",
      category: "استشارة"
    },
    { 
      id: 3, 
      client: "محمود خالد رياض", 
      amount: 7000, 
      type: "دين",
      date: "2023-05-10",
      caseNumber: "2023/03",
      paymentMethod: "بطاقة ائتمان",
      description: "دفعة جزئية - قضية تجارية",
      category: "أتعاب محاماة"
    },
    { 
      id: 4, 
      client: "شركة النور للتجارة", 
      amount: 15000, 
      type: "دفع",
      date: "2023-05-12",
      caseNumber: "2023/04",
      paymentMethod: "شيك",
      description: "دفعة مقدمة - قضية نزاع تجاري",
      category: "أتعاب محاماة"
    },
    { 
      id: 5, 
      client: "سارة أحمد حسين", 
      amount: 2500, 
      type: "مصروف",
      date: "2023-05-15",
      caseNumber: "2023/05",
      paymentMethod: "نقدي",
      description: "رسوم محكمة - تقديم دعوى",
      category: "رسوم محكمة"
    },
    { 
      id: 6, 
      client: "كريم محمد", 
      amount: 1200, 
      type: "مصروف",
      date: "2023-05-18",
      caseNumber: "2023/06",
      paymentMethod: "نقدي",
      description: "مصاريف توثيق وتصديق مستندات",
      category: "مصاريف توثيق"
    },
  ];

  // Calculate financial stats
  const totalReceived = transactions
    .filter(t => t.type === "دفع")
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalPending = transactions
    .filter(t => t.type === "دين")
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpenses = transactions
    .filter(t => t.type === "مصروف")
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalTransactions = transactions.length;
  
  const netIncome = totalReceived - totalExpenses;

  // Filter transactions based on search query and tab
  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = 
      transaction.client.includes(searchQuery) || 
      transaction.caseNumber.includes(searchQuery) ||
      transaction.description.includes(searchQuery) ||
      transaction.category.includes(searchQuery);
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "payments") return matchesSearch && transaction.type === "دفع";
    if (activeTab === "debts") return matchesSearch && transaction.type === "دين";
    if (activeTab === "expenses") return matchesSearch && transaction.type === "مصروف";
    
    return matchesSearch;
  });

  const getTransactionIcon = (type: string) => {
    if (type === "دفع") {
      return <TrendingUp className="h-4 w-4 ml-1 text-green-500" />;
    } else if (type === "دين") {
      return <TrendingDown className="h-4 w-4 ml-1 text-amber-500" />;
    } else {
      return <TrendingDown className="h-4 w-4 ml-1 text-red-500" />;
    }
  };

  const getTransactionColor = (type: string) => {
    if (type === "دفع") {
      return "text-green-600";
    } else if (type === "دين") {
      return "text-amber-600";
    } else {
      return "text-red-600";
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
          <h1 className="text-xl font-bold mr-2 arabic-text">المتابعة المالية</h1>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          <Card className="col-span-2 md:col-span-1">
            <CardHeader className="py-2 px-4">
              <CardTitle className="text-sm arabic-text">المبلغ المستلم</CardTitle>
            </CardHeader>
            <CardContent className="py-2 px-4">
              <p className="text-xl md:text-2xl font-bold text-green-600">{totalReceived} د.ج</p>
            </CardContent>
          </Card>
          
          <Card className="col-span-2 md:col-span-1">
            <CardHeader className="py-2 px-4">
              <CardTitle className="text-sm arabic-text">المبلغ المتبقي</CardTitle>
            </CardHeader>
            <CardContent className="py-2 px-4">
              <p className="text-xl md:text-2xl font-bold text-amber-600">{totalPending} د.ج</p>
            </CardContent>
          </Card>
          
          <Card className="col-span-2 md:col-span-1">
            <CardHeader className="py-2 px-4">
              <CardTitle className="text-sm arabic-text">المصروفات</CardTitle>
            </CardHeader>
            <CardContent className="py-2 px-4">
              <p className="text-xl md:text-2xl font-bold text-red-600">{totalExpenses} د.ج</p>
            </CardContent>
          </Card>
          
          <Card className="col-span-1 md:col-span-1">
            <CardHeader className="py-2 px-4">
              <CardTitle className="text-sm arabic-text">المعاملات</CardTitle>
            </CardHeader>
            <CardContent className="py-2 px-4">
              <p className="text-xl md:text-2xl font-bold">{totalTransactions}</p>
            </CardContent>
          </Card>
          
          <Card className="col-span-1 md:col-span-1">
            <CardHeader className="py-2 px-4">
              <CardTitle className="text-sm arabic-text">صافي الدخل</CardTitle>
            </CardHeader>
            <CardContent className="py-2 px-4">
              <p className={`text-xl md:text-2xl font-bold ${netIncome >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {netIncome} د.ج
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
          <TabsList className="w-full grid grid-cols-4">
            <TabsTrigger value="all" className="arabic-text">الكل</TabsTrigger>
            <TabsTrigger value="payments" className="arabic-text">المدفوعات</TabsTrigger>
            <TabsTrigger value="debts" className="arabic-text">الديون</TabsTrigger>
            <TabsTrigger value="expenses" className="arabic-text">المصروفات</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="relative mb-4">
          <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="بحث عن معاملة"
            className="pl-10 pr-10 arabic-text text-right"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="space-y-4 mb-6">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map(transaction => (
              <div key={transaction.id} className="bg-lawyer-light p-4 rounded-md border border-lawyer-primary">
                <div className="flex justify-between mb-2">
                  <div>
                    <span className="font-medium arabic-text">{transaction.client}</span>
                    <div className="text-sm arabic-text mt-1">{transaction.description}</div>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 ml-1 text-gray-500" />
                    <span className="text-gray-600 arabic-text">{transaction.date}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <div className="arabic-text mb-1">رقم القضية: {transaction.caseNumber}</div>
                    <div className="flex items-center text-sm text-gray-600 arabic-text">
                      <Badge variant="outline" className="ml-2">{transaction.category}</Badge>
                      {transaction.paymentMethod}
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end">
                    <div className="flex items-center">
                      {getTransactionIcon(transaction.type)}
                      <span className={`text-sm font-medium arabic-text ${getTransactionColor(transaction.type)}`}>
                        {transaction.type}
                      </span>
                    </div>
                    
                    <div className="flex items-center mt-1">
                      <DollarSign className="h-4 w-4 ml-1 text-lawyer-secondary" />
                      <span className={`font-bold arabic-text ${getTransactionColor(transaction.type)}`}>
                        {transaction.amount} د.ج
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end mt-3">
                  <Button size="sm" variant="outline" className="arabic-text">تعديل</Button>
                  <Button size="sm" variant="default" className="arabic-text mr-2 bg-lawyer-primary hover:bg-lawyer-secondary">إيصال</Button>
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

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <Button className="bg-lawyer-primary hover:bg-lawyer-secondary arabic-text">
            <Plus className="ml-2 h-4 w-4" />
            إضافة معاملة جديدة
          </Button>
          <Button variant="outline" className="arabic-text">
            <PieChart className="ml-2 h-4 w-4" />
            تقارير مالية
          </Button>
          <Button variant="outline" className="arabic-text">
            <Download className="ml-2 h-4 w-4" />
            تصدير البيانات
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Financial;
