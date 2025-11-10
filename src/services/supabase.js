import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://wqsxtxaoogwgsvddefmb.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indxc3h0eGFvb2d3Z3N2ZGRlZm1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyNjQzMDUsImV4cCI6MjA3Nzg0MDMwNX0.5eSz2mtE3G1zB4IfCtvOk0jxCASw89H53Ttt4nfF3wI";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
