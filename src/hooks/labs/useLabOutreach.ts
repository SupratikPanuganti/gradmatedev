import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import type { OutreachLog, Lab, Professor } from '@/lib/supabaseClient';

export const useLabOutreach = () => {
  const [outreachLogs, setOutreachLogs] = useState<OutreachLog[]>([]);
  const [labs, setLabs] = useState<Lab[]>([]);
  const [professors, setProfessors] = useState<Professor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOutreachLogs = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('No authenticated user');
      }

      // Get student_id
      const { data: student, error: studentError } = await supabase
        .from('students')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (studentError) throw studentError;

      // Get outreach logs
      const { data, error } = await supabase
        .from('outreach_logs')
        .select(`
          *,
          labs (*),
          professors (*)
        `)
        .eq('student_id', student.id)
        .order('sent_at', { ascending: false });

      if (error) throw error;
      setOutreachLogs(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const fetchLabs = async () => {
    try {
      const { data, error } = await supabase
        .from('labs')
        .select('*')
        .order('name');

      if (error) throw error;
      setLabs(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const fetchProfessors = async (labId: string) => {
    try {
      const { data, error } = await supabase
        .from('professors')
        .select('*')
        .eq('lab_id', labId)
        .order('name');

      if (error) throw error;
      setProfessors(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const logOutreach = async (labId: string, professorId: string, message: string) => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('No authenticated user');
      }

      // Get student_id
      const { data: student, error: studentError } = await supabase
        .from('students')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (studentError) throw studentError;

      const { data, error } = await supabase
        .from('outreach_logs')
        .insert({
          student_id: student.id,
          lab_id: labId,
          professor_id: professorId,
          message
        })
        .select()
        .single();

      if (error) throw error;
      setOutreachLogs(prev => [data, ...prev]);
      return { success: true, data };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOutreachLogs();
    fetchLabs();
  }, []);

  return {
    outreachLogs,
    labs,
    professors,
    loading,
    error,
    logOutreach,
    fetchProfessors,
    refreshOutreachLogs: fetchOutreachLogs
  };
}; 