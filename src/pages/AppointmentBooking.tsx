import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { CalendarIcon, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, "الاسم يجب أن يكون حرفين على الأقل"),
  email: z.string().email("البريد الإلكتروني غير صحيح"),
  phone: z.string().min(10, "رقم الجوال يجب أن يكون 10 أرقام على الأقل"),
  organization: z.string().min(2, "اسم الجهة مطلوب"),
  visitReason: z.string().min(3, "سبب الزيارة مطلوب"),
  message: z.string().min(10, "الرسالة يجب أن تكون 10 أحرف على الأقل"),
  appointmentDate: z.date({
    required_error: "يرجى اختيار موعد الزيارة",
  }),
  appointmentTime: z.string({
    required_error: "يرجى اختيار وقت الزيارة",
  }),
});

const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
];

const AppointmentBooking = () => {
  const [selectedTime, setSelectedTime] = useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      organization: "",
      visitReason: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast.success("تم إرسال طلب الحجز بنجاح!");
    form.reset();
    setSelectedTime("");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-12 px-4" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <div className="bg-card shadow-2xl rounded-2xl overflow-hidden border border-border/50">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-primary/80 px-8 py-6">
            <h1 className="text-3xl font-bold text-primary-foreground text-center">
              حجز موعد زيارة
            </h1>
            <p className="text-primary-foreground/90 text-center mt-2">
              يرجى تعبئة النموذج أدناه لحجز موعد زيارتك
            </p>
          </div>

          {/* Form */}
          <div className="p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Name and Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground font-semibold">الاسم الكامل</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="أدخل اسمك الكامل"
                            {...field}
                            className="bg-background border-border"
                          />
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
                        <FormLabel className="text-foreground font-semibold">البريد الإلكتروني</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="example@email.com"
                            {...field}
                            className="bg-background border-border"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Phone and Organization */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground font-semibold">رقم الجوال</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="05xxxxxxxx"
                            {...field}
                            className="bg-background border-border"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="organization"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground font-semibold">اسم الجهة</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="أدخل اسم الجهة"
                            {...field}
                            className="bg-background border-border"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Visit Reason */}
                <FormField
                  control={form.control}
                  name="visitReason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground font-semibold">سبب الزيارة</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="أدخل سبب الزيارة"
                          {...field}
                          className="bg-background border-border"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Message */}
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground font-semibold">نص الرسالة</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="أدخل تفاصيل إضافية عن موضوع الزيارة..."
                          className="min-h-[120px] bg-background border-border resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Appointment Date and Time */}
                <div className="bg-muted/30 p-6 rounded-xl border border-border">
                  <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5" />
                    تفاصيل الموعد
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Date Picker */}
                    <FormField
                      control={form.control}
                      name="appointmentDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel className="text-foreground font-semibold mb-2">
                            موعد الزيارة
                          </FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full justify-start text-right font-normal bg-background border-border hover:bg-accent",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  <CalendarIcon className="ml-2 h-4 w-4" />
                                  {field.value ? (
                                    format(field.value, "PPP", { locale: ar })
                                  ) : (
                                    <span>اختر التاريخ</span>
                                  )}
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date < new Date() || date < new Date("1900-01-01")
                                }
                                initialFocus
                                className="pointer-events-auto"
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Time Slots */}
                    <FormField
                      control={form.control}
                      name="appointmentTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground font-semibold mb-2 flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            وقت الزيارة
                          </FormLabel>
                          <div className="grid grid-cols-2 gap-3">
                            {timeSlots.map((time) => (
                              <Button
                                key={time}
                                type="button"
                                variant={field.value === time ? "default" : "outline"}
                                className={cn(
                                  "h-12 text-sm font-medium transition-all",
                                  field.value === time
                                    ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg"
                                    : "bg-background border-border hover:bg-accent hover:border-primary/50"
                                )}
                                onClick={() => {
                                  field.onChange(time);
                                  setSelectedTime(time);
                                }}
                              >
                                {time}
                              </Button>
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center pt-4">
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full md:w-auto px-12 py-6 text-lg font-bold shadow-xl hover:shadow-2xl transition-all"
                  >
                    إرسال طلب الحجز
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentBooking;
