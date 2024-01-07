import { Check, ChevronsUpDown } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import { ClipLoader } from 'react-spinners';

import { cn } from '@/lib/utils';

import { Button } from './button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from './command';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

type ComboboxProps = PropsWithChildren<{
  placeholder?: string;
  value: string[];
  onSelectChange: (value: string) => void;
  options: { value: string; label: string }[];
  isLoading?: boolean;
}>;

const MultipleCombobox: FC<ComboboxProps & { className?: string }> = ({
  placeholder,
  options,
  value,
  onSelectChange,
  className,
  isLoading = false,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn('min-w-[200px] justify-between', className)}
        >
          {placeholder || 'Select value...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="min-w-[200px] p-0">
        <Command>
          <CommandInput placeholder={'Search...'} />
          <CommandEmpty>No item found.</CommandEmpty>
          {isLoading && (
            <div className={'flex w-full justify-center'}>
              <ClipLoader size={20} />
            </div>
          )}
          {!isLoading && (
            <CommandGroup>
              {options.map((option) => {
                const isSelected = value.includes(option.value);
                return (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={(currentValue: string) => {
                      onSelectChange(currentValue);
                    }}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        isSelected ? 'opacity-100' : 'opacity-0',
                      )}
                    />
                    {option.label}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default MultipleCombobox;
