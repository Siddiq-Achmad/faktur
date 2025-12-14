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

interface Step3Props {
  form: UseFormReturn<any>;
  onBack: () => void;
  onNext: () => void;
}

export function Step3Contact({ form, onBack, onNext }: Step3Props) {
  const phone = form.watch("phone");
  const website = form.watch("website");
  const hasAnyValue = !!phone || !!website;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300 min-h-[468px]">
      <div className="text-left space-y-3 pb-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Contact Details
        </h2>
        <p className="text-base text-muted-foreground">
          How can clients reach you? (Optional)
        </p>
      </div>
      <Form {...form}>
        <form className="space-y-6 max-w-md">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">
                  Phone Number
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="+1 (555) 123-4567"
                    className="h-11"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">Website</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="https://company.com"
                    className="h-11"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 max-w-md pt-6">
        <Button
          variant="outline"
          onClick={onBack}
          size="lg"
          className="w-full sm:w-auto sm:min-w-20"
        >
          Back
        </Button>
        <Button
          onClick={onNext}
          size="lg"
          className="w-full sm:w-auto sm:min-w-20"
        >
          {hasAnyValue ? "Next" : "Skip"}
        </Button>
      </div>
    </div>
  );
}
