// pages/api/score.js
import { createClient } from '@supabase/supabase-js';

// Replace with your actual Supabase URL and anonymous key
const SUPABASE_URL = 'https://uyjycyghbdoxbxstedsi.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5anljeWdoYmRveGJ4c3RlZHNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU1MzMyOTEsImV4cCI6MjA0MTEwOTI5MX0.u94whU7iV2ldKuZuHldK5SL_MUWHDw_VjRysOsGa_pw';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { score } = req.body;

    try {
      const { data, error } = await supabase
        .from('scores')
        .insert([{ score }]);

      if (error) {
        return res.status(400).json({ error: error.message });
      }

      res.status(200).json({ data });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
