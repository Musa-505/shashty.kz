
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function ShareFab() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    // In a real application, this would send data to a backend for admin review.
    console.log('User submission:', data);

    toast({
      title: 'Рахмет!',
      description: 'Ақпаратыңыз модераторларға жіберілді. Тексерістен кейін сайтқа жарияланады.',
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg"
          size="icon"
        >
          <Plus className="h-8 w-8" />
          <span className="sr-only">Ақпаратпен бөлісу</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ақпаратпен бөлісу</DialogTitle>
          <DialogDescription>
            Тарихи тұлға, жаңалық немесе мақала туралы ақпаратпен бөлісіңіз.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
           <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Аты-жөніңіз
            </Label>
            <Input id="name" name="name" required className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input id="email" name="email" type="email" required className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Түрі
            </Label>
             <Select name="type" required>
                <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Ақпарат түрін таңдаңыз" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="person">Тұлға</SelectItem>
                    <SelectItem value="news">Жаңалық</SelectItem>
                    <SelectItem value="article">Мақала</SelectItem>
                    <SelectItem value="other">Басқа</SelectItem>
                </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="content" className="text-right pt-2">
              Ақпарат
            </Label>
            <Textarea
              id="content"
              name="content"
              required
              className="col-span-3 min-h-[100px]"
              placeholder="Осы жерге толық ақпаратты енгізіңіз..."
            />
          </div>
          <DialogFooter>
            <Button type="submit">Жіберу</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
