import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ChevronRight } from "lucide-react";

interface Step1Props {
  form: UseFormReturn<any>;
  onNext: () => void;
}

export function Step1CompanyInfo({ form, onNext }: Step1Props) {
  const companyName = form.watch("companyName");
  const email = form.watch("email");

  // Simple validation: check if fields are filled and email has @ symbol
  const isDisabled = !companyName?.trim() || !email?.trim() || !email.includes("@");

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300 min-h-[468px]">
      <div className="text-left space-y-3 pb-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Company Information
        </h2>
        <p className="text-base text-muted-foreground">
          Tell us about your business
        </p>
      </div>
      <Form {...form}>
        <form className="space-y-6 max-w-md">
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">
                  Company Name
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Acme Inc." className="h-11" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">
                  Business Email
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="info@company.com"
                    className="h-11"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <div className="flex justify-start pt-6">
        <Button
          onClick={onNext}
          size="lg"
          className="w-full max-w-md"
          disabled={isDisabled}
        >
          Continue
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
