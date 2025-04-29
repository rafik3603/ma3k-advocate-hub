
import React, { useState } from 'react';
import Navbar from '../components/navbar';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Plus, Bell, Clock, MapPin, User, Phone, AlertCircle, FileText, Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ar } from 'date-fns/locale';
import { AddAppointmentForm } from "../components/add-appointment-form";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Appointments = () => {
  const [currentDate] = useState(new Date());
  const [showAddForm, setShowAddForm] = useState(false);
  const [activeTab, setActiveTab] = useState("day");
  
  // Mock data for appointments
  const appointments = [
    { 
      id: 1, 
      title: "اجتماع مع العميل محمد", 
      client: "محمد أحمد", 
      date: new Date(2023, 4, 15, 10, 0), 
      duration: 60,
      location: "مكتب المحامي",
      phone: "0556789012",
      notes: "مناقشة تفاصيل القضية الجديدة",
      reminder: true,
      type: "اجتماع"
    },
    { 
      id: 2, 
      title: "جلسة محكمة", 
      client: "خالد عمر", 
      date: new Date(2023, 4, 15, 13, 30), 
      duration: 90,
      location: "المحكمة الابتدائية",
      phone: "0661234567",
      notes: "قضية رقم 2023/04 - تحضير الدفوعات",
      reminder: true,
      type: "جلسة"
    },
    { 
      id: 3, 
      title: "استشارة قانونية", 
      client: "مريم سليم", 
      date: new Date(2023, 4, 16, 11, 0), 
      duration: 45,
      location: "مكتب المحامي",
      phone: "0770123456",
      notes: "استشارة في قضية عقارية",
      reminder: false,
      type: "استشارة"
    },
    { 
      id: 4, 
      title: "زيارة موكل", 
      client: "أحمد حسين", 
      date: new Date(2023, 4, 17, 14, 0), 
      duration: 120,
      location: "المؤسسة العقابية",
      phone: "0556781234",
      notes: "تحضير للاستئناف",
      reminder: true,
      type: "زيارة"
    },
    { 
      id: 5, 
      title: "تحضير مذكرة", 
      client: "سميرة علي", 
      date: new Date(2023, 4, 18, 9, 0), 
      duration: 180,
      location: "مكتب المحامي",
      phone: "0661239876",
      notes: "مذكرة دفاع في القضية رقم 2023/07",
      reminder: false,
      type: "عمل مكتبي"
    },
  ];

  const formatAppointmentTime = (date: Date, duration: number) => {
    const options: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' };
    const startTime = date.toLocaleTimeString('ar-DZ', options);
    const endDate = new Date(date.getTime() + duration * 60000);
    const endTime = endDate.toLocaleTimeString('ar-DZ', options);
    return `${startTime} - ${endTime}`;
  };

  // Filter appointments based on active tab
  const todayAppointments = appointments.filter(
    appointment => appointment.date.toDateString() === currentDate.toDateString()
  );

  const weekAppointments = appointments.filter(appointment => {
    const appointmentDate = appointment.date;
    const weekStart = new Date(currentDate);
    weekStart.setDate(currentDate.getDate() - currentDate.getDay());
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    
    return appointmentDate >= weekStart && appointmentDate <= weekEnd;
  });

  const monthAppointments = appointments.filter(appointment => {
    const appointmentDate = appointment.date;
    return appointmentDate.getMonth() === currentDate.getMonth() && 
           appointmentDate.getFullYear() === currentDate.getFullYear();
  });

  const getAppointmentTypeBadge = (type: string) => {
    switch (type) {
      case "جلسة":
        return <Badge className="bg-red-500 hover:bg-red-600">{type}</Badge>;
      case "اجتماع":
        return <Badge className="bg-blue-500 hover:bg-blue-600">{type}</Badge>;
      case "استشارة":
        return <Badge className="bg-green-500 hover:bg-green-600">{type}</Badge>;
      case "زيارة":
        return <Badge className="bg-purple-500 hover:bg-purple-600">{type}</Badge>;
      default:
        return <Badge className="bg-gray-500 hover:bg-gray-600">{type}</Badge>;
    }
  };

  const handleAddAppointment = () => {
    setShowAddForm(true);
  };

  // Calculate statistics
  const todayCount = todayAppointments.length;
  const weekCount = weekAppointments.length;
  const monthCount = monthAppointments.length;
  const courtSessions = appointments.filter(a => a.type === "جلسة").length;

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
          <h1 className="text-xl font-bold mr-2 arabic-text">المواعيد</h1>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          <Card>
            <CardHeader className="py-2 px-4">
              <CardTitle className="text-sm arabic-text">مواعيد اليوم</CardTitle>
            </CardHeader>
            <CardContent className="py-2 px-4">
              <p className="text-2xl font-bold">{todayCount}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="py-2 px-4">
              <CardTitle className="text-sm arabic-text">مواعيد الاسبوع</CardTitle>
            </CardHeader>
            <CardContent className="py-2 px-4">
              <p className="text-2xl font-bold">{weekCount}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="py-2 px-4">
              <CardTitle className="text-sm arabic-text">مواعيد الشهر</CardTitle>
            </CardHeader>
            <CardContent className="py-2 px-4">
              <p className="text-2xl font-bold">{monthCount}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="py-2 px-4">
              <CardTitle className="text-sm arabic-text">جلسات المحكمة</CardTitle>
            </CardHeader>
            <CardContent className="py-2 px-4">
              <p className="text-2xl font-bold">{courtSessions}</p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="day" className="arabic-text">اليوم</TabsTrigger>
            <TabsTrigger value="week" className="arabic-text">الأسبوع</TabsTrigger>
            <TabsTrigger value="month" className="arabic-text">الشهر</TabsTrigger>
          </TabsList>
          
          <TabsContent value="day">
            <div className="bg-lawyer-light rounded-md p-4 mb-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-bold text-lg arabic-text">اليوم</h2>
                <span className="text-sm text-gray-600 arabic-text">
                  {format(currentDate, "EEEE، dd MMMM yyyy", { locale: ar })}
                </span>
              </div>
              
              {todayAppointments.length > 0 ? (
                <div className="space-y-3">
                  {todayAppointments.map(appointment => (
                    <div key={appointment.id} className="bg-white p-3 rounded border border-lawyer-primary">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium arabic-text">{appointment.title}</h3>
                        {appointment.reminder && (
                          <Bell className="h-4 w-4 text-amber-500" />
                        )}
                      </div>
                      
                      <div className="flex justify-between mt-2 items-center">
                        <div className="flex flex-col">
                          <div className="flex items-center text-sm mb-1">
                            <User className="h-4 w-4 ml-1 text-lawyer-secondary" />
                            <span className="text-gray-600 arabic-text">العميل: {appointment.client}</span>
                          </div>
                          <div className="flex items-center text-sm mb-1">
                            <MapPin className="h-4 w-4 ml-1 text-lawyer-secondary" />
                            <span className="text-gray-600 arabic-text">{appointment.location}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Phone className="h-4 w-4 ml-1 text-lawyer-secondary" />
                            <span className="text-gray-600 arabic-text">{appointment.phone}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-end">
                          <div className="flex items-center mb-1">
                            <Clock className="h-4 w-4 ml-1 text-lawyer-secondary" />
                            <span className="arabic-text">{formatAppointmentTime(appointment.date, appointment.duration)}</span>
                          </div>
                          {getAppointmentTypeBadge(appointment.type)}
                        </div>
                      </div>
                      
                      {appointment.notes && (
                        <div className="text-sm text-gray-500 arabic-text mt-2 border-t pt-2">
                          {appointment.notes}
                        </div>
                      )}
                      
                      <div className="flex justify-end mt-2">
                        <Button size="sm" variant="outline" className="arabic-text">تعديل</Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500 arabic-text">
                  <CalendarIcon className="mx-auto h-8 w-8 mb-2 text-gray-400" />
                  لا توجد مواعيد لليوم
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="week">
            <div className="mb-4">
              <h2 className="font-bold text-lg mb-3 arabic-text">مواعيد الأسبوع</h2>
              
              {weekAppointments.length > 0 ? (
                <div className="space-y-3">
                  {weekAppointments.map(appointment => (
                    <div key={appointment.id} className="bg-lawyer-light p-3 rounded border border-lawyer-primary">
                      <div className="flex justify-between">
                        <h3 className="font-medium arabic-text">{appointment.title}</h3>
                        <span className="text-sm text-gray-600 arabic-text">
                          {format(appointment.date, "EEEE، dd MMMM", { locale: ar })}
                        </span>
                      </div>
                      <div className="flex justify-between mt-2 text-sm">
                        <span className="text-gray-600 arabic-text">العميل: {appointment.client}</span>
                        <span className="arabic-text">{formatAppointmentTime(appointment.date, appointment.duration)}</span>
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-sm text-gray-500 arabic-text">{appointment.location}</span>
                        {getAppointmentTypeBadge(appointment.type)}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500 arabic-text">
                  <AlertCircle className="mx-auto h-8 w-8 mb-2 text-gray-400" />
                  لا توجد مواعيد للأسبوع الحالي
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="month">
            <div className="mb-4">
              <h2 className="font-bold text-lg mb-3 arabic-text">
                مواعيد شهر {format(currentDate, "MMMM yyyy", { locale: ar })}
              </h2>
              
              {monthAppointments.length > 0 ? (
                <div className="space-y-3">
                  {monthAppointments.map(appointment => (
                    <div key={appointment.id} className="bg-lawyer-light p-3 rounded border border-lawyer-primary">
                      <div className="flex justify-between">
                        <h3 className="font-medium arabic-text">{appointment.title}</h3>
                        <span className="text-sm text-gray-600 arabic-text">
                          {format(appointment.date, "EEEE، dd MMMM", { locale: ar })}
                        </span>
                      </div>
                      <div className="flex justify-between mt-2 text-sm">
                        <span className="text-gray-600 arabic-text">العميل: {appointment.client}</span>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 ml-1 text-lawyer-secondary" />
                          <span className="arabic-text">{formatAppointmentTime(appointment.date, appointment.duration)}</span>
                        </div>
                      </div>
                      <div className="flex justify-between mt-1">
                        <div className="flex items-center text-sm">
                          <MapPin className="h-4 w-4 ml-1 text-lawyer-secondary" />
                          <span className="text-gray-500 arabic-text">{appointment.location}</span>
                        </div>
                        {getAppointmentTypeBadge(appointment.type)}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500 arabic-text">
                  <AlertCircle className="mx-auto h-8 w-8 mb-2 text-gray-400" />
                  لا توجد مواعيد للشهر الحالي
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex gap-3">
          <Button 
            className="flex-1 bg-lawyer-primary hover:bg-lawyer-secondary arabic-text"
            onClick={handleAddAppointment}
          >
            <Plus className="ml-2 h-4 w-4" />
            إضافة موعد جديد
          </Button>
          <Button 
            className="flex-1 variant-outline arabic-text"
          >
            <FileText className="ml-2 h-4 w-4" />
            طباعة جدول المواعيد
          </Button>
        </div>
      </div>
      
      <AddAppointmentForm 
        isOpen={showAddForm} 
        onClose={() => setShowAddForm(false)} 
      />
    </div>
  );
};

export default Appointments;
