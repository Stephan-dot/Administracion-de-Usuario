import {
  Field,
  FieldLabel,
} from "./ui/field";

type FilterProps = {
  value: string;
  onValueChange: (value: string) => void;
};

export function Filter({ value, onValueChange }: FilterProps) {
  return (
    <Field className="max-w-sm">
      <FieldLabel htmlFor="user-name-filter">Filtrar por nombre</FieldLabel>
      <input
        id="user-name-filter"
        type="search"
        value={value}
        onChange={(event) => onValueChange(event.target.value)}
        placeholder="Escribe un nombre..."
        className="h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
      />
    </Field>
  );
}
