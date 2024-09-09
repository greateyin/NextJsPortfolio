"use client"
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";
import { SendEmail } from "./SendEmail";
import { useRouter } from 'next/navigation';

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    setError('');
    const result = await SendEmail(formData);
    setIsSubmitting(false);

    if (result.success) {
      setShowThankYou(true);
      setTimeout(() => {
        setShowThankYou(false);
        router.push('/');
      }, 3000);
    } else {
      setError(result.error || 'An error occurred');
    }
  };

  if (showThankYou) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-lg font-semibold">Thank you for contacting me.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <form action={handleSubmit}>
        <CardHeader>
          <CardTitle className="icon_underline">Send me a mail.</CardTitle>
          <CardDescription>
            Once form is submitted you will see a thank you message.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="grid w-full max-w-sm items-center gap-1.5 mt-2">
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              name="name"
              required
              placeholder="Enter your name"
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 mt-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              name="SenderEmail"
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 mt-2">
            <Label htmlFor="message">Your Message</Label>
            <textarea
              placeholder="Your message here..."
              name="message"
              required
              className="resize-none flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            ></textarea>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ContactForm;