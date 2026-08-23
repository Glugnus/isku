export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          username: string;
          avatar_url: string | null;
          stories_shared: number;
        };
        Insert: {
          id: string;
          created_at?: string;
          updated_at?: string;
          username: string;
          avatar_url?: string | null;
          stories_shared?: number;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          username?: string;
          avatar_url?: string | null;
          stories_shared?: number;
        };
        Relationships: [];
      };
      matches: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          created_by: string;
          sport: string;
          format: number;
          mode: "empire" | "quick";
          status: "planned" | "ongoing" | "completed";
          location: string | null;
          scheduled_at: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          created_by: string;
          sport?: string;
          format?: number;
          mode?: "empire" | "quick";
          status?: "planned" | "ongoing" | "completed";
          location?: string | null;
          scheduled_at?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          created_by?: string;
          sport?: string;
          format?: number;
          mode?: "empire" | "quick";
          status?: "planned" | "ongoing" | "completed";
          location?: string | null;
          scheduled_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "matches_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      match_participants: {
        Row: {
          id: number;
          created_at: string;
          updated_at: string;
          match_id: string;
          profile_id: string | null;
          guest_name: string | null;
          team: number;
        };
        Insert: {
          id?: never;
          created_at?: string;
          updated_at?: string;
          match_id: string;
          profile_id?: string | null;
          guest_name?: string | null;
          team?: number;
        };
        Update: {
          id?: never;
          created_at?: string;
          updated_at?: string;
          match_id?: string;
          profile_id?: string | null;
          guest_name?: string | null;
          team?: number;
        };
        Relationships: [
          {
            foreignKeyName: "match_participants_match_id_fkey";
            columns: ["match_id"];
            isOneToOne: false;
            referencedRelation: "matches";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "match_participants_profile_id_fkey";
            columns: ["profile_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      match_sets: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          match_id: string;
          set_number: number;
          score_team_1: number;
          score_team_2: number;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          match_id: string;
          set_number?: number;
          score_team_1?: number;
          score_team_2?: number;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          match_id?: string;
          set_number?: number;
          score_team_1?: number;
          score_team_2?: number;
        };
        Relationships: [
          {
            foreignKeyName: "match_sets_match_id_fkey";
            columns: ["match_id"];
            isOneToOne: false;
            referencedRelation: "matches";
            referencedColumns: ["id"];
          },
        ];
      };
      match_points: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          set_id: string;
          point_number: number;
          scored_by_team: number;
          server_team: number;
          type: "unforced_error" | "winner" | null;
          score_team_1: number;
          score_team_2: number;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          set_id: string;
          point_number?: number;
          scored_by_team: number;
          server_team: number;
          type?: "unforced_error" | "winner" | null;
          score_team_1: number;
          score_team_2: number;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          set_id?: string;
          point_number?: number;
          scored_by_team?: number;
          server_team?: number;
          type?: "unforced_error" | "winner" | null;
          score_team_1?: number;
          score_team_2?: number;
        };
        Relationships: [
          {
            foreignKeyName: "match_points_set_id_fkey";
            columns: ["set_id"];
            isOneToOne: false;
            referencedRelation: "match_sets";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      increment_stories_shared: {
        Args: {
          user_id: string;
        };
        Returns: undefined;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

// Helpers pratiques pour typer les composants et hooks
export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
export type TablesInsert<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];
export type TablesUpdate<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"];
