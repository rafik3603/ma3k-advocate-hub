
import React, { useState } from 'react';
import Navbar from '../components/navbar';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Search, Plus, DollarSign, TrendingUp, TrendingDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { StatsCard } from '../components/stats-card';

const Financial = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data for financial transactions
  const transactions = [
    { 
      id: 1, 
      client: "أحمد محمد علي", 
      amount: 5000, 
      type: "دفع",
      date: "2023-05-01",
      caseNumber: "2023/01"
    },
    { 
      id: 2, 
      client: "فاطمة سعيد عمر", 
      amount: 3000, 
      type: "دفع",
      date: "2023-05-05",
      caseNumber: "2023/02"
    },
    { 
      id: 3, 
      client: "محمود خالد رياض", 
      amount: 7000, 
      type: "دين",
      date: "2023-05-10",
      caseNumber: "2023/03"
    },
  ];

  // Calculate financial stats
  const totalReceived = transactions
    .filter(t => t.type === "دفع")
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalPending = transactions
    .filter(t => t.type === "دين")
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalTransactions = transactions.length;

  const filteredTransactions = transactions.filter(transaction => 
    transaction.client.includes(searchQuery) || 
    transaction.caseNumber.includes(searchQuery)
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
          <h1 className="text-xl font-bold mr-2 arabic-text">المتابعة المالية</h1>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          <StatsCard title="المبلغ المستلم" value={totalReceived} />
          <StatsCard title="المبلغ المتبقي" value={totalPending} />
          <StatsCard title="عدد المعاملات" value={totalTransactions} />
        </div>

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
                  <span className="font-medium arabic-text">{transaction.client}</span>
                  <span className="text-gray-600 arabic-text">{transaction.date}</span>
                </div>
                
                <div className="arabic-text mb-1">رقم القضية: {transaction.caseNumber}</div>
                
                <div className="flex justify-between items-center mt-3">
                  <div className="flex items-center">
                    {transaction.type === "دفع" ? (
                      <TrendingUp className="h-4 w-4 ml-1 text-green-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 ml-1 text-red-500" />
                    )}
                    <span className={`text-sm font-medium arabic-text ${transaction.type === "دفع" ? "text-green-600" : "text-red-600"}`}>
                      {transaction.type}
                    </span>
                  </div>
                  
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 ml-1 text-lawyer-secondary" />
                    <span className="font-bold arabic-text">{transaction.amount} د.ج</span>
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
          إضافة معاملة جديدة
        </Button>
      </div>
    </div>
  );
};

export default Financial;
