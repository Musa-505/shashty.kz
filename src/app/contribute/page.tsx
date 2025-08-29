
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { DollarSign, User, CreditCard, Landmark } from "lucide-react";

export default function ContributePage() {
    const { toast } = useToast();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const name = formData.get('name');
        const amount = formData.get('amount');
        console.log({ name, amount });
        
        toast({
            title: "Рахмет!",
            description: "Сіздің үлесіңіз қабылданды.",
        });
        (event.target as HTMLFormElement).reset();
    };

  return (
    <div className="container mx-auto px-4 py-12 md:px-6 flex items-center justify-center min-h-[calc(100vh-10rem)]">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-headline">Қорға үлес қосыңыз</CardTitle>
          <CardDescription>Сіздің қолдауыңыз қазақ мәдениеті мен тарихын сақтауға көмектеседі.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Аты-жөніңіз</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input id="name" name="name" placeholder="Сіздің аты-жөніңіз" required className="pl-10" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Сома (₸)</Label>
               <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input id="amount" name="amount" type="number" placeholder="1000" required className="pl-10"/>
              </div>
            </div>
            <div className="space-y-2">
                <Label>Төлем әдісі</Label>
                <RadioGroup defaultValue="card" className="flex gap-4 pt-2">
                    <Label htmlFor="card" className="flex items-center gap-2 p-4 border rounded-md cursor-pointer hover:bg-accent has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-accent">
                        <RadioGroupItem value="card" id="card" />
                        <CreditCard className="h-5 w-5 mr-2" />
                        <span>Кредит картасы</span>
                    </Label>
                    <Label htmlFor="transfer" className="flex items-center gap-2 p-4 border rounded-md cursor-pointer hover:bg-accent has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-accent">
                        <RadioGroupItem value="transfer" id="transfer" />
                        <Landmark className="h-5 w-5 mr-2" />
                        <span>Банк аударымы</span>
                    </Label>
                </RadioGroup>
            </div>
            <Button type="submit" className="w-full">
              Үлес қосу
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
