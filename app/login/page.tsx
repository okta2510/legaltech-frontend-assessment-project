"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, LockKeyhole } from "lucide-react";
import { ADMIN_CREDENTIALS } from "@/lib/auth";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

type FormValues = z.infer<typeof formSchema>;

export default function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
     console.log("Login result:", result);
      if (result.success) {
        window.location.href = "/admin";
      } else {
        setError(result.error || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Logo className="mx-auto mb-6" />
          <h1 className="text-2xl font-bold">Admin Login</h1>
          <p className="text-gray-600 text-sm mt-2">
            Login to access the lead management dashboard
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to access the admin dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {error && (
                  <div className="p-3 bg-red-50 text-red-600 text-sm rounded-md border border-red-200">
                    {error}
                  </div>
                )}

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#1C3144] hover:bg-[#142536]"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      <LockKeyhole className="mr-2 h-4 w-4" />
                      Sign In
                    </>
                  )}
                </Button>
                <div className="mt-2 text-xs text-muted-foreground text-center">
                  <div className="text-gray-600">
                    <span>For demonstration purposes, use:</span>
                  </div>
                  <div className="text-gray-700 mt-1">
                    <span className="font-medium">Email: </span>
                    <code className="bg-gray-100 p-1 rounded">{ADMIN_CREDENTIALS.email}</code>
                    <br />
                    <span className="font-medium">Password: </span>
                    <code className="bg-gray-100 p-1 rounded">{ADMIN_CREDENTIALS.password}</code>
                  </div>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}