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

interface Step4Props {
  form: UseFormReturn<any>;
  onBack: () => void;
  onNext: () => void;
}

export function Step4Address({ form, onBack, onNext }: Step4Props) {
  const address = form.watch("address");
  const city = form.watch("city");
  const state = form.watch("state");
  const country = form.watch("country");
  const postalCode = form.watch("postalCode");
  const hasAnyValue =
    !!address || !!city || !!state || !!country || !!postalCode;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="text-center lg:text-left space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">
          Business Address
        </h2>
        <p className="text-sm text-muted-foreground">
          Where is your business located? (Optional)
        </p>
      </div>
      <Form {...form}>
        <form className="space-y-5 max-w-md mx-auto lg:mx-0">
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">
                  Street Address
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="123 Main St"
                    className="h-11"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">City</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="San Francisco"
                      className="h-11"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">
                    State/Province
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="CA" className="h-11" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Country</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="United States"
                      className="h-11"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">
                    Postal Code
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="94102" className="h-11" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 max-w-md mx-auto lg:mx-0 pt-4">
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
