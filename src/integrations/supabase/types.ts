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
      app_configs: {
        Row: {
          bg_color: string | null
          category: string | null
          color: string | null
          created_at: string | null
          description: string | null
          details: string | null
          id: string
          image_url: string | null
          is_featured: boolean | null
          name: string
          sort_order: number | null
          updated_at: string | null
        }
        Insert: {
          bg_color?: string | null
          category?: string | null
          color?: string | null
          created_at?: string | null
          description?: string | null
          details?: string | null
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          name: string
          sort_order?: number | null
          updated_at?: string | null
        }
        Update: {
          bg_color?: string | null
          category?: string | null
          color?: string | null
          created_at?: string | null
          description?: string | null
          details?: string | null
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          name?: string
          sort_order?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      page_configs: {
        Row: {
          banner_image: string | null
          content: Json | null
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          page_name: string
          title: string
          updated_at: string | null
        }
        Insert: {
          banner_image?: string | null
          content?: Json | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          page_name: string
          title: string
          updated_at?: string | null
        }
        Update: {
          banner_image?: string | null
          content?: Json | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          page_name?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          id: string
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
      rel_role_perm: {
        Row: {
          created_at: string | null
          created_by: string | null
          id: string
          perm_id: string
          role_id: string
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          perm_id: string
          role_id: string
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          perm_id?: string
          role_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "rel_role_perm_perm_id_fkey"
            columns: ["perm_id"]
            isOneToOne: false
            referencedRelation: "sys_perms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rel_role_perm_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "sys_roles"
            referencedColumns: ["id"]
          },
        ]
      }
      rel_user_role: {
        Row: {
          created_at: string | null
          created_by: string | null
          id: string
          role_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          role_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          role_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "rel_user_role_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "sys_roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rel_user_role_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "sys_users"
            referencedColumns: ["id"]
          },
        ]
      }
      sys_perms: {
        Row: {
          component: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          icon: string | null
          id: string
          parent_id: string | null
          path: string | null
          perm_code: string
          perm_name: string
          perm_type: string | null
          sort_order: number | null
          status: number | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          component?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          parent_id?: string | null
          path?: string | null
          perm_code: string
          perm_name: string
          perm_type?: string | null
          sort_order?: number | null
          status?: number | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          component?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          parent_id?: string | null
          path?: string | null
          perm_code?: string
          perm_name?: string
          perm_type?: string | null
          sort_order?: number | null
          status?: number | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sys_perms_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "sys_perms"
            referencedColumns: ["id"]
          },
        ]
      }
      sys_roles: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          role_code: string
          role_name: string
          sort_order: number | null
          status: number | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          role_code: string
          role_name: string
          sort_order?: number | null
          status?: number | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          role_code?: string
          role_name?: string
          sort_order?: number | null
          status?: number | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: []
      }
      sys_users: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          created_by: string | null
          email: string
          id: string
          password_hash: string
          phone: string | null
          real_name: string | null
          status: number | null
          updated_at: string | null
          updated_by: string | null
          username: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          created_by?: string | null
          email: string
          id?: string
          password_hash: string
          phone?: string | null
          real_name?: string | null
          status?: number | null
          updated_at?: string | null
          updated_by?: string | null
          username: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          created_by?: string | null
          email?: string
          id?: string
          password_hash?: string
          phone?: string | null
          real_name?: string | null
          status?: number | null
          updated_at?: string | null
          updated_by?: string | null
          username?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
