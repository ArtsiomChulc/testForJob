export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            cardShop: {
                Row: {
                    created_at: string
                    description: string | null
                    id: number
                    img: Json | null
                }
                Insert: {
                    created_at?: string
                    description?: string | null
                    id?: number
                    img?: Json | null
                }
                Update: {
                    created_at?: string
                    description?: string | null
                    id?: number
                    img?: Json | null
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


// export type Database = {
//   public: {
//     Tables: {
//       cardShop: {
//         Row: {
//           created_at: string;
//           description: string | null;
//           id: number;
//           img: string | null;
//         };
//         Insert: Partial<{
//           created_at: string;
//           description: string | null;
//           id: number;
//           img: string | null;
//         }>;
//         Update: Partial<{
//           created_at: string;
//           description: string | null;
//           id: number;
//           img: string | null;
//         }>;
//         Relationships: never[];
//       };
//     };
//     Views: {
//       [key in never]: never;
//     };
//     Functions: {
//       [key in never]: never;
//     };
//     Enums: {
//       [key in never]: never;
//     };
//     CompositeTypes: {
//       [key in never]: never;
//     };
//   };
// };