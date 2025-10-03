import { useState } from "react";
import { Shield, RefreshCw } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import SIEMSection from "@/components/SIEMSection";
import SOARSection from "@/components/SOARSection";
import BizzySection from "@/components/BizzySection";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("siem");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    console.log("Refreshing dashboard data...");
    setTimeout(() => {
      setIsRefreshing(false);
      console.log("Dashboard refreshed");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="h-6 w-6 text-primary" />
              <h1 className="text-xl md:text-2xl font-semibold">
                Security Operations Dashboard
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleRefresh}
                disabled={isRefreshing}
                data-testid="button-refresh-dashboard"
              >
                <RefreshCw className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
              </Button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 md:px-6 lg:px-8 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="siem" data-testid="tab-siem">
              SIEM
            </TabsTrigger>
            <TabsTrigger value="soar" data-testid="tab-soar">
              SOAR
            </TabsTrigger>
            <TabsTrigger value="bizzy" data-testid="tab-bizzy">
              Bizzy
            </TabsTrigger>
          </TabsList>

          <TabsContent value="siem" className="space-y-6" data-testid="content-siem">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold mb-2">
                Security Information & Event Management
              </h2>
              <p className="text-muted-foreground">
                Monitor security events, threats, and system health in real-time
              </p>
            </div>
            <SIEMSection />
          </TabsContent>

          <TabsContent value="soar" className="space-y-6" data-testid="content-soar">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold mb-2">
                Security Orchestration, Automation & Response
              </h2>
              <p className="text-muted-foreground">
                Track incidents, response times, and automation metrics
              </p>
            </div>
            <SOARSection />
          </TabsContent>

          <TabsContent value="bizzy" className="space-y-6" data-testid="content-bizzy">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold mb-2">
                Bizzy Performance Analytics
              </h2>
              <p className="text-muted-foreground">
                Analyze team efficiency, productivity, and goal achievement
              </p>
            </div>
            <BizzySection />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
