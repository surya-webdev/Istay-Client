const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://syfvywhrdffjtzqcthck.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN5ZnZ5d2hyZGZmanR6cWN0aGNrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxNDYzNTUxMiwiZXhwIjoyMDMwMjExNTEyfQ.ViZrwu1JXa_cSnlhWK-p8-MJHGZJlv9q1e-8rrri8s0";

export const supabase = createClient(supabaseUrl, supabaseKey);
