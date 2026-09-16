import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  Tab,
  TabList,
  Spinner,
  makeStyles,
} from "@fluentui/react-components";
import type { EmployeeFormValues } from "../../types/employee";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addEmployee } from "../employee/employeeSlice";
import { setActiveTab, setSubmitting } from "./formsSlice";
import { createEmployee } from "../../services/employeeApi";
import { PersonalTabForm } from "./PersonalTabForm";
import { ContactTabForm} from "./ContactTabForm";
import { WorkTabForm } from "./WorkTabForm";
import { employeeFormSchema } from "./validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";

const useStyles = makeStyles({
  panel: {
    minHeight: "250px",
    paddingTop: "20px",
  },
  saveButton: {
    marginTop: "18px",
  },
  errorBanner: {
    marginTop: "12px",
    color: "#a4262c",
    fontSize: "14px",
  },
});

const defaultValues: EmployeeFormValues = {
  tab1: { name: "", age: "", gender: "Male" },
  tab2: { email: "", phone: "", address: "", contactMethod: "Email" },
  tab3: { department: "", role: "" },
};


export function TabsPage() {
  const styles = useStyles();
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector((state) => state.forms.activeTab);
  const isSubmitting = useAppSelector((state) => state.forms.isSubmitting);
  const [submitError, setSubmitError] = useState("");

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmployeeFormValues>({
    defaultValues,
    mode: "onTouched",
    resolver: zodResolver(employeeFormSchema),
  });

  const handleTabChange = async (
    nextTab: "personal" | "contact" | "work"
  ) => {
    dispatch(setActiveTab(nextTab));
  };

  const onSubmit = async (values: EmployeeFormValues) => {
    setSubmitError("");
    dispatch(setSubmitting(true));
    try {
      const employee = await createEmployee({
        ...values,
        status: "Active",
        location: "",
        notes: "",
      });

      dispatch(addEmployee(employee));
      reset(defaultValues);
      dispatch(setActiveTab("personal"));
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Something went wrong."
      );
    } finally {
      dispatch(setSubmitting(false));
    }
    console.log("Form submitted with values:", values);
  };

  return (
    <section>
      <TabList
        selectedValue={activeTab}
        onTabSelect={(_, data) =>
          handleTabChange(data.value as "personal" | "contact" | "work")
        }
      >
        <Tab value="personal">Personal</Tab>
        <Tab value="contact">Contact</Tab>
        <Tab value="work">Work</Tab>
      </TabList>

      <div className={styles.panel}>
        {activeTab === "personal" && (
          <PersonalTabForm control={control} errors={errors} />
        )}
        {activeTab === "contact" && (
          <ContactTabForm control={control} errors={errors} />
        )}
        {activeTab === "work" && (
          <WorkTabForm control={control} errors={errors} />
        )}
      </div>

      <Button
        className={styles.saveButton}
        appearance="primary"
        onClick={handleSubmit(onSubmit)}
        disabled={isSubmitting}
      >
        {isSubmitting ? <Spinner size="tiny" /> : "Save All"}
      </Button>

      {submitError && <div className={styles.errorBanner}>{submitError}</div>}
    </section>
  );
}
