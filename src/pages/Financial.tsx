
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const Financial = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState("all");
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showReceiptDialog, setShowReceiptDialog] = useState(false);
  
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
      category: "أتعاب محاماة",
      receiptNumber: "REC-2023-001",
      bankAccount: "بنك الجزائر - 12345678901",
      notes: "تم استلام المبلغ بالكامل"
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
      category: "استشارة",
      receiptNumber: "REC-2023-002",
      bankAccount: "غير متاح",
      notes: "تم تقديم الاستشارة في مكتب المحامي"
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
      category: "أتعاب محاماة",
      receiptNumber: "REC-2023-003",
      bankAccount: "غير متاح",
      notes: "متبقي 5000 د.ج للدفع"
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
      category: "أتعاب محاماة",
      receiptNumber: "REC-2023-004",
      bankAccount: "غير متاح",
      notes: "شيك رقم 12345 - بنك التنمية المحلية"
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
      category: "رسوم محكمة",
      receiptNumber: "EXP-2023-001",
      bankAccount: "غير متاح",
      notes: "إيصال المحكمة رقم 87654"
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
      category: "مصاريف توثيق",
      receiptNumber: "EXP-2023-002",
      bankAccount: "غير متاح",
      notes: "إيصالات التوثيق والتصديق مرفقة"
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

  const handleEditTransaction = (transaction) => {
    setSelectedTransaction(transaction);
    setShowEditDialog(true);
  };

  const handleViewReceipt = (transaction) => {
    setSelectedTransaction(transaction);
    setShowReceiptDialog(true);
  };

  const handleSaveTransaction = (updatedData) => {
    // Mock implementation - in a real app this would save to a database
    console.log("Saving updated transaction:", updatedData);
    setShowEditDialog(false);
    // Show toast notification
    alert("تم تحديث المعاملة المالية بنجاح");
  };

  const handlePrintReceipt = () => {
    console.log("Printing receipt for:", selectedTransaction);
    // In a real app this would trigger print functionality
    alert("جاري طباعة الإيصال...");
  };

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
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="arabic-text ml-2"
                    onClick={() => handleEditTransaction(transaction)}
                  >
                    تعديل
                  </Button>
                  <Button 
                    size="sm" 
                    variant="default" 
                    className="arabic-text bg-lawyer-primary hover:bg-lawyer-secondary"
                    onClick={() => handleViewReceipt(transaction)}
                  >
                    إيصال
                  </Button>
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

      {/* Edit Transaction Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold arabic-text">تعديل المعاملة المالية</DialogTitle>
            <DialogDescription className="arabic-text">
              تعديل بيانات المعاملة المالية رقم {selectedTransaction?.id}
            </DialogDescription>
          </DialogHeader>
          
          {selectedTransaction && (
            <div className="py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="client" className="arabic-text">العميل</Label>
                    <Input 
                      id="client" 
                      className="arabic-text text-right" 
                      defaultValue={selectedTransaction.client} 
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="caseNumber" className="arabic-text">رقم القضية</Label>
                    <Input 
                      id="caseNumber" 
                      className="arabic-text text-right" 
                      defaultValue={selectedTransaction.caseNumber} 
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="amount" className="arabic-text">المبلغ (د.ج)</Label>
                    <Input 
                      id="amount" 
                      type="number" 
                      className="arabic-text text-right" 
                      defaultValue={selectedTransaction.amount} 
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="date" className="arabic-text">التاريخ</Label>
                    <Input 
                      id="date" 
                      type="date" 
                      className="arabic-text text-right" 
                      defaultValue={selectedTransaction.date} 
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="description" className="arabic-text">الوصف</Label>
                    <Input 
                      id="description" 
                      className="arabic-text text-right" 
                      defaultValue={selectedTransaction.description} 
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="category" className="arabic-text">الفئة</Label>
                    <Select defaultValue={selectedTransaction.category}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="اختر الفئة" className="arabic-text" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="أتعاب محاماة" className="arabic-text">أتعاب محاماة</SelectItem>
                        <SelectItem value="استشارة" className="arabic-text">استشارة</SelectItem>
                        <SelectItem value="رسوم محكمة" className="arabic-text">رسوم محكمة</SelectItem>
                        <SelectItem value="مصاريف توثيق" className="arabic-text">مصاريف توثيق</SelectItem>
                        <SelectItem value="أخرى" className="arabic-text">أخرى</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="paymentMethod" className="arabic-text">طريقة الدفع</Label>
                    <Select defaultValue={selectedTransaction.paymentMethod}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="اختر طريقة الدفع" className="arabic-text" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="نقدي" className="arabic-text">نقدي</SelectItem>
                        <SelectItem value="شيك" className="arabic-text">شيك</SelectItem>
                        <SelectItem value="تحويل بنكي" className="arabic-text">تحويل بنكي</SelectItem>
                        <SelectItem value="بطاقة ائتمان" className="arabic-text">بطاقة ائتمان</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label className="arabic-text mb-2 block">نوع المعاملة</Label>
                    <RadioGroup defaultValue={selectedTransaction.type} className="flex space-x-4">
                      <div className="flex items-center space-x-2 ml-4">
                        <RadioGroupItem value="دفع" id="دفع" />
                        <Label htmlFor="دفع" className="arabic-text">دفع</Label>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <RadioGroupItem value="دين" id="دين" />
                        <Label htmlFor="دين" className="arabic-text">دين</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="مصروف" id="مصروف" />
                        <Label htmlFor="مصروف" className="arabic-text">مصروف</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <Label htmlFor="notes" className="arabic-text">ملاحظات</Label>
                <Input 
                  id="notes" 
                  className="arabic-text text-right" 
                  defaultValue={selectedTransaction.notes || ""} 
                />
              </div>
              
              <DialogFooter className="mt-6">
                <Button
                  variant="outline"
                  className="arabic-text ml-2"
                  onClick={() => setShowEditDialog(false)}
                >
                  إلغاء
                </Button>
                <Button 
                  className="arabic-text bg-lawyer-primary hover:bg-lawyer-secondary" 
                  onClick={() => handleSaveTransaction({...selectedTransaction})}
                >
                  حفظ التغييرات
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Receipt Dialog */}
      <Dialog open={showReceiptDialog} onOpenChange={setShowReceiptDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold arabic-text">إيصال المعاملة المالية</DialogTitle>
          </DialogHeader>
          
          {selectedTransaction && (
            <div className="py-4">
              <div className="border-2 border-gray-300 p-6 rounded-md bg-white">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-bold arabic-text">مكتب المحامي</h2>
                  <p className="arabic-text">العنوان: شارع الاستقلال، الجزائر العاصمة</p>
                  <p className="arabic-text">هاتف: 021-XX-XX-XX</p>
                </div>
                
                <div className="border-b-2 border-gray-300 pb-2 mb-4">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-bold arabic-text">رقم الإيصال: {selectedTransaction.receiptNumber}</p>
                    </div>
                    <div>
                      <p className="arabic-text">التاريخ: {selectedTransaction.date}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600 arabic-text">استلمنا من:</p>
                      <p className="font-bold arabic-text">{selectedTransaction.client}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 arabic-text">رقم القضية:</p>
                      <p className="font-bold arabic-text">{selectedTransaction.caseNumber}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600 arabic-text">طريقة الدفع:</p>
                      <p className="arabic-text">{selectedTransaction.paymentMethod}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 arabic-text">الفئة:</p>
                      <p className="arabic-text">{selectedTransaction.category}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 arabic-text">الوصف:</p>
                    <p className="arabic-text">{selectedTransaction.description}</p>
                  </div>
                  
                  <div className="bg-gray-100 p-3 rounded-md">
                    <p className="text-sm text-gray-600 arabic-text">ملاحظات:</p>
                    <p className="arabic-text">{selectedTransaction.notes || "لا توجد ملاحظات"}</p>
                  </div>
                </div>
                
                <div className="border-t-2 border-gray-300 pt-4 flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600 arabic-text">نوع المعاملة:</p>
                    <p className={`font-bold arabic-text ${getTransactionColor(selectedTransaction.type)}`}>{selectedTransaction.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 arabic-text">المبلغ:</p>
                    <p className="text-xl font-bold arabic-text">{selectedTransaction.amount} د.ج</p>
                  </div>
                </div>
                
                <div className="border-t-2 border-gray-300 mt-6 pt-4 text-center">
                  <p className="text-sm text-gray-600 arabic-text">توقيع المستلم:</p>
                  <div className="border-b border-gray-400 w-40 mx-auto mt-6"></div>
                </div>
              </div>
              
              <DialogFooter className="mt-6">
                <Button variant="outline" className="arabic-text ml-2" onClick={() => setShowReceiptDialog(false)}>
                  إغلاق
                </Button>
                <Button 
                  className="arabic-text bg-lawyer-primary hover:bg-lawyer-secondary"
                  onClick={handlePrintReceipt}
                >
                  <Download className="ml-2 h-4 w-4" />
                  طباعة الإيصال
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Financial;
