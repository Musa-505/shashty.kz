
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
import { deleteNewsItem } from "@/lib/firebase-service";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export function DeleteNewsButton({ newsId }: { newsId: string }) {
  const { toast } = useToast();
  const router = useRouter();

  const handleDelete = async () => {
    const result = await deleteNewsItem(newsId);
    if (result.success) {
      toast({
        title: "Сәтті жойылды",
        description: "Жаңалық жойылды.",
      });
       router.refresh();
    } else {
      toast({
        title: "Қате",
        description: "Жаңалықты жою кезінде қате пайда болды.",
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
            Бұл әрекетті қайтару мүмкін емес. Бұл жаңалықты дерекқордан біржола жояды.
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
