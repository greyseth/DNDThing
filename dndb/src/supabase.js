import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://voetaqjhoxmwkexnbmqj.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvZXRhcWpob3htd2tleG5ibXFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ1NDMwNDUsImV4cCI6MTk5MDExOTA0NX0.eNpVLK11jcZJBJMQcqavRBMvjBmrETxqpxt7Ee0GdO8";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
