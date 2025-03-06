
import React from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";

interface ReferralsFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
}

export const ReferralsFilter: React.FC<ReferralsFilterProps> = ({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search by name, source, or notes..." 
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="flex gap-2">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="contacted">Contacted</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="lost">Lost</SelectItem>
          </SelectContent>
        </Select>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon" className="h-10 w-10">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Advanced Filters</h4>
                <p className="text-sm text-muted-foreground">
                  Apply additional filters to refine your results.
                </p>
              </div>
              
              <div className="grid gap-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="value-min">Min Value</Label>
                  <Input
                    id="value-min"
                    placeholder="0"
                    className="col-span-2 h-8"
                  />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="value-max">Max Value</Label>
                  <Input
                    id="value-max"
                    placeholder="Any"
                    className="col-span-2 h-8"
                  />
                </div>
                
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="sort">Sort By</Label>
                  <Select>
                    <SelectTrigger id="sort" className="col-span-2 h-8">
                      <SelectValue placeholder="Date (newest)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="date-desc">Date (newest)</SelectItem>
                      <SelectItem value="date-asc">Date (oldest)</SelectItem>
                      <SelectItem value="value-desc">Value (highest)</SelectItem>
                      <SelectItem value="value-asc">Value (lowest)</SelectItem>
                      <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                      <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Button size="sm">Apply Filters</Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
