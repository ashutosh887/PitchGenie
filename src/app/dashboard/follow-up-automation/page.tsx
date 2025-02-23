"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarClock, Send, Clock } from "lucide-react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Calendar } from "@/components/ui/calendar";

const mockFollowUps = [
  {
    id: "1",
    date: "2025-02-25",
    message: "Follow up with John Doe regarding contract renewal.",
    status: "Pending",
  },
  {
    id: "2",
    date: "2025-02-26",
    message: "Send proposal to Jane Smith for partnership.",
    status: "Scheduled",
  },
  {
    id: "3",
    date: "2025-02-27",
    message: "Check in with Mike Ross on project status.",
    status: "In Progress",
  },
  {
    id: "4",
    date: "2025-02-28",
    message: "Schedule a call with Sarah Lee for product demo.",
    status: "Pending",
  },
  {
    id: "5",
    date: "2025-02-29",
    message: "Send reminder email to potential investor.",
    status: "Scheduled",
  },
  {
    id: "6",
    date: "2025-03-01",
    message: "Follow up with development team about bug fixes.",
    status: "In Progress",
  },
];

const UtilityPage = () => {
  const [followUps, setFollowUps] = useState([]);
  const [calendarValue, setCalendarValue] = useState(new Date());

  useEffect(() => {
    axios
      .get("/api/follow-ups")
      .then((response) => setFollowUps(response.data))
      .catch(() => setFollowUps(mockFollowUps));
  }, []);

  // Handle drag-and-drop for Kanban
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(followUps);
    const [movedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, movedItem);
    setFollowUps(items);
  };

  return (
    <div className="p-4 text-white bg-black w-full relative">
      <p className="mb-4 text-gray-300">
        Manage and track automated follow-ups easily.
      </p>

      {/* Kanban Board */}
      <h2 className="text-xl font-semibold mt-6 text-gray-300">
        Follow-Up Tracker
      </h2>
      <div className="h-96 overflow-y-auto border border-gray-600 rounded-lg p-2">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="kanban">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-4"
              >
                {followUps.map((followUp, index) => (
                  <Draggable
                    key={followUp.id}
                    draggableId={followUp.id}
                    index={index}
                  >
                    {(provided) => (
                      <Card
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="bg-gray-900 border border-gray-600 p-4 shadow-lg"
                      >
                        <CardContent>
                          <div className="flex justify-between items-center">
                            <h2 className="text-lg font-medium text-white">
                              {followUp.message}
                            </h2>
                            <span className="text-sm text-gray-400 flex items-center">
                              <CalendarClock className="w-4 h-4 mr-1 text-gray-400" />{" "}
                              {followUp.date}
                            </span>
                          </div>
                          <div className="flex justify-between mt-3">
                            <Button
                              variant="outline"
                              className="flex items-center border-gray-500 text-gray-300"
                            >
                              <Send className="w-4 h-4 mr-2" /> Send Now
                            </Button>
                            <Button
                              variant="secondary"
                              className="flex items-center bg-gray-700 text-white"
                            >
                              <Clock className="w-4 h-4 mr-2" /> Schedule Later
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      {/* Calendar */}
      <h2 className="text-xl font-semibold mt-6 text-gray-300">
        Upcoming Follow-Ups
      </h2>
      <div className="border border-gray-600 rounded-lg p-4 mt-4">
        <Calendar
          mode="single"
          selected={calendarValue}
          onSelect={setCalendarValue}
        />
      </div>
    </div>
  );
};

export default UtilityPage;
