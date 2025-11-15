import { HouseholdCard, Person } from "@/components/HouseholdCard";
import person1 from "@/assets/person1.jpg";
import person2 from "@/assets/person2.jpg";
import person3 from "@/assets/person3.jpg";
import homeBg from "@/assets/home-bg.jpg";

const Index = () => {
  const householdMembers: Person[] = [
    {
      id: "1",
      name: "Anna Andersson",
      avatar: person1,
      status: "home",
      lastSeen: "Aktiv nu",
      steps: 8542,
      batteryLevel: 85,
      devices: [
        { name: "iPhone 15 Pro", type: "phone", battery: 85, charging: false },
        { name: "Apple Watch Ultra", type: "watch", battery: 72, charging: false },
      ],
      activity: {
        steps: 8542,
        stepGoal: 10000,
        calories: 420,
        calorieGoal: 600,
        activeMinutes: 45,
        activeGoal: 60,
      },
      heartRate: {
        current: 72,
        resting: 58,
      },
      recentLocations: [
        { place: "Hemma", time: "Nu", duration: "Sedan 17:30" },
        { place: "ICA Maxi", time: "16:45", duration: "25 min" },
        { place: "Gymmet", time: "15:00", duration: "1h 15min" },
      ],
    },
    {
      id: "2",
      name: "Erik Andersson",
      avatar: person2,
      status: "away",
      location: "Kontoret",
      lastSeen: "Sedan 08:30",
      steps: 12234,
      batteryLevel: 45,
      devices: [
        { name: "Samsung Galaxy S24", type: "phone", battery: 45, charging: false },
        { name: "Galaxy Watch 6", type: "watch", battery: 38, charging: false },
      ],
      activity: {
        steps: 12234,
        stepGoal: 12000,
        calories: 580,
        calorieGoal: 700,
        activeMinutes: 72,
        activeGoal: 90,
      },
      heartRate: {
        current: 68,
        resting: 62,
      },
      recentLocations: [
        { place: "Kontoret", time: "Nu", duration: "Sedan 08:30" },
        { place: "Pressbyrån", time: "12:15", duration: "5 min" },
        { place: "Hemma", time: "07:45", duration: "45 min" },
      ],
    },
    {
      id: "3",
      name: "Emma Andersson",
      avatar: person3,
      status: "home",
      lastSeen: "5 min sedan",
      steps: 3421,
      batteryLevel: 92,
      devices: [
        { name: "iPhone 14", type: "phone", battery: 92, charging: true },
        { name: "Apple Watch SE", type: "watch", battery: 85, charging: false },
      ],
      activity: {
        steps: 3421,
        stepGoal: 8000,
        calories: 180,
        calorieGoal: 400,
        activeMinutes: 22,
        activeGoal: 45,
      },
      heartRate: {
        current: 65,
        resting: 60,
      },
      recentLocations: [
        { place: "Hemma", time: "Nu", duration: "Sedan 15:30" },
        { place: "Skolan", time: "08:00", duration: "7h 15min" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Background */}
      <div className="fixed inset-0 -z-10">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-5"
          style={{ backgroundImage: `url(${homeBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold text-foreground md:text-5xl">
            Smart Home Dashboard
          </h1>
          <p className="text-lg text-muted-foreground">
            Håll koll på alla i hushållet på ett ställe
          </p>
        </div>

        <div className="mx-auto max-w-5xl">
          <HouseholdCard people={householdMembers} />
        </div>

        {/* Info Section */}
        <div className="mx-auto mt-12 max-w-3xl">
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-lg bg-card/50 p-4 text-center backdrop-blur-sm">
              <div className="mb-2 text-3xl font-bold text-primary">3</div>
              <div className="text-sm text-muted-foreground">Familjemedlemmar</div>
            </div>
            <div className="rounded-lg bg-card/50 p-4 text-center backdrop-blur-sm">
              <div className="mb-2 text-3xl font-bold text-status-home">2</div>
              <div className="text-sm text-muted-foreground">Hemma nu</div>
            </div>
            <div className="rounded-lg bg-card/50 p-4 text-center backdrop-blur-sm">
              <div className="mb-2 text-3xl font-bold text-status-away">1</div>
              <div className="text-sm text-muted-foreground">Borta</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
