"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { FileUpload } from "@/components/ui/file-upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { COUNTRIES, VISA_OPTIONS } from "@/lib/constants";
import { Check, Loader2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { createLead } from "@/lib/db";
import { uploadFile } from "@/lib/upload";

const formSchema = z.object({
  firstName: z.string().min(2, { message: "First name is required" }),
  lastName: z.string().min(2, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  linkedIn: z.string().url({ message: "Please enter a valid LinkedIn URL" }).or(z.string().regex(/^(https?:\/\/)?(www\.)?linkedin\.com\/in\/.*$/, { message: "Please enter a valid LinkedIn profile URL" })),
  country: z.string().optional(),
  visaTypes: z.array(z.string()).min(1, { message: "Please select at least one visa type" }),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function LeadSubmissionForm() {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      linkedIn: "",
      country: undefined,
      visaTypes: [],
      notes: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      let resumeUrl = undefined;
      
      if (selectedFile) {
        resumeUrl = await uploadFile(selectedFile);
      }
      
      createLead({
        ...data,
        resumeUrl,
      });
      
      // Redirect to success page
      router.push("/submit/success");
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error here
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="First Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Last Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="linkedIn"
          render={({ field }) => (
            <FormItem>
              <FormLabel>LinkedIn Profile</FormLabel>
              <FormControl>
                <Input placeholder="LinkedIn (Personal Website URL)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country of Citizenship</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your country" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="max-h-80">
                  {COUNTRIES.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Visa categories of interest?</CardTitle>
            <CardDescription>
              Select all visa types you're interested in exploring
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="visaTypes"
              render={() => (
                <FormItem>
                  <div className="space-y-4">
                    {VISA_OPTIONS.map((option) => (
                      <FormField
                        key={option.value}
                        control={form.control}
                        name="visaTypes"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={option.value}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(option.value)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, option.value])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== option.value
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {option.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <FormItem>
          <FormLabel>Upload Resume/CV (optional)</FormLabel>
          <FileUpload
            onFileChange={(file) => setSelectedFile(file)}
            selectedFile={selectedFile}
            error={fileError}
            label="Upload Resume/CV"
          />
          <FormDescription>
            Upload your resume or CV in PDF or Word format (max 5MB)
          </FormDescription>
        </FormItem>

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>How can we help you?</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Tell us about your immigration goals, questions, or any special circumstances..." 
                  className="min-h-[120px]"
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Share any information that would help us understand your case better
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full md:w-auto bg-[#8BAE6D] hover:bg-[#7A9C5D]"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              Submit
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}