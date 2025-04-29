
import React, { useState } from 'react';
import Navbar from '../components/navbar';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";
import { format } from "date-fns";
import { ar } from 'date-fns/locale';

const Appointments = () => {
  const [currentDate] = useState(new Date());
  
  // Mock data for appointments
  const appointments = [
    { 
      id: 1, 
      title: "اجتماع مع العميل محمد", 
      client: "محمد أحمد", 
      date: new Date(2023, 4, 15, 10, 0), 
      duration: 60,
      location: "مكتب المحامي"
    },
    { 
      id: 2, 
      title: "جلسة محكمة", 
      client: "خالد عمر", 
      date: new Date(2023, 4, 15, 13, 30), 
      duration: 90,
      location: "المحكمة الابتدائية"
    },
    { 
      id: 3, 
      title: "استشارة قانونية", 
      client: "مريم سليم", 
      date: new Date(2023, 4, 16, 11, 0), 
      duration: 45,
      location: "مكتب المحامي"
    },
  ];

  const formatAppointmentTime = (date: Date, duration: number) => {
    const options: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' };
    const startTime = date.toLocaleTimeString('ar-DZ', options);
    const endDate = new Date(date.getTime() + duration * 60000);
    const endTime = endDate.toLocaleTimeString('ar-DZ', options);
    return `${startTime} - ${endTime}`;
  };

  const todayAppointments = appointments.filter(
    appointment => appointment.date.toDateString() === currentDate.toDateString()
  );

  const upcomingAppointments = appointments.filter(
    appointment => appointment.date > currentDate
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
          <h1 className="text-xl font-bold mr-2 arabic-text">المواعيد</h1>
        </div>

        <div className="bg-lawyer-light rounded-md p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-lg arabic-text">اليوم</h2>
            <span className="text-sm text-gray-600 arabic-text">
              {format(currentDate, "EEEE, dd MMMM yyyy", { locale: ar })}
            </span>
          </div>
          
          {todayAppointments.length > 0 ? (
            <div className="space-y-3">
              {todayAppointments.map(appointment => (
                <div key={appointment.id} className="bg-white p-3 rounded border border-lawyer-primary">
                  <h3 className="font-medium arabic-text">{appointment.title}</h3>
                  <div className="flex justify-between mt-2 text-sm">
                    <span className="text-gray-600 arabic-text">العميل: {appointment.client}</span>
                    <span className="arabic-text">{formatAppointmentTime(appointment.date, appointment.duration)}</span>
                  </div>
                  <div className="text-sm text-gray-500 arabic-text mt-1">
                    {appointment.location}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-gray-500 arabic-text">
              لا توجد مواعيد لليوم
            </div>
          )}
        </div>

        <div className="mb-4">
          <h2 className="font-bold text-lg mb-3 arabic-text">المواعيد القادمة</h2>
          
          {upcomingAppointments.length > 0 ? (
            <div className="space-y-3">
              {upcomingAppointments.map(appointment => (
                <div key={appointment.id} className="bg-lawyer-light p-3 rounded border border-lawyer-primary">
                  <div className="flex justify-between">
                    <h3 className="font-medium arabic-text">{appointment.title}</h3>
                    <span className="text-sm text-gray-600 arabic-text">
                      {format(appointment.date, "EEEE, dd MMMM", { locale: ar })}
                    </span>
                  </div>
                  <div className="flex justify-between mt-2 text-sm">
                    <span className="text-gray-600 arabic-text">العميل: {appointment.client}</span>
                    <span className="arabic-text">{formatAppointmentTime(appointment.date, appointment.duration)}</span>
                  </div>
                  <div className="text-sm text-gray-500 arabic-text mt-1">
                    {appointment.location}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-gray-500 arabic-text">
              لا توجد مواعيد قادمة
            </div>
          )}
        </div>

        <Button className="w-full bg-lawyer-primary hover:bg-lawyer-secondary arabic-text">
          <Calendar className="ml-2 h-4 w-4" />
          إضافة موعد جديد
        </Button>
      </div>
    </div>
  );
};

export default Appointments;
