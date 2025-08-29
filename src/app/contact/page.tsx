
"use client";

import { useFormState, useFormStatus } from "react-dom";
import { submitContactForm } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Mail, MessageSquare, User } from "lucide-react";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? "Sending..." : "Send Message"}
    </Button>
  );
}

export default function ContactPage() {
  const initialState = { message: "", errors: {} };
  const [state, dispatch] = useFormState(submitContactForm, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message && !state.errors) {
      toast({
        title: "Success!",
        description: state.message,
      });
    } else if (state.message && state.errors) {
       toast({
        title: "Error",
        description: state.message,
        variant: "destructive",
      });
    }
  }, [state, toast]);

  return (
    <div className="container mx-auto px-4 py-12 md:px-6 flex items-center justify-center min-h-[calc(100vh-10rem)]">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-headline">Contact Us</CardTitle>
          <CardDescription>Have a question or suggestion? Drop us a line!</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={dispatch} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input id="name" name="name" placeholder="Your Name" required className="pl-10" />
              </div>
              {state.errors?.name && <p className="text-sm text-destructive">{state.errors.name.join(", ")}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
               <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input id="email" name="email" type="email" placeholder="your@email.com" required className="pl-10"/>
              </div>
              {state.errors?.email && <p className="text-sm text-destructive">{state.errors.email.join(", ")}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <div className="relative">
                 <MessageSquare className="absolute left-3 top-4 h-5 w-5 text-muted-foreground" />
                <Textarea id="message" name="message" placeholder="Your message..." required className="min-h-[120px] pl-10" />
              </div>
              {state.errors?.message && <p className="text-sm text-destructive">{state.errors.message.join(", ")}</p>}
            </div>
            <SubmitButton />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
