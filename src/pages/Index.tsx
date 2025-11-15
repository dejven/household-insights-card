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
    },
    {
      id: "3",
      name: "Emma Andersson",
      avatar: person3,
      status: "home",
      lastSeen: "5 min sedan",
      steps: 3421,
      batteryLevel: 92,
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
