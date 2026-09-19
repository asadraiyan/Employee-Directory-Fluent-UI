import { useEffect, useState } from "react";
import { useForm, type FieldErrors } from "react-hook-form";
import {
  Button,
  Tab,
  TabList,
  Spinner,
  makeStyles,
} from "@fluentui/react-components";
import type { EmployeeFormValues } from "../../types/employee";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addEmployee, updateEmployee as updateEmployeeInStore } from "../employee/employeeSlice";
import { setActiveTab, setSelectedEmployeeId, setSubmitting } from "./formsSlice";
import { createEmployee, updateEmployee } from "../../services/employeeApi";
import { PersonalTabForm } from "./PersonalTabForm";
import { ContactTabForm } from "./ContactTabForm";
import { WorkTabForm } from "./WorkTabForm";
import { employeeFormSchema } from "./validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import useAppToast from "../../hooks/useAppToast";

const useStyles = makeStyles({
  panel: {
    minHeight: "250px",
    paddingTop: "20px",
  },
  hiddenPanel: {
    display: "none",
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
  tab3: { department: "", role: "", state: "", city: "" },
};


export function TabsPage() {
  const styles = useStyles();
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector((state) => state.forms.activeTab);
  const isSubmitting = useAppSelector((state) => state.forms.isSubmitting);
  const selectedEmployeeId = useAppSelector(
    (state) => state.forms.selectedEmployeeId
  );
  const selectedEmployee = useAppSelector((state) =>
    state.employees.items.find((employee) => employee.id === selectedEmployeeId)
  );
  const [submitError, setSubmitError] = useState("");
  const {showSuccess, showError} = useAppToast(); 

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<EmployeeFormValues>({
    defaultValues,
    shouldUnregister: false,
    mode: "onTouched",
    resolver: zodResolver(employeeFormSchema),
  });

  useEffect(() => {
    reset(selectedEmployee ?? defaultValues);
  }, [reset, selectedEmployee]);

  useEffect(() => {
    if (submitError && Object.keys(errors).length === 0) {
      setSubmitError("");
    }
  }, [errors]);

  const handleTabChange = async (
    nextTab: "personal" | "contact" | "work"
  ) => {
    dispatch(setActiveTab(nextTab));
  };

  const onSubmit = async (values: EmployeeFormValues) => {
    setSubmitError("");
    dispatch(setSubmitting(true));
    try {
      const payload = {
        ...values,
        status: "Active",
      } as const;

      if (selectedEmployeeId === null) {
        const employee = await createEmployee(payload);
        dispatch(addEmployee(employee));
      } else {
        const employee = await updateEmployee(selectedEmployeeId, payload);
        dispatch(updateEmployeeInStore(employee));
      }

      showSuccess(
        selectedEmployeeId === null
          ? "Employee data saved successfully."
          : "Employee data updated successfully."
      );
      reset(defaultValues);
      dispatch(setSelectedEmployeeId(null));
      dispatch(setActiveTab("personal"));
    } catch (error) {
      showError("Failed to save employee data.");
      setSubmitError(
        error instanceof Error ? error.message : "Something went wrong."
      );
    } finally {
      dispatch(setSubmitting(false));
    }
    console.log("Form submitted with values:", values);
  };

  const onInvalidSubmit = (validationErrors: FieldErrors<EmployeeFormValues>) => {
    const invalidTabs = [
      validationErrors.tab1 && "Personal",
      validationErrors.tab2 && "Contact",
      validationErrors.tab3 && "Work",
    ].filter(Boolean);

    setSubmitError(
      `Please complete the required fields in the ${invalidTabs.join(
        ", "
      )} tab${invalidTabs.length === 1 ? "" : "s"} before saving.`
    );
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
        <div className={activeTab === "personal" ? undefined : styles.hiddenPanel}>
          <PersonalTabForm control={control} errors={errors} />
        </div>
        <div className={activeTab === "contact" ? undefined : styles.hiddenPanel}>
          <ContactTabForm control={control} errors={errors} />
        </div>
        <div className={activeTab === "work" ? undefined : styles.hiddenPanel}>
          <WorkTabForm control={control} errors={errors} setValue={setValue} />
        </div>
      </div>

      <Button
        className={styles.saveButton}
        appearance="primary"
        onClick={handleSubmit(onSubmit, onInvalidSubmit)}
        disabled={isSubmitting}
      >
        {isSubmitting ? <Spinner size="tiny" /> : "Save All"}
      </Button>

      {submitError && <div className={styles.errorBanner}>{submitError}</div>}
    </section>
  );
}
