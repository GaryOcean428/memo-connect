export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      _prisma_migrations: {
        Row: {
          applied_steps_count: number
          checksum: string
          finished_at: string | null
          id: string
          logs: string | null
          migration_name: string
          rolled_back_at: string | null
          started_at: string
        }
        Insert: {
          applied_steps_count?: number
          checksum: string
          finished_at?: string | null
          id: string
          logs?: string | null
          migration_name: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Update: {
          applied_steps_count?: number
          checksum?: string
          finished_at?: string | null
          id?: string
          logs?: string | null
          migration_name?: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Relationships: []
      }
      Customer: {
        Row: {
          apprentice_capacity: number | null
          company: string | null
          created_at: string
          created_by: string
          email: string | null
          equipment_provided: string[] | null
          id: string
          name: string
          notes: string | null
          phone: string | null
          previous_apprentice_count: number | null
          professional_indemnity_expiry: string | null
          professional_indemnity_insurance: string | null
          public_liability_expiry: string | null
          public_liability_insurance: string | null
          suitable_for_first_years: boolean | null
          supervision_ratio: string | null
          supervisor_qualifications: Json | null
          updated_at: string
          updated_by: string
          work_cover_expiry_date: string | null
          work_cover_policy_number: string | null
          workplace_health_safety_policy: boolean | null
          workplace_induction_process: string | null
        }
        Insert: {
          apprentice_capacity?: number | null
          company?: string | null
          created_at?: string
          created_by: string
          email?: string | null
          equipment_provided?: string[] | null
          id: string
          name: string
          notes?: string | null
          phone?: string | null
          previous_apprentice_count?: number | null
          professional_indemnity_expiry?: string | null
          professional_indemnity_insurance?: string | null
          public_liability_expiry?: string | null
          public_liability_insurance?: string | null
          suitable_for_first_years?: boolean | null
          supervision_ratio?: string | null
          supervisor_qualifications?: Json | null
          updated_at: string
          updated_by: string
          work_cover_expiry_date?: string | null
          work_cover_policy_number?: string | null
          workplace_health_safety_policy?: boolean | null
          workplace_induction_process?: string | null
        }
        Update: {
          apprentice_capacity?: number | null
          company?: string | null
          created_at?: string
          created_by?: string
          email?: string | null
          equipment_provided?: string[] | null
          id?: string
          name?: string
          notes?: string | null
          phone?: string | null
          previous_apprentice_count?: number | null
          professional_indemnity_expiry?: string | null
          professional_indemnity_insurance?: string | null
          public_liability_expiry?: string | null
          public_liability_insurance?: string | null
          suitable_for_first_years?: boolean | null
          supervision_ratio?: string | null
          supervisor_qualifications?: Json | null
          updated_at?: string
          updated_by?: string
          work_cover_expiry_date?: string | null
          work_cover_policy_number?: string | null
          workplace_health_safety_policy?: boolean | null
          workplace_induction_process?: string | null
        }
        Relationships: []
      }
      customers: {
        Row: {
          address: string | null
          city: string | null
          company: string | null
          country: string | null
          created_at: string
          email: string | null
          id: string
          metadata: Json | null
          name: string | null
          notes: string | null
          phone: string | null
          postal_code: string | null
          search_vector: unknown | null
          state: string | null
          status: string | null
          tags: string[] | null
          title: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          company?: string | null
          country?: string | null
          created_at?: string
          email?: string | null
          id?: string
          metadata?: Json | null
          name?: string | null
          notes?: string | null
          phone?: string | null
          postal_code?: string | null
          search_vector?: unknown | null
          state?: string | null
          status?: string | null
          tags?: string[] | null
          title?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          company?: string | null
          country?: string | null
          created_at?: string
          email?: string | null
          id?: string
          metadata?: Json | null
          name?: string | null
          notes?: string | null
          phone?: string | null
          postal_code?: string | null
          search_vector?: unknown | null
          state?: string | null
          status?: string | null
          tags?: string[] | null
          title?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      notes: {
        Row: {
          created_at: string
          id: number
          title: string
        }
        Insert: {
          created_at?: string
          id?: never
          title: string
        }
        Update: {
          created_at?: string
          id?: never
          title?: string
        }
        Relationships: []
      }
      organizations: {
        Row: {
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      Qualification: {
        Row: {
          certLevel: string | null
          code: string
          core_units_count: number | null
          created_at: string
          delivery_mode: string | null
          description: string | null
          elective_units_count: number | null
          id: string
          industry_demand_rating: number | null
          isActive: boolean
          license_requirements: string[] | null
          name: string
          nationalCode: string | null
          nominal_hours: number | null
          qualification_level: string | null
          qualification_url: string | null
          regulatory_requirements: string[] | null
          trainingPackage: string | null
          updated_at: string
        }
        Insert: {
          certLevel?: string | null
          code: string
          core_units_count?: number | null
          created_at?: string
          delivery_mode?: string | null
          description?: string | null
          elective_units_count?: number | null
          id?: string
          industry_demand_rating?: number | null
          isActive?: boolean
          license_requirements?: string[] | null
          name: string
          nationalCode?: string | null
          nominal_hours?: number | null
          qualification_level?: string | null
          qualification_url?: string | null
          regulatory_requirements?: string[] | null
          trainingPackage?: string | null
          updated_at?: string
        }
        Update: {
          certLevel?: string | null
          code?: string
          core_units_count?: number | null
          created_at?: string
          delivery_mode?: string | null
          description?: string | null
          elective_units_count?: number | null
          id?: string
          industry_demand_rating?: number | null
          isActive?: boolean
          license_requirements?: string[] | null
          name?: string
          nationalCode?: string | null
          nominal_hours?: number | null
          qualification_level?: string | null
          qualification_url?: string | null
          regulatory_requirements?: string[] | null
          trainingPackage?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      TrainingContract: {
        Row: {
          contract_identifier: string | null
          created_at: string
          eligibleForFunding: boolean
          expiryDate: string
          federal_funded: boolean | null
          fee_payment_schedule: Json | null
          funding_source_details: string | null
          hoursPerWeek: number
          id: string
          isCustodial: boolean
          isExistingWorker: boolean
          isSchoolBased: boolean
          mentorship_details: Json | null
          nomination_number: string | null
          probation_completion_confirmed: boolean | null
          qualificationId: string | null
          required_resources: string[] | null
          startDate: string
          state_funded: boolean | null
          state_training_authority: string | null
          status: string
          termMonths: number
          training_fee: number | null
          training_plan_approval_date: string | null
          training_plan_approved: boolean | null
          updated_at: string
          variation_history: Json | null
          worksite: string | null
          worksiteAddress: string | null
        }
        Insert: {
          contract_identifier?: string | null
          created_at?: string
          eligibleForFunding: boolean
          expiryDate: string
          federal_funded?: boolean | null
          fee_payment_schedule?: Json | null
          funding_source_details?: string | null
          hoursPerWeek: number
          id?: string
          isCustodial: boolean
          isExistingWorker: boolean
          isSchoolBased: boolean
          mentorship_details?: Json | null
          nomination_number?: string | null
          probation_completion_confirmed?: boolean | null
          qualificationId?: string | null
          required_resources?: string[] | null
          startDate: string
          state_funded?: boolean | null
          state_training_authority?: string | null
          status: string
          termMonths: number
          training_fee?: number | null
          training_plan_approval_date?: string | null
          training_plan_approved?: boolean | null
          updated_at?: string
          variation_history?: Json | null
          worksite?: string | null
          worksiteAddress?: string | null
        }
        Update: {
          contract_identifier?: string | null
          created_at?: string
          eligibleForFunding?: boolean
          expiryDate?: string
          federal_funded?: boolean | null
          fee_payment_schedule?: Json | null
          funding_source_details?: string | null
          hoursPerWeek?: number
          id?: string
          isCustodial?: boolean
          isExistingWorker?: boolean
          isSchoolBased?: boolean
          mentorship_details?: Json | null
          nomination_number?: string | null
          probation_completion_confirmed?: boolean | null
          qualificationId?: string | null
          required_resources?: string[] | null
          startDate?: string
          state_funded?: boolean | null
          state_training_authority?: string | null
          status?: string
          termMonths?: number
          training_fee?: number | null
          training_plan_approval_date?: string | null
          training_plan_approved?: boolean | null
          updated_at?: string
          variation_history?: Json | null
          worksite?: string | null
          worksiteAddress?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "TrainingContract_qualificationId_fkey"
            columns: ["qualificationId"]
            isOneToOne: false
            referencedRelation: "Qualification"
            referencedColumns: ["id"]
          },
        ]
      }
      User: {
        Row: {
          blue_card_expiry: string | null
          blue_card_number: string | null
          created_at: string
          disability_details: string | null
          email: string
          employment_history: Json | null
          english_proficiency: string | null
          funding_eligibility: Json | null
          id: string
          name: string | null
          numeracy_level: string | null
          preferred_industry: string[] | null
          prior_qualifications: string[] | null
          relocation_willing: boolean | null
          support_requirements: string | null
          updated_at: string
          visa_expiry: string | null
          visa_status: string | null
        }
        Insert: {
          blue_card_expiry?: string | null
          blue_card_number?: string | null
          created_at?: string
          disability_details?: string | null
          email: string
          employment_history?: Json | null
          english_proficiency?: string | null
          funding_eligibility?: Json | null
          id: string
          name?: string | null
          numeracy_level?: string | null
          preferred_industry?: string[] | null
          prior_qualifications?: string[] | null
          relocation_willing?: boolean | null
          support_requirements?: string | null
          updated_at: string
          visa_expiry?: string | null
          visa_status?: string | null
        }
        Update: {
          blue_card_expiry?: string | null
          blue_card_number?: string | null
          created_at?: string
          disability_details?: string | null
          email?: string
          employment_history?: Json | null
          english_proficiency?: string | null
          funding_eligibility?: Json | null
          id?: string
          name?: string | null
          numeracy_level?: string | null
          preferred_industry?: string[] | null
          prior_qualifications?: string[] | null
          relocation_willing?: boolean | null
          support_requirements?: string | null
          updated_at?: string
          visa_expiry?: string | null
          visa_status?: string | null
        }
        Relationships: []
      }
      user_organizations: {
        Row: {
          created_at: string | null
          id: string
          org_id: string
          role: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          org_id: string
          role: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          org_id?: string
          role?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_organizations_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      bypass_rls_for_user:
        | {
            Args: Record<PropertyKey, never>
            Returns: undefined
          }
        | {
            Args: {
              input_user_id: string
            }
            Returns: undefined
          }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
