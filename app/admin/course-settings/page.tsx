"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useRouter } from "next/navigation";
import { Key, useEffect, useState } from "react";
import { NextPage } from "next";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { CourseSettingsData, Division, HoleModel } from "@/app/types";
import { TAGS_API_BASE_URL } from "@/app/networking/apiExports";
import { KindeOrganization } from "@kinde-oss/kinde-auth-nextjs/types";
import { Label } from "@/components/ui/label";
import { set } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlusCircle, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const fetchCourseSettings = async (organization: KindeOrganization) => {
  // console.log("Fetching course settings for orgCode:", orgCode);
  const response = await fetch(
    `${TAGS_API_BASE_URL}/api/fetch-course-settings/${organization.orgCode}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch course settings");
  }
  console.log("Response:", response);
  return await response.json();
};

const courseSchema = z.object({
  courseName: z.string().min(1, "Course name is required."),
  shortCode: z
    .string()
    .min(1, "Course short code is required.")
    .max(5, "Course short code must be 5 characters or less.")
    .refine((value) => value === value.toUpperCase(), {
      message: "Course Short Code must be all uppercase",
    }),
  city: z.string().min(1, "City is required."),
  state: z.string().min(1, "State is required."),
  layouts: z
    .array(
      z.object({
        name: z.string(),
        layout_id: z.number().optional(),
        par: z.string(),
      })
    )
    .nonempty("At least one layout is required."),
  holes: z.array(
    z.object({
      hole_id: z.number(),
      hole_number: z.number(),
      active: z.boolean(),
    })
  ),
  //   venmoUsername: z.string().optional(),
  //   cashappUsername: z.string().optional(),
  divisions: z.array(
    z.object({
      division_id: z.number(),
      name: z.string(),
      active: z.boolean(),
    })
  ),
  udiscLeagueURL: z.string().optional(),
});

type CourseFormValues = z.infer<typeof courseSchema>;

const AdminTools: NextPage = () => {
  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      courseName: "",
      shortCode: "",
      city: "",
      state: "",
      layouts: [{ name: "", layout_id: -1, par: "72" }],
      holes: Array.from({ length: 18 }, (_, index) => ({
        hole_id: index + 1,
        hole_number: index + 1,
        active: true,
      })),
      divisions: [
        { division_id: 1, name: "MPO", active: true },
        { division_id: 2, name: "FPO", active: false },
        { division_id: 3, name: "MA1", active: true },
        { division_id: 4, name: "FA1", active: false },
        { division_id: 5, name: "MA2", active: true },
        { division_id: 6, name: "FA2", active: false },
        { division_id: 7, name: "MA3", active: false },
        { division_id: 8, name: "FA3", active: false },
        { division_id: 9, name: "MA4", active: false },
        { division_id: 10, name: "FA4", active: false },
      ],
      udiscLeagueURL: "",
      //   venmoUsername: "",
      //   cashappUsername: "",
    },
  });

  const {
    control,
    handleSubmit,
    watch,
    register,
    reset,
    getValues,
    formState,
  } = form;

  const { isLoading, isAuthenticated, user, organization } =
    useKindeBrowserClient();

  // console.log("Org Code:", organization);

  const router = useRouter();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "layouts",
  });

  watch("courseName");
  watch("shortCode");
  watch("city");
  watch("state");
  watch("layouts");
  watch("holes");
  watch("divisions");
  watch("udiscLeagueURL");
  //   watch("venmoUsername");
  //   watch("cashappUsername");

  // console.log(getValues());

  // console.log("Form State:", formState);
  // console.log("Form Errors:", formState.errors);

  const [loading, setLoading] = useState(false);
  const [courseSettings, setCourseSettings] = useState<CourseFormValues>({
    courseName: "",
    shortCode: "",
    city: "",
    state: "",
    layouts: [{ name: "", layout_id: -1, par: "72" }],
    holes: Array.from({ length: 18 }, (_, index) => ({
      hole_id: index + 1,
      hole_number: index + 1,
      active: true,
    })),
    divisions: [
      { division_id: 1, name: "MPO", active: true },
      { division_id: 2, name: "FPO", active: false },
      { division_id: 3, name: "MA1", active: true },
      { division_id: 4, name: "FA1", active: false },
      { division_id: 5, name: "MA2", active: true },
      { division_id: 6, name: "FA2", active: false },
      { division_id: 7, name: "MA3", active: false },
      { division_id: 8, name: "FA3", active: false },
      { division_id: 9, name: "MA4", active: false },
      { division_id: 10, name: "FA4", active: false },
    ],
    udiscLeagueURL: "",
  });

  const [holesDialogOpen, setHolesDialogOpen] = useState(false);
  const [numberOfHoles, setNumberOfHoles] = useState(18);
  const [divisionsDialogOpen, setDivisionsDialogOpen] = useState(false);
  const [divisionDecisionMade, setDivisionDecisionMade] = useState(false);
  const [useDefaultDivisions, setUseDefaultDivisions] = useState(true);
  const [customDivisions, setCustomDivisions] = useState([{ name: "" }]);

  const handleOpenHolesDialog = () => {
    setHolesDialogOpen(true);
  };

  const handleCloseHolesDialog = () => {
    setHolesDialogOpen(false);
  };

  const handleCreateHoles = () => {
    handleAddHoles();
    handleCloseHolesDialog();
  };

  const handleOpenDivisionsDialog = () => {
    setDivisionsDialogOpen(true);
  };

  const handleCloseDivisionsDialog = () => {
    console.log("Closing divisions dialog");
    setDivisionsDialogOpen(false);
    setDivisionDecisionMade(false);
    setUseDefaultDivisions(true);
    setCustomDivisions([{ name: "" }]);
  };

  const handleCreateDivisions = async () => {
    await handleAddDivisions();
    handleCloseDivisionsDialog();
  };

  const addCustomDivision = () => {
    setCustomDivisions([...customDivisions, { name: "" }]);
  };

  const updateCustomDivision = (index: number, value: string) => {
    const updatedDivisions = [...customDivisions];
    updatedDivisions[index].name = value;
    setCustomDivisions(updatedDivisions);
  };

  const handleAddHoles = async () => {
    try {
      const newHoles = await createHoles(organization);
      const updatedCourseSettings = {
        ...courseSettings,
        holes: [...courseSettings.holes, ...newHoles],
      };
      setCourseSettings(updatedCourseSettings);
      reset(updatedCourseSettings); // Reset the form with the updated course settings
      toast({
        title: "Success",
        description: "Holes added successfully",
        variant: "default",
        duration: 3000,
      });
    } catch (error) {
      console.error("Failed to add holes:", error);
      toast({
        title: "Error",
        variant: "destructive",
        description: "Failed to add holes",
        duration: 3000,
      });
    }
  };

  const handleAddDivisions = async () => {
    console.log("Adding divisions...");
    console.log("Use Default Divisions:", useDefaultDivisions);
    console.log("Custom Divisions:", customDivisions);
    try {
      const divisions = useDefaultDivisions
        ? [
            { name: "MPO", active: true },
            { name: "MA1", active: true },
            { name: "MA2", active: true },
            { name: "MA3", active: true },
            { name: "MA4", active: true },
            { name: "FPO", active: true },
            { name: "FA1", active: true },
            { name: "FA2", active: true },
            { name: "FA3", active: true },
            { name: "FA4", active: true },
          ]
        : customDivisions.map((division) => ({ ...division, active: true }));

      console.log("Divisions to add:", divisions);

      const newDivisions = await createDivisions(organization, divisions);
      console.log("New Divisions:", newDivisions);
      const updatedCourseSettings = {
        ...courseSettings,
        divisions: [...courseSettings.divisions, ...newDivisions],
      };
      console.log("Updated Course Settings:", updatedCourseSettings);
      setCourseSettings(updatedCourseSettings);
      reset(updatedCourseSettings); // Reset the form with the updated course settings
      toast({
        title: "Success",
        description: "Divisions added successfully",
        variant: "default",
        duration: 3000,
      });
    } catch (error) {
      console.error("Failed to add divisions:", error);
      toast({
        title: "Error",
        variant: "destructive",
        description: "Failed to add divisions",
        duration: 3000,
      });
    }
  };

  const createHoles = async (orgCode: KindeOrganization) => {
    const response = await fetch(`${TAGS_API_BASE_URL}/api/create-holes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orgCode, numberOfHoles }),
    });

    if (!response.ok) {
      throw new Error("Failed to create holes");
    }

    const holeData = await response.json();
    return holeData.holes;
  };

  const createDivisions = async (
    orgCode: KindeOrganization,
    divisions: { name: string; active: boolean }[]
  ) => {
    const response = await fetch(`${TAGS_API_BASE_URL}/api/create-divisions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orgCode, divisions }),
    });

    if (!response.ok) {
      throw new Error("Failed to create divisions");
    }

    const divisionData = await response.json();
    return divisionData.divisions;
  };

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/");
      return;
    }

    const loadSettings = async () => {
      try {
        if (organization) {
          setLoading(true);
          const data = await fetchCourseSettings(organization);
          console.log("Fetched course settings:", data);
          setCourseSettings(data);
          reset(data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Failed to load settings:", error);
        setLoading(false);
        toast({
          title: "Error",
          variant: "destructive",
          description: "Failed to load course settings",
          duration: 3000,
        });
      }
    };

    loadSettings();
  }, [isLoading, user, organization, router, reset]);

  const onSubmit = async (data: CourseSettingsData) => {
    // console.log("Form Data:", data);

    if (!isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You must be logged in to save settings.",
        duration: 3000,
      });
      return;
    }

    if (!organization) {
      // console.log("Organization:", organization);
      toast({
        title: "Unauthorized",
        description:
          "You must be logged in to an organization to perform this action.",
        duration: 3000,
      });
      return;
    }

    // Inject orgCode into formData before submission
    const dataToSend = {
      ...data,
      orgCode: organization.orgCode,
    };

    try {
      setLoading(true);
      const response = await fetch(
        `${TAGS_API_BASE_URL}/api/save-course-settings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend), // Assuming your backend expects JSON data
        }
      );

      if (!response.ok) {
        setLoading(false);
        throw new Error("Failed to save settings");
      }

      const result = await response.json();
      // console.log("Course settings saved successfully:", result);
      setLoading(false);
      toast({
        title: "Success",
        description: "Course settings saved successfully",
        duration: 3000,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setLoading(false);
      toast({
        title: "Error",
        variant: "destructive",
        description: "Failed to submit the form",
        duration: 3000,
      });
    }
  };

  // if (isLoading && !user) return <div>Loading...</div>;

  return (
    <div className="relative grid grid-cols-1 text-left items-start justify-start gap-4 p-6">
      {loading ? (
        <Skeleton className="w-full h-72" />
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card className="lg:max-w-[800px]">
              <CardHeader className="p-4 lg:p-6">
                <CardTitle>General Course Info</CardTitle>
                <CardDescription className="text-xs">
                  Add general information about the course to be used as default
                  values across the app.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-6 p-4 lg:p-6">
                {/* Course Name */}
                <FormField
                  control={form.control}
                  name="courseName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Course Name" />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Course Short Code */}
                <FormField
                  control={form.control}
                  name="shortCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course Short Code</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Course Short Code (i.e., TRANQ)"
                          onChange={(e) => {
                            e.target.value = e.target.value.toUpperCase();
                            field.onChange(e);
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* City */}
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="City" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                {/* State */}
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="State" />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* UDisc League URL */}
                <FormField
                  control={form.control}
                  name="udiscLeagueURL"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>UDisc League URL</FormLabel>
                      <FormDescription className="text-xs">
                        The URL of the event on UDisc. On Desktop, click the
                        &apos;scores&apos; tab on the event page and then copy
                        the URL. On Mobile, click &apos;View Leaderboard&apos; &
                        then click &apos;Share&apos; to copy the URL.
                      </FormDescription>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="UDisc League URL"
                          onChange={(e) => {
                            field.onChange(e);
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card className="lg:max-w-[800px]">
              <CardHeader className="p-4 lg:p-6">
                <CardTitle>Layouts</CardTitle>
                <CardDescription className="text-xs">
                  Add and remove layouts for this course.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-2 lg:p-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Layout Name</TableHead>
                      <TableHead className="w-[100px]">Par</TableHead>
                      <TableHead className="w-[30px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {fields.map((field, index) => (
                      <TableRow key={field.id}>
                        <TableCell>
                          <Label
                            htmlFor={`layout-name-${index}`}
                            className="sr-only"
                          >
                            Layout Name
                          </Label>
                          <Input
                            id={`layout-name-${index}`}
                            {...register(`layouts.${index}.name`)}
                            placeholder={`Layout ${index + 1}`}
                          />
                        </TableCell>
                        <TableCell>
                          <Label htmlFor={`par-${index}`} className="sr-only">
                            Par
                          </Label>
                          <Input
                            id={`par-${index}`}
                            {...register(`layouts.${index}.par`)}
                            placeholder="Par"
                          />
                        </TableCell>
                        <TableCell>
                          <Button
                            type="button"
                            variant="destructive"
                            className="gap-1"
                            onClick={() => remove(index)}
                          >
                            <X className="h-3.5 w-3.5" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="justify-center border-t p-4">
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  className="gap-1"
                  onClick={() => append({ name: "", par: "-1" })}
                >
                  <PlusCircle className="h-3.5 w-3.5" />
                  Add Layout
                </Button>
              </CardFooter>
            </Card>

            <Card className="lg:max-w-[800px]">
              <CardHeader className="p-4 lg:p-6">
                <CardTitle>Preferred Starting Holes</CardTitle>
                <CardDescription className="text-xs">
                  Select the holes you want to include as defaults for starting
                  positions for each card. If possible, the app will try to only
                  use these holes, while evenly spacing cards to ensure pace of
                  play. <br />
                  <br />
                  <strong>Note:</strong> Each event may override this setting.
                </CardDescription>
              </CardHeader>
              {form.getValues().holes && form.getValues().holes.length > 0 ? (
                <CardContent className="p-2 lg:p-6">
                  {/* Starting Holes */}
                  <FormField
                    control={form.control}
                    name="holes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel></FormLabel>
                        <FormDescription></FormDescription>
                        <FormControl>
                          <Table className="relative">
                            <TableHeader>
                              <TableRow>
                                <TableHead className="min-w-[85px]">
                                  Front 9
                                </TableHead>
                                <TableHead className="w-[30px]">
                                  Action
                                </TableHead>
                                <TableHead className="min-w-[85px]">
                                  Back 9
                                </TableHead>
                                <TableHead className="w-[30px]">
                                  Action
                                </TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {Array.from({ length: 9 }).map((_, index) => (
                                <TableRow key={index}>
                                  {/* Front 9 */}
                                  <TableCell>{`Hole ${field.value[index].hole_number}`}</TableCell>
                                  <TableCell>
                                    <FormField
                                      control={form.control}
                                      name={`holes.${index}.active`}
                                      render={({ field }) => (
                                        <Button
                                          type="button"
                                          variant={
                                            field.value
                                              ? "destructive"
                                              : "secondary"
                                          }
                                          onClick={() => {
                                            const newValue = !field.value;
                                            field.onChange(newValue);
                                          }}
                                        >
                                          {field.value ? (
                                            <X className="h-3.5 w-3.5" />
                                          ) : (
                                            <PlusCircle className="h-3.5 w-3.5" />
                                          )}
                                        </Button>
                                      )}
                                    />
                                  </TableCell>
                                  {/* Back 9 */}
                                  <TableCell>{`Hole ${
                                    field.value[index + 9].hole_number
                                  }`}</TableCell>
                                  <TableCell>
                                    <FormField
                                      control={form.control}
                                      name={`holes.${index + 9}.active`}
                                      render={({ field }) => (
                                        <Button
                                          type="button"
                                          variant={
                                            field.value
                                              ? "destructive"
                                              : "secondary"
                                          }
                                          onClick={() => {
                                            const newValue = !field.value;
                                            field.onChange(newValue);
                                          }}
                                        >
                                          {field.value ? (
                                            <X className="h-3.5 w-3.5" />
                                          ) : (
                                            <PlusCircle className="h-3.5 w-3.5" />
                                          )}
                                        </Button>
                                      )}
                                    />
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              ) : (
                <>
                  <CardContent className="p-2 lg:p-6">
                    <p className="text-sm text-muted-foreground text-center text-red-800">
                      No holes found. Click the button below to add holes.
                    </p>
                  </CardContent>
                  <CardFooter className="justify-center border-t p-4">
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      className="gap-1"
                      onClick={handleOpenHolesDialog}
                    >
                      <PlusCircle className="h-3.5 w-3.5" />
                      Add Holes
                    </Button>
                  </CardFooter>
                </>
              )}
            </Card>

            {/* Venmo and CashApp Usernames */}
            {/* <FormField
            control={form.control}
            name="venmoUsername"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Venmo Username</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Venmo Username" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cashappUsername"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CashApp Username</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="CashApp Username" />
                </FormControl>
              </FormItem>
            )}
          /> */}

            <Card className="lg:max-w-[800px]">
              <CardHeader className="p-4 lg:p-6">
                <CardTitle>Divisions for Tags</CardTitle>
                <CardDescription className="text-xs">
                  Select the divisions you want to include, as defaults, in the
                  tags event
                </CardDescription>
              </CardHeader>
              {form.getValues().divisions &&
              form.getValues().divisions.length > 0 ? (
                <CardContent className="p-2 lg:p-6">
                  <FormField
                    control={form.control}
                    name="divisions"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Table className="relative">
                            <TableHeader>
                              <TableRow>
                                <TableHead>Division Name</TableHead>
                                <TableHead>Action</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {field.value.map((division, index) => (
                                <TableRow key={division.division_id}>
                                  <TableCell>{division.name}</TableCell>
                                  <TableCell>
                                    <FormField
                                      control={form.control}
                                      name={`divisions.${index}.active`}
                                      render={({ field }) => (
                                        <Button
                                          type="button"
                                          variant={
                                            field.value
                                              ? "destructive"
                                              : "secondary"
                                          }
                                          onClick={() => {
                                            const newValue = !field.value;
                                            field.onChange(newValue);
                                          }}
                                        >
                                          {field.value ? (
                                            <X className="h-3.5 w-3.5" />
                                          ) : (
                                            <PlusCircle className="h-3.5 w-3.5" />
                                          )}
                                        </Button>
                                      )}
                                    />
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              ) : (
                <>
                  <CardContent className="p-2 lg:p-6">
                    <p className="text-sm text-muted-foreground text-center text-red-800">
                      No divisions found. Click the button below to add
                      divisions.
                    </p>
                  </CardContent>
                  <CardFooter className="justify-center border-t p-4">
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      className="gap-1"
                      onClick={handleOpenDivisionsDialog}
                    >
                      <PlusCircle className="h-3.5 w-3.5" />
                      Add Divisions
                    </Button>
                  </CardFooter>
                </>
              )}
            </Card>
            <Button type="submit">Save Settings</Button>
          </form>
        </Form>
      )}
      <Dialog open={holesDialogOpen} onOpenChange={setHolesDialogOpen}>
        <DialogContent className="max-w-[90%] lg:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add Holes</DialogTitle>
            <DialogDescription className="text-xs">
              Enter the number of holes you want to add to the course.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              type="number"
              value={numberOfHoles}
              onChange={(e) => setNumberOfHoles(Number(e.target.value))}
              min="1"
              max="36"
              placeholder="Enter number of holes"
            />
          </div>
          <DialogFooter>
            <Button onClick={handleCreateHoles}>Create Holes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog
        open={divisionsDialogOpen}
        onOpenChange={handleCloseDivisionsDialog}
      >
        <DialogContent className="max-w-[90%] lg:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add Divisions</DialogTitle>
            <DialogDescription className="text-xs">
              Select the type of divisions you want to add for user signups.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {!useDefaultDivisions &&
              customDivisions.map((division, index) => (
                <Input
                  key={index}
                  value={division.name}
                  onChange={(e) => updateCustomDivision(index, e.target.value)}
                  placeholder={`Division ${index + 1} name`}
                />
              ))}
            {!useDefaultDivisions && (
              <Button
                variant="ghost"
                className="gap-1"
                onClick={addCustomDivision}
              >
                <PlusCircle className="h-3.5 w-3.5" />
                Add Division
              </Button>
            )}
          </div>
          <DialogFooter>
            {!divisionDecisionMade && (
              <Button
                name="divisionType"
                variant="default"
                onClick={() => {
                  setUseDefaultDivisions(true);
                  setDivisionDecisionMade(true);
                  handleCreateDivisions();
                }}
              >
                Add Default Divisions
              </Button>
            )}
            {!divisionDecisionMade && (
              <Button
                name="divisionType"
                variant="ghost"
                onClick={() => {
                  console.log("Using Custom Divisions");
                  setUseDefaultDivisions(false);
                  setDivisionDecisionMade(true);
                }}
              >
                Add Custom Divisions
              </Button>
            )}
            {divisionDecisionMade && !useDefaultDivisions && (
              <Button onClick={handleCreateDivisions}>Create Divisions</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminTools;
