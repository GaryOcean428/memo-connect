import React from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BaseFieldProps<TFieldValues extends FieldValues = FieldValues> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label: string;
  placeholder?: string;
  description?: string;
  disabled?: boolean;
}

interface TextFieldProps<TFieldValues extends FieldValues = FieldValues> extends BaseFieldProps<TFieldValues> {
  type?: 'text' | 'email' | 'number' | 'password' | 'tel' | 'url';
}

interface TextareaFieldProps<TFieldValues extends FieldValues = FieldValues> extends BaseFieldProps<TFieldValues> {
  rows?: number;
}

interface SelectFieldProps<TFieldValues extends FieldValues = FieldValues> extends BaseFieldProps<TFieldValues> {
  options: Array<{ value: string; label: string }>;
}

export function TextField<TFieldValues extends FieldValues = FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = 'text',
  disabled,
}: TextFieldProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              disabled={disabled}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function TextareaField<TFieldValues extends FieldValues = FieldValues>({
  control,
  name,
  label,
  placeholder,
  rows = 3,
  disabled,
}: TextareaFieldProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea
              placeholder={placeholder}
              rows={rows}
              disabled={disabled}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function SelectField<TFieldValues extends FieldValues = FieldValues>({
  control,
  name,
  label,
  placeholder,
  options,
  disabled,
}: SelectFieldProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
              disabled={disabled}
            >
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}