
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.error('Missing Supabase environment variables');
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function queryLeads() {
    const { data, error } = await supabase
        .from('leads_escuela_cuidarte')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching leads:', error);
        return;
    }

    console.log(`--- TOTAL LEADS: ${data.length} ---`);
    console.log('Fecha | Nombre | Email | País');
    console.log('-----------------------------------');
    data.forEach(l => {
        const date = new Date(l.created_at).toLocaleDateString();
        console.log(`${date} | ${l.name} | ${l.email} | ${l.country}`);
    });
}

queryLeads();
