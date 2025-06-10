import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import type { EssayIdea } from '@/lib/supabaseClient';

export const useEssayIdeas = () => {
  const [ideas, setIdeas] = useState<EssayIdea[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchIdeas = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('No authenticated user');
      }

      // First get the student_id
      const { data: student, error: studentError } = await supabase
        .from('students')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (studentError) throw studentError;

      // Then get the essay ideas
      const { data, error } = await supabase
        .from('essay_ideas')
        .select('*')
        .eq('student_id', student.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setIdeas(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const saveIdea = async (idea: Omit<EssayIdea, 'id' | 'created_at'>) => {
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
        .from('essay_ideas')
        .insert({
          ...idea,
          student_id: student.id
        })
        .select()
        .single();

      if (error) throw error;
      setIdeas(prev => [data, ...prev]);
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
    fetchIdeas();
  }, []);

  return {
    ideas,
    loading,
    error,
    saveIdea,
    refreshIdeas: fetchIdeas
  };
}; 