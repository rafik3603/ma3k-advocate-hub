
import React, { useState } from 'react';
import Navbar from '../components/navbar';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Search, Plus, Phone, FileText, Mail, MapPin, AlertCircle, FileCheck, FileX, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { AddClientForm } from "../components/add-client-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Clients = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  
  // Mock data for clients
  const clients = [
    { 
      id: 1, 
      name: "أحمد محمد علي", 
      phone: "0123456789", 
      email: "ahmed@example.com",
      address: "الجزائر العاصمة، شارع ديدوش مراد رقم 45",
      activeCases: 2,
      totalPaid: 15000,
      totalDebt: 5000,
      casesWon: 1,
      casesLost: 0,
      casesPending: 2,
      lastContact: "2023-04-25",
      clientSince: "2022-10-15",
      type: "فرد",
      profession: "مهندس"
    },
    { 
      id: 2, 
      name: "فاطمة سعيد عمر", 
      phone: "0198765432", 
      email: "fatima@example.com",
      address: "وهران، حي السلام عمارة 12",
      activeCases: 1,
      totalPaid: 8000,
      totalDebt: 0,
      casesWon: 2,
      casesLost: 1,
      casesPending: 1,
      lastContact: "2023-05-02",
      clientSince: "2021-06-20",
      type: "فرد",
      profession: "طبيبة"
    },
    { 
      id: 3, 
      name: "محمود خالد رياض", 
      phone: "0123789456", 
      email: "mahmoud@example.com",
      address: "قسنطينة، شارع الاستقلال رقم 30",
      activeCases: 0,
      totalPaid: 20000,
      totalDebt: 0,
      casesWon: 3,
      casesLost: 0,
      casesPending: 0,
      lastContact: "2023-03-10",
      clientSince: "2020-12-05",
      type: "شركة",
      profession: "مدير شركة"
    },
    { 
      id: 4, 
      name: "شركة النور للتجارة", 
      phone: "0770123456", 
      email: "contact@alnoor.com",
      address: "العاصمة، المنطقة الصناعية",
      activeCases: 3,
      totalPaid: 45000,
      totalDebt: 15000,
      casesWon: 2,
      casesLost: 1,
      casesPending: 3,
      lastContact: "2023-05-01",
      clientSince: "2019-08-15",
      type: "شركة",
      profession: "شركة تجارية"
    },
    { 
      id: 5, 
      name: "سارة أحمد حسين", 
      phone: "0661234567", 
      email: "sara@example.com",
      address: "عنابة، حي الرياض رقم 8",
      activeCases: 2,
      totalPaid: 12000,
      totalDebt: 3000,
      casesWon: 0,
      casesLost: 0,
      casesPending: 2,
      lastContact: "2023-04-28",
      clientSince: "2023-01-10",
      type: "فرد",
      profession: "أستاذة جامعية"
    },
  ];

  // Calculate statistics
  const totalClients = clients.length;
  const activeClients = clients.filter(c => c.activeCases > 0).length;
  const individualClients = clients.filter(c => c.type === "فرد").length;
  const companyClients = clients.filter(c => c.type === "شركة").length;
  const totalDebt = clients.reduce((sum, c) => sum + c.totalDebt, 0);
  const totalPaid = clients.reduce((sum, c) => sum + c.totalPaid, 0);

  // Filter clients based on search query and active tab
  const filteredClients = clients.filter(client => {
    const matchesSearch = 
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      client.phone.includes(searchQuery) || 
      client.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "active") return matchesSearch && client.activeCases > 0;
    if (activeTab === "individual") return matchesSearch && client.type === "فرد";
    if (activeTab === "company") return matchesSearch && client.type === "شركة";
    
    return matchesSearch;
  });

  const handleAddClient = () => {
    setShowAddForm(true);
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
          <h1 className="text-xl font-bold mr-2 arabic-text">الموكلين</h1>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          <Card>
            <CardHeader className="py-2 px-4">
              <CardTitle className="text-sm arabic-text">إجمالي الموكلين</CardTitle>
            </CardHeader>
            <CardContent className="py-2 px-4">
              <p className="text-2xl font-bold">{totalClients}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="py-2 px-4">
              <CardTitle className="text-sm arabic-text">الموكلين النشطين</CardTitle>
            </CardHeader>
            <CardContent className="py-2 px-4">
              <p className="text-2xl font-bold text-green-600">{activeClients}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="py-2 px-4">
              <CardTitle className="text-sm arabic-text">إجمالي المستحقات</CardTitle>
            </CardHeader>
            <CardContent className="py-2 px-4">
              <p className="text-2xl font-bold text-amber-600">{totalDebt} د.ج</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="py-2 px-4">
              <CardTitle className="text-sm arabic-text">إجمالي المدفوعات</CardTitle>
            </CardHeader>
            <CardContent className="py-2 px-4">
              <p className="text-2xl font-bold text-blue-600">{totalPaid} د.ج</p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
          <TabsList className="w-full grid grid-cols-4">
            <TabsTrigger value="all" className="arabic-text">الكل</TabsTrigger>
            <TabsTrigger value="active" className="arabic-text">النشطين</TabsTrigger>
            <TabsTrigger value="individual" className="arabic-text">أفراد</TabsTrigger>
            <TabsTrigger value="company" className="arabic-text">شركات</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="relative mb-4">
          <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="بحث عن موكل"
            className="pl-10 pr-10 arabic-text text-right"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="space-y-4 mb-6">
          {filteredClients.length > 0 ? (
            filteredClients.map(client => (
              <div key={client.id} className="bg-lawyer-light p-4 rounded-md border border-lawyer-primary">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-medium text-lg arabic-text">{client.name}</h3>
                      {client.type === "شركة" && (
                        <Badge className="mr-2 bg-purple-500">شركة</Badge>
                      )}
                    </div>
                    <div className="text-sm text-gray-600 arabic-text mt-1">{client.profession}</div>
                  </div>
                  <div className="text-sm text-gray-500 arabic-text">
                    عميل منذ: {client.clientSince}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-1 gap-x-4 mt-3">
                  <div className="flex items-center text-sm">
                    <Phone className="h-4 w-4 ml-2 text-lawyer-secondary" />
                    <span className="arabic-text">{client.phone}</span>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <Mail className="h-4 w-4 ml-2 text-lawyer-secondary" />
                    <span className="arabic-text">{client.email}</span>
                  </div>
                  
                  <div className="flex items-center text-sm md:col-span-2">
                    <MapPin className="h-4 w-4 ml-2 text-lawyer-secondary flex-shrink-0" />
                    <span className="arabic-text">{client.address}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 mt-3 border-t border-gray-200 pt-3">
                  <div className="text-center">
                    <div className="text-xs text-gray-500 arabic-text">قضايا نشطة</div>
                    <div className="font-medium arabic-text">{client.activeCases}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-500 arabic-text">قضايا مكسوبة</div>
                    <div className="font-medium arabic-text">{client.casesWon}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-500 arabic-text">المستحقات</div>
                    <div className={`font-medium arabic-text ${client.totalDebt > 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {client.totalDebt} د.ج
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-3">
                  <div className="flex items-center">
                    <User className="h-4 w-4 ml-1 text-lawyer-secondary" />
                    <span className="text-sm arabic-text">
                      آخر اتصال: {client.lastContact}
                    </span>
                  </div>
                  
                  <div>
                    <Button size="sm" variant="outline" className="arabic-text ml-2">
                      <FileText className="ml-1 h-4 w-4" />
                      عرض القضايا
                    </Button>
                    <Button size="sm" variant="default" className="arabic-text bg-lawyer-primary hover:bg-lawyer-secondary">
                      تفاصيل الموكل
                    </Button>
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

        <Button 
          className="w-full bg-lawyer-primary hover:bg-lawyer-secondary arabic-text"
          onClick={handleAddClient}
        >
          <Plus className="ml-2 h-4 w-4" />
          إضافة موكل جديد
        </Button>
      </div>
      
      <AddClientForm 
        isOpen={showAddForm} 
        onClose={() => setShowAddForm(false)} 
      />
    </div>
  );
};

export default Clients;
