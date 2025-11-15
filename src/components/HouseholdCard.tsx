import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MapPin, Clock, Battery, Footprints } from "lucide-react";
import { cn } from "@/lib/utils";
import { PersonDetailDialog } from "@/components/PersonDetailDialog";

export type PersonStatus = "home" | "away" | "unknown";

export interface Device {
  name: string;
  type: string;
  battery: number;
  charging: boolean;
}

export interface Activity {
  steps: number;
  stepGoal: number;
  calories: number;
  calorieGoal: number;
  activeMinutes: number;
  activeGoal: number;
}

export interface RecentLocation {
  place: string;
  time: string;
  duration?: string;
}

export interface Person {
  id: string;
  name: string;
  avatar: string;
  status: PersonStatus;
  location?: string;
  lastSeen: string;
  steps?: number;
  batteryLevel?: number;
  devices?: Device[];
  activity?: Activity;
  recentLocations?: RecentLocation[];
  heartRate?: {
    current?: number;
    resting?: number;
  };
}

interface HouseholdCardProps {
  people: Person[];
  className?: string;
}

const getStatusColor = (status: PersonStatus) => {
  switch (status) {
    case "home":
      return "bg-status-home text-primary-foreground";
    case "away":
      return "bg-status-away text-primary-foreground";
    case "unknown":
      return "bg-status-unknown text-primary-foreground";
  }
};

const getStatusText = (status: PersonStatus) => {
  switch (status) {
    case "home":
      return "Hemma";
    case "away":
      return "Borta";
    case "unknown":
      return "Okänd";
  }
};

const getBatteryColor = (level?: number) => {
  if (!level) return "text-muted-foreground";
  if (level > 50) return "text-status-home";
  if (level > 20) return "text-yellow-500";
  return "text-destructive";
};

export const HouseholdCard = ({ people, className }: HouseholdCardProps) => {
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const homeCount = people.filter((p) => p.status === "home").length;
  const totalCount = people.length;

  const handlePersonClick = (person: Person) => {
    setSelectedPerson(person);
    setDialogOpen(true);
  };

  return (
    <Card
      className={cn(
        "relative overflow-hidden border-border/50 bg-gradient-to-br from-card to-card/80",
        "backdrop-blur-sm transition-all duration-300 hover:shadow-[var(--shadow-glow)]",
        className
      )}
    >
      <div className="p-6">
        {/* People Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {people.map((person) => (
            <div
              key={person.id}
              onClick={() => handlePersonClick(person)}
              className={cn(
                "group relative rounded-lg bg-secondary/50 p-4 transition-all duration-300",
                "hover:bg-secondary/70 hover:shadow-lg cursor-pointer"
              )}
            >
              <div className="flex items-start gap-3">
                <div className="relative">
                  <Avatar className="h-14 w-14 border-2 border-border">
                    <AvatarImage src={person.avatar} alt={person.name} />
                    <AvatarFallback className="bg-muted text-muted-foreground">
                      {person.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={cn(
                      "absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-2 border-secondary",
                      person.status === "home" && "bg-status-home",
                      person.status === "away" && "bg-status-away",
                      person.status === "unknown" && "bg-status-unknown"
                    )}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground truncate">{person.name}</h3>
                  <Badge
                    variant="outline"
                    className={cn("mt-1 text-xs font-medium", getStatusColor(person.status))}
                  >
                    {getStatusText(person.status)}
                  </Badge>
                </div>
              </div>

              <div className="mt-3 space-y-1 text-xs text-muted-foreground">
                {person.location && person.status === "away" && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span className="truncate">{person.location}</span>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  {person.batteryLevel !== undefined && (
                    <div className="flex items-center gap-1">
                      <Battery className={cn("h-3 w-3", getBatteryColor(person.batteryLevel))} />
                      <span className={getBatteryColor(person.batteryLevel)}>{person.batteryLevel}%</span>
                    </div>
                  )}
                  {person.steps !== undefined && (
                    <div className="flex items-center gap-1">
                      <Footprints className="h-3 w-3" />
                      <span>{person.steps.toLocaleString('sv-SE')} steg</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{person.lastSeen}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 to-transparent opacity-50" />

      {/* Person Detail Dialog */}
      <PersonDetailDialog 
        person={selectedPerson} 
        open={dialogOpen} 
        onOpenChange={setDialogOpen} 
      />
    </Card>
  );
};
