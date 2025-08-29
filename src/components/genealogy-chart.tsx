
"use client";

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type PersonNodeProps = {
  name: string;
  clan?: string;
  isCentral?: boolean;
};

const PersonNode = ({ name, clan, isCentral = false }: PersonNodeProps) => (
  <Card className={cn("w-48 text-center shadow-md", isCentral ? "border-2 border-accent bg-accent/10" : "bg-card")}>
    <CardHeader className="p-4">
      <CardTitle className="text-base font-bold">{name}</CardTitle>
      {clan && <CardDescription>{clan}</CardDescription>}
    </CardHeader>
  </Card>
);

export function GenealogyChart() {
  return (
    <div className="min-w-[800px] py-10">
      <div className="relative flex flex-col items-center space-y-16">
        {/* Grandparents */}
        <div className="flex justify-center space-x-24">
          <PersonNode name="Qabanbai" clan="Senior Juz" />
          <PersonNode name="Bogenbai" clan="Middle Juz" />
        </div>

        {/* Connecting Lines to Parents */}
        <div className="absolute top-16 h-8 w-1/2">
            <div className="absolute left-1/4 top-0 h-full w-px bg-border"></div>
            <div className="absolute right-1/4 top-0 h-full w-px bg-border"></div>
            <div className="absolute left-1/4 top-full h-px w-1/2 bg-border -translate-y-px"></div>
        </div>
        <div className="absolute top-24 left-1/2 h-8 w-px bg-border"></div>


        {/* Parents */}
        <div className="flex justify-center">
            <PersonNode name="Ablai Khan" clan="Middle Juz" />
        </div>
        
        {/* Connecting Line to Central Person */}
        <div className="absolute top-[16.5rem] left-1/2 h-8 w-px bg-border"></div>

        {/* Central Person & Spouse */}
        <div className="flex items-center justify-center space-x-16">
          <div className="flex items-center">
             <PersonNode name="Kenesary" clan="Middle Juz" isCentral/>
             <div className="w-16 h-px bg-border"></div>
             <PersonNode name="Kunimzhan" clan="Spouse" />
          </div>
        </div>
        
        {/* Connecting Line to Children */}
        <div className="absolute top-[27rem] left-1/2 h-8 w-px bg-border"></div>

        {/* Children */}
        <div className="flex justify-center space-x-8">
            <div className="absolute top-[29rem] left-1/4 h-px w-1/2 bg-border"></div>
            <div className="absolute left-1/4 top-[29rem] h-8 w-px bg-border"></div>
            <div className="absolute right-1/4 top-[29rem] h-8 w-px bg-border"></div>

          <PersonNode name="Syzdyq Sultan" />
          <PersonNode name="Zhanibek" />
        </div>
        
      </div>
    </div>
  );
}
