"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import {
  Calendar as CalendarIcon,
  ArrowRightLeft,
  MapPin,
  Bus,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Card, CardContent } from "@/components/ui/card";

export function BusSearchForm() {
  const router = useRouter();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!from || !to || !date) return;

    const query = new URLSearchParams({
      from,
      to,
      date: format(date, "yyyy-MM-dd"),
    });
    router.push(`/search?${query.toString()}`);
  };

  const swapLocations = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <Card className="shadow-2xl">
      <CardContent className="p-6">
        <form
          onSubmit={handleSearch}
          className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end"
        >
          <div className="md:col-span-4 relative">
            <label
              htmlFor="from"
              className="block text-sm font-medium text-muted-foreground mb-1"
            >
              From
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="from"
                placeholder="Source"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="md:col-span-1 flex justify-center items-center">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={swapLocations}
              className="mt-5"
            >
              <ArrowRightLeft className="h-5 w-5 text-muted-foreground" />
            </Button>
          </div>

          <div className="md:col-span-4">
            <label
              htmlFor="to"
              className="block text-sm font-medium text-muted-foreground mb-1"
            >
              To
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="to"
                placeholder="Destination"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="md:col-span-3 lg:col-span-2">
            <label
              htmlFor="date"
              className="block text-sm font-medium text-muted-foreground mb-1"
            >
              Date of Journey
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  disabled={(date) =>
                    date < new Date(new Date().setDate(new Date().getDate() - 1))
                  }
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="md:col-span-12 lg:col-span-1">
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg"
              size="lg"
            >
              <Bus className="mr-2 h-5 w-5 md:hidden lg:block" />
              Search
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
