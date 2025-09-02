
'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { deletePerson } from "@/lib/firebase-service";
import { useToast } from "@/hooks/use-toast";

export function DeletePersonButton({ personId }: { personId: string }) {
  const { toast } = useToast();

  const handleDelete = async () => {
    const result = await deletePerson(personId);
    if (result.success) {
      toast({
        title: "Сәтті жойылды",
        description: "Тұлға туралы ақпарат жойылды.",
      });
    } else {
      toast({
        title: "Қате",
        description: "Тұлғаны жою кезінде қате пайда болды.",
        variant: "destructive",
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Жою</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Сіз сенімдісіз бе?</AlertDialogTitle>
          <AlertDialogDescription>
            Бұл әрекетті қайтару мүмкін емес. Бұл тұлға туралы барлық ақпаратты дерекқордан біржола жояды.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Болдырмау</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Жою</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
