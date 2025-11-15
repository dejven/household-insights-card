import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Person } from "@/components/HouseholdCard";
import { Battery, Smartphone, Watch, MapPin, Clock, Heart, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface PersonDetailDialogProps {
  person: Person | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "home":
      return "bg-status-home text-primary-foreground";
    case "away":
      return "bg-status-away text-primary-foreground";
    case "unknown":
      return "bg-status-unknown text-primary-foreground";
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "home":
      return "Hemma";
    case "away":
      return "Borta";
    case "unknown":
      return "Okänd";
  }
};

const getBatteryColor = (level: number) => {
  if (level > 50) return "text-status-home";
  if (level > 20) return "text-yellow-500";
  return "text-destructive";
};

const getDeviceIcon = (type: string) => {
  switch (type) {
    case "phone":
      return Smartphone;
    case "watch":
      return Watch;
    default:
      return Battery;
  }
};

const ActivityRing = ({ 
  value, 
  goal, 
  color, 
  label, 
  unit 
}: { 
  value: number; 
  goal: number; 
  color: string; 
  label: string; 
  unit: string;
}) => {
  const percentage = Math.min((value / goal) * 100, 100);
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative h-32 w-32">
        <svg className="h-32 w-32 -rotate-90 transform">
          <circle
            cx="64"
            cy="64"
            r="45"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-muted/20"
          />
          <circle
            cx="64"
            cy="64"
            r="45"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className={cn("transition-all duration-1000", color)}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-2xl font-bold text-foreground">{value.toLocaleString('sv-SE')}</div>
          <div className="text-xs text-muted-foreground">av {goal.toLocaleString('sv-SE')}</div>
        </div>
      </div>
      <div className="text-center">
        <div className="text-sm font-medium text-foreground">{label}</div>
        <div className="text-xs text-muted-foreground">{unit}</div>
      </div>
    </div>
  );
};

export const PersonDetailDialog = ({ person, open, onOpenChange }: PersonDetailDialogProps) => {
  if (!person) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-border">
              <AvatarImage src={person.avatar} alt={person.name} />
              <AvatarFallback className="bg-muted text-muted-foreground text-xl">
                {person.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <DialogTitle className="text-2xl">{person.name}</DialogTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className={cn("text-xs", getStatusColor(person.status))}>
                  {getStatusText(person.status)}
                </Badge>
                {person.location && person.status === "away" && (
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {person.location}
                  </span>
                )}
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Activity Rings */}
          {person.activity && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Aktivitet idag
              </h3>
              <div className="grid grid-cols-3 gap-4 p-4 rounded-lg bg-secondary/30">
                <ActivityRing
                  value={person.activity.steps}
                  goal={person.activity.stepGoal}
                  color="text-status-home"
                  label="Steg"
                  unit="steg"
                />
                <ActivityRing
                  value={person.activity.calories}
                  goal={person.activity.calorieGoal}
                  color="text-destructive"
                  label="Kalorier"
                  unit="kcal"
                />
                <ActivityRing
                  value={person.activity.activeMinutes}
                  goal={person.activity.activeGoal}
                  color="text-primary"
                  label="Aktiv tid"
                  unit="minuter"
                />
              </div>
            </div>
          )}

          {/* Heart Rate */}
          {person.heartRate && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Heart className="h-5 w-5 text-destructive" />
                Puls
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {person.heartRate.current && (
                  <div className="p-4 rounded-lg bg-secondary/30">
                    <div className="text-sm text-muted-foreground">Nuvarande</div>
                    <div className="text-2xl font-bold text-foreground">{person.heartRate.current} bpm</div>
                  </div>
                )}
                {person.heartRate.resting && (
                  <div className="p-4 rounded-lg bg-secondary/30">
                    <div className="text-sm text-muted-foreground">Vilopuls</div>
                    <div className="text-2xl font-bold text-foreground">{person.heartRate.resting} bpm</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Devices */}
          {person.devices && person.devices.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-primary" />
                Enheter
              </h3>
              <div className="space-y-2">
                {person.devices.map((device, index) => {
                  const DeviceIcon = getDeviceIcon(device.type);
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg bg-secondary/30"
                    >
                      <div className="flex items-center gap-3">
                        <div className="rounded-full bg-primary/10 p-2">
                          <DeviceIcon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium text-foreground">{device.name}</div>
                          <div className="text-xs text-muted-foreground capitalize">{device.type}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Battery className={cn("h-5 w-5", getBatteryColor(device.battery))} />
                        <span className={cn("font-semibold", getBatteryColor(device.battery))}>
                          {device.battery}%
                        </span>
                        {device.charging && (
                          <Badge variant="outline" className="text-xs">
                            Laddar
                          </Badge>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Recent Locations */}
          {person.recentLocations && person.recentLocations.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Senaste platser
              </h3>
              <div className="space-y-2">
                {person.recentLocations.map((location, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg bg-secondary/30"
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-primary/10 p-2">
                        <MapPin className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{location.place}</div>
                        {location.duration && (
                          <div className="text-xs text-muted-foreground">{location.duration}</div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {location.time}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
