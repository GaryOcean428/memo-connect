
import React, { useState } from "react";
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Contact, useContacts } from "@/hooks/use-contacts";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

interface ContactSelectorProps {
  value: string;
  onValueChange: (value: string) => void;
  onContactSelect: (contact: Contact | null) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}

export const ContactSelector: React.FC<ContactSelectorProps> = ({
  value,
  onValueChange,
  onContactSelect,
  label = "Referral Source",
  placeholder = "Type a name or select from contacts",
  disabled = false,
}) => {
  const { contacts, isLoading } = useContacts();
  const [open, setOpen] = useState(false);
  
  // When a contact is selected from the dropdown
  const handleContactSelect = (contactId: string) => {
    const selectedContact = contacts.find(c => c.id === contactId);
    if (selectedContact) {
      onValueChange(selectedContact.name);
      onContactSelect(selectedContact);
    }
    setOpen(false);
  };

  // When the input value changes directly
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onValueChange(e.target.value);
    onContactSelect(null); // Clear selected contact when typing manually
  };

  return (
    <div className="relative">
      <div className="flex gap-2">
        <div className="flex-1">
          <Input
            value={value}
            onChange={handleInputChange}
            placeholder={placeholder}
            disabled={disabled}
          />
        </div>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-10 p-0"
              disabled={disabled || isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] p-0">
            <Command>
              <CommandInput placeholder="Search contacts..." />
              <CommandList>
                <CommandEmpty>No contacts found.</CommandEmpty>
                <CommandGroup heading="Contacts">
                  {contacts.map((contact) => (
                    <CommandItem
                      key={contact.id}
                      value={contact.id}
                      onSelect={handleContactSelect}
                    >
                      <div className="flex flex-col">
                        <span>{contact.name}</span>
                        {contact.email && (
                          <span className="text-xs text-muted-foreground">{contact.email}</span>
                        )}
                      </div>
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4",
                          value === contact.name ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
