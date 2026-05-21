import { ComboboxOption } from "../components/common/Combobox/Combobox";

// ProgramPlan is not available via the typelist API
export const PROGRAM_PLAN_OPTIONS: ComboboxOption[] = [
  { code: "standard", name: "Standard" },
  { code: "preferred", name: "Preferred" },
  { code: "non_standard", name: "Non-Standard" },
];
