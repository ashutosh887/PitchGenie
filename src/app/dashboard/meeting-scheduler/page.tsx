"use client";

import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const mockTimeSlots = [
  "10:00 AM - 10:30 AM",
  "11:00 AM - 11:30 AM",
  "2:00 PM - 2:30 PM",
  "4:00 PM - 4:30 PM",
];

const MeetingScheduler = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTimeSlots(selectedDate);
  }, [selectedDate]);

  const fetchTimeSlots = async (date) => {
    setLoading(true);
    try {
      // Replace with actual API call
      const response = await fetch(
        `/api/get-available-slots?date=${date.toISOString()}`
      );
      const data = await response.json();
      setTimeSlots(data.slots || mockTimeSlots);
    } catch (error) {
      console.log(error);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setTimeSlots(mockTimeSlots);
    }
    setLoading(false);
  };

  return (
    <div className="p-6text-white min-h-screen">
      <div className="flex gap-6">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="bg-gray-800 text-white rounded-lg p-4"
        />
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Available Time Slots</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Loader2 className="animate-spin mx-auto" />
            ) : (
              timeSlots.map((slot, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-2 border-b border-gray-700"
                >
                  <span>{slot}</span>
                  <Button>Schedule</Button>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MeetingScheduler;
