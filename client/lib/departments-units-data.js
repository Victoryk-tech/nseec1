/* Re-exports for Navbar and other shared consumers */
import { DEPARTMENTS } from "@/components/departments/data";
import { UNITS } from "@/components/units/data";

export { DEPARTMENTS, UNITS };

export const DEPT_NAV_ITEMS = DEPARTMENTS.map(({ short, code, path }) => ({
  label: short,
  code,
  path,
}));

export const UNIT_NAV_ITEMS = UNITS.map(({ short, code, path }) => ({
  label: short,
  code,
  path,
}));
