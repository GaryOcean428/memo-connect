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
      clients: {
        Row: {
          address: string | null
          city: string | null
          created_at: string
          email: string | null
          id: string
          name: string
          notes: string | null
          phone: string | null
          postal_code: string | null
          state: string | null
          status: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          address?: string | null
          city?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name: string
          notes?: string | null
          phone?: string | null
          postal_code?: string | null
          state?: string | null
          status?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          address?: string | null
          city?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name?: string
          notes?: string | null
          phone?: string | null
          postal_code?: string | null
          state?: string | null
          status?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      commissions: {
        Row: {
          created_at: string
          finance_arrangement_id: string
          id: string
          notes: string | null
          status: string | null
          trail_amount: number | null
          trail_percentage: number | null
          updated_at: string
          upfront_amount: number | null
          upfront_payment_date: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          finance_arrangement_id: string
          id?: string
          notes?: string | null
          status?: string | null
          trail_amount?: number | null
          trail_percentage?: number | null
          updated_at?: string
          upfront_amount?: number | null
          upfront_payment_date?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          finance_arrangement_id?: string
          id?: string
          notes?: string | null
          status?: string | null
          trail_amount?: number | null
          trail_percentage?: number | null
          updated_at?: string
          upfront_amount?: number | null
          upfront_payment_date?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "commissions_finance_arrangement_id_fkey"
            columns: ["finance_arrangement_id"]
            isOneToOne: false
            referencedRelation: "finance_arrangements"
            referencedColumns: ["id"]
          },
        ]
      }
      competency_assessment: {
        Row: {
          assessment_date: string | null
          assessor_name: string | null
          attempt_number: number | null
          competency_unit_id: string
          created_at: string
          evidence_urls: string[] | null
          feedback: string | null
          id: string
          result: string | null
          status: string
          training_contract_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          assessment_date?: string | null
          assessor_name?: string | null
          attempt_number?: number | null
          competency_unit_id: string
          created_at?: string
          evidence_urls?: string[] | null
          feedback?: string | null
          id?: string
          result?: string | null
          status: string
          training_contract_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          assessment_date?: string | null
          assessor_name?: string | null
          attempt_number?: number | null
          competency_unit_id?: string
          created_at?: string
          evidence_urls?: string[] | null
          feedback?: string | null
          id?: string
          result?: string | null
          status?: string
          training_contract_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "competency_assessment_competency_fkey"
            columns: ["competency_unit_id"]
            isOneToOne: false
            referencedRelation: "competency_unit"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "competency_assessment_contract_fkey"
            columns: ["training_contract_id"]
            isOneToOne: false
            referencedRelation: "TrainingContract"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "competency_assessment_user_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      competency_unit: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          nominal_hours: number | null
          prerequisites: string[] | null
          qualification_id: string
          unit_code: string
          unit_name: string
          unit_type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          nominal_hours?: number | null
          prerequisites?: string[] | null
          qualification_id: string
          unit_code: string
          unit_name: string
          unit_type: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          nominal_hours?: number | null
          prerequisites?: string[] | null
          qualification_id?: string
          unit_code?: string
          unit_name?: string
          unit_type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "competency_unit_qualification_fkey"
            columns: ["qualification_id"]
            isOneToOne: false
            referencedRelation: "Qualification"
            referencedColumns: ["id"]
          },
        ]
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
      finance_arrangements: {
        Row: {
          application_date: string | null
          client_id: string
          created_at: string
          id: string
          lender: string | null
          loan_amount: number | null
          loan_type: string | null
          notes: string | null
          referral_id: string | null
          settlement_date: string | null
          status: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          application_date?: string | null
          client_id: string
          created_at?: string
          id?: string
          lender?: string | null
          loan_amount?: number | null
          loan_type?: string | null
          notes?: string | null
          referral_id?: string | null
          settlement_date?: string | null
          status?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          application_date?: string | null
          client_id?: string
          created_at?: string
          id?: string
          lender?: string | null
          loan_amount?: number | null
          loan_type?: string | null
          notes?: string | null
          referral_id?: string | null
          settlement_date?: string | null
          status?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "finance_arrangements_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "finance_arrangements_referral_id_fkey"
            columns: ["referral_id"]
            isOneToOne: false
            referencedRelation: "referrals"
            referencedColumns: ["id"]
          },
        ]
      }
      incentives: {
        Row: {
          amount: number | null
          client_id: string | null
          created_at: string
          delivery_date: string | null
          id: string
          notes: string | null
          referral_id: string | null
          status: string | null
          type: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          amount?: number | null
          client_id?: string | null
          created_at?: string
          delivery_date?: string | null
          id?: string
          notes?: string | null
          referral_id?: string | null
          status?: string | null
          type?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number | null
          client_id?: string | null
          created_at?: string
          delivery_date?: string | null
          id?: string
          notes?: string | null
          referral_id?: string | null
          status?: string | null
          type?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "incentives_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "incentives_referral_id_fkey"
            columns: ["referral_id"]
            isOneToOne: false
            referencedRelation: "referrals"
            referencedColumns: ["id"]
          },
        ]
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
      referrals: {
        Row: {
          client_name: string
          created_at: string
          date: string
          id: string
          notes: string | null
          referrer_id: string | null
          referrer_type: string | null
          source: string
          status: string
          updated_at: string
          user_id: string
          value: number | null
        }
        Insert: {
          client_name: string
          created_at?: string
          date?: string
          id?: string
          notes?: string | null
          referrer_id?: string | null
          referrer_type?: string | null
          source: string
          status: string
          updated_at?: string
          user_id: string
          value?: number | null
        }
        Update: {
          client_name?: string
          created_at?: string
          date?: string
          id?: string
          notes?: string | null
          referrer_id?: string | null
          referrer_type?: string | null
          source?: string
          status?: string
          updated_at?: string
          user_id?: string
          value?: number | null
        }
        Relationships: []
      }
      support_contact: {
        Row: {
          action_items: string[] | null
          contact_date: string
          contact_type: string
          created_at: string
          employer_present: boolean | null
          follow_up_date: string | null
          follow_up_required: boolean | null
          id: string
          notes: string | null
          staff_name: string
          training_discussion: boolean | null
          updated_at: string
          user_id: string
          wellbeing_discussion: boolean | null
        }
        Insert: {
          action_items?: string[] | null
          contact_date: string
          contact_type: string
          created_at?: string
          employer_present?: boolean | null
          follow_up_date?: string | null
          follow_up_required?: boolean | null
          id?: string
          notes?: string | null
          staff_name: string
          training_discussion?: boolean | null
          updated_at?: string
          user_id: string
          wellbeing_discussion?: boolean | null
        }
        Update: {
          action_items?: string[] | null
          contact_date?: string
          contact_type?: string
          created_at?: string
          employer_present?: boolean | null
          follow_up_date?: string | null
          follow_up_required?: boolean | null
          id?: string
          notes?: string | null
          staff_name?: string
          training_discussion?: boolean | null
          updated_at?: string
          user_id?: string
          wellbeing_discussion?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "support_contact_user_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      training_plan_review: {
        Row: {
          action_items: string[] | null
          apprentice_feedback: string | null
          attendance_rating: number | null
          created_at: string
          employer_feedback: string | null
          id: string
          next_review_date: string | null
          notes: string | null
          performance_rating: number | null
          progress: string | null
          review_date: string
          reviewer_name: string
          status: string
          training_contract_id: string
          updated_at: string
        }
        Insert: {
          action_items?: string[] | null
          apprentice_feedback?: string | null
          attendance_rating?: number | null
          created_at?: string
          employer_feedback?: string | null
          id?: string
          next_review_date?: string | null
          notes?: string | null
          performance_rating?: number | null
          progress?: string | null
          review_date: string
          reviewer_name: string
          status: string
          training_contract_id: string
          updated_at?: string
        }
        Update: {
          action_items?: string[] | null
          apprentice_feedback?: string | null
          attendance_rating?: number | null
          created_at?: string
          employer_feedback?: string | null
          id?: string
          next_review_date?: string | null
          notes?: string | null
          performance_rating?: number | null
          progress?: string | null
          review_date?: string
          reviewer_name?: string
          status?: string
          training_contract_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "training_plan_review_contract_fkey"
            columns: ["training_contract_id"]
            isOneToOne: false
            referencedRelation: "TrainingContract"
            referencedColumns: ["id"]
          },
        ]
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
      workplace_inspection: {
        Row: {
          attachments: string[] | null
          created_at: string
          customer_id: string
          findings: string | null
          follow_up_date: string | null
          follow_up_required: boolean | null
          id: string
          inspection_date: string
          inspector_name: string
          recommendations: string | null
          safety_rating: number | null
          status: string
          updated_at: string
        }
        Insert: {
          attachments?: string[] | null
          created_at?: string
          customer_id: string
          findings?: string | null
          follow_up_date?: string | null
          follow_up_required?: boolean | null
          id?: string
          inspection_date: string
          inspector_name: string
          recommendations?: string | null
          safety_rating?: number | null
          status: string
          updated_at?: string
        }
        Update: {
          attachments?: string[] | null
          created_at?: string
          customer_id?: string
          findings?: string | null
          follow_up_date?: string | null
          follow_up_required?: boolean | null
          id?: string
          inspection_date?: string
          inspector_name?: string
          recommendations?: string | null
          safety_rating?: number | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "workplace_inspection_customer_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "Customer"
            referencedColumns: ["id"]
          },
        ]
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
