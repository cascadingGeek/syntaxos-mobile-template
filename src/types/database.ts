/**
 * GENERATED FILE — DO NOT HAND-EDIT.
 *
 * Regenerate with:  supabase gen types typescript --project-id <ref> > src/types/database.ts
 *
 * This is the cross-client contract (doc §2): web and mobile generate the
 * same types from the same schema, so the two clients agree without sharing
 * a workspace package. The starter ships the types for its own `notes` table;
 * provisioning overwrites this file for a generated app.
 */

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
      notes: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          body: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          body?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          body?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<never, never>;
    Functions: Record<never, never>;
    Enums: Record<never, never>;
    CompositeTypes: Record<never, never>;
  };
};
