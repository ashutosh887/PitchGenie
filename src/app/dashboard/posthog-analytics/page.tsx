"use client";

import { useState } from "react";
import posthog from "posthog-js";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { DatePicker } from "@/components/ui/datepicker";

posthog.init("YOUR_POSTHOG_API_KEY", { api_host: "https://app.posthog.com" });

const mockEvents = [
  {
    type: "click",
    timestamp: Date.now() - 100000,
    user: "User1",
    page: "Home",
    clicks: 5,
    conversionType: "signup",
  },
  {
    type: "conversion",
    timestamp: Date.now() - 500000,
    user: "User2",
    page: "Pricing",
    clicks: 3,
    conversionType: "purchase",
  },
  {
    type: "click",
    timestamp: Date.now() - 200000,
    user: "User3",
    page: "Dashboard",
    clicks: 8,
    conversionType: "trial",
  },
];

export default function Dashboard() {
  const [events, setEvents] = useState(mockEvents);
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [eventType, setEventType] = useState("all");

  const filteredEvents = events.filter((event) =>
    eventType === "all" ? true : event.type === eventType
  );

  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {/* Session Overview */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-2">Total Sessions</h2>
          <p className="text-3xl font-semibold">{events.length}</p>
        </CardContent>
      </Card>

      {/* Conversion Rate */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-2">Conversion Rate</h2>
          <p className="text-3xl font-semibold">
            {events.length > 0
              ? ((filteredEvents.length / events.length) * 100).toFixed(2)
              : 0}
            %
          </p>
        </CardContent>
      </Card>

      {/* Date Picker & Filters */}
      <div className="col-span-full flex gap-4 items-center">
        <DatePicker range={dateRange} onChange={setDateRange} />
        <Select value={eventType} onValueChange={setEventType}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select event type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Events</SelectItem>
            <SelectItem value="click">Clicks</SelectItem>
            <SelectItem value="conversion">Conversions</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Line Chart for Engagement */}
      <Card className="col-span-full">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4">User Engagement Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={filteredEvents}>
              <XAxis
                dataKey="timestamp"
                tickFormatter={(t) => new Date(t).toLocaleDateString()}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="clicks" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Bar Chart for Clicks */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4">Clicks Per Page</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={filteredEvents}>
              <XAxis dataKey="page" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="clicks" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Pie Chart for Conversion Types */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4">Conversion Breakdown</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={filteredEvents}
                dataKey="conversionType"
                fill="#ff7300"
              >
                {filteredEvents.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={["#ff7300", "#82ca9d", "#8884d8"][index % 3]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Event Logs */}
      <Card className="col-span-full">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4">Event Logs</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border p-3">Event</th>
                <th className="border p-3">Timestamp</th>
                <th className="border p-3">User</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.map((event, idx) => (
                <tr key={idx}>
                  <td className="border p-3">{event.type}</td>
                  <td className="border p-3">
                    {new Date(event.timestamp).toLocaleString()}
                  </td>
                  <td className="border p-3">{event.user}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
