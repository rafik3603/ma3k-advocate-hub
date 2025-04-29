
import React, { useState } from 'react';
import Navbar from '../components/navbar';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Search, Plus, Phone, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";

const Clients = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data for clients
  const clients = [
    { 
      id: 1, 
      name: "أحمد محمد علي", 
      phone: "0123456789", 
      email: "ahmed@example.com",
      address: "الجزائر العاصمة",
      activeCases: 2
    },
    { 
      id: 2, 
      name: "فاطمة سعيد عمر", 
      phone: "0198765432", 
      email: "fatima@example.com",
      address: "وهران",
      activeCases: 1
    },
    { 
      id: 3, 
      name: "محمود خالد رياض", 
      phone: "0123789456", 
      email: "mahmoud@example.com",
      address: "قسنطينة",
      activeCases: 0
    },
  ];

  const filteredClients = clients.filter(client => 
    client.name.includes(searchQuery) || 
    client.phone.includes(searchQuery)
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
          <h1 className="text-xl font-bold mr-2 arabic-text">الموكلين</h1>
        </div>

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
          {filteredClients.map(client => (
            <div key={client.id} className="bg-lawyer-light p-4 rounded-md border border-lawyer-primary">
              <h3 className="font-medium text-lg arabic-text mb-2">{client.name}</h3>
              
              <div className="flex items-center mb-1 text-sm">
                <Phone className="h-4 w-4 ml-2 text-lawyer-secondary" />
                <span className="arabic-text">{client.phone}</span>
              </div>
              
              <div className="text-sm text-gray-600 arabic-text mb-1">
                البريد الإلكتروني: {client.email}
              </div>
              
              <div className="text-sm text-gray-600 arabic-text">
                العنوان: {client.address}
              </div>
              
              <div className="flex justify-between items-center mt-3">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 ml-1 text-lawyer-secondary" />
                  <span className="text-sm font-medium arabic-text">
                    {client.activeCases} قضايا نشطة
                  </span>
                </div>
                
                <div>
                  <Button size="sm" variant="outline" className="arabic-text ml-2">عرض القضايا</Button>
                  <Button size="sm" variant="default" className="arabic-text bg-lawyer-primary hover:bg-lawyer-secondary">
                    تفاصيل الموكل
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button className="w-full bg-lawyer-primary hover:bg-lawyer-secondary arabic-text">
          <Plus className="ml-2 h-4 w-4" />
          إضافة موكل جديد
        </Button>
      </div>
    </div>
  );
};

export default Clients;
