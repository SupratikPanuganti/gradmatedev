import { supabase } from './supabaseClient';

export const uploadResume = async (file: File, userId: string) => {
  try {
    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from('resumes')
      .upload(`${userId}/resume.pdf`, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (error) throw error;

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('resumes')
      .getPublicUrl(`${userId}/resume.pdf`);

    // Update student record with resume URL
    const { error: updateError } = await supabase
      .from('students')
      .update({ resume_url: publicUrl })
      .eq('user_id', userId);

    if (updateError) throw updateError;

    return { success: true, url: publicUrl };
  } catch (error) {
    console.error('Error uploading resume:', error);
    return { success: false, error };
  }
};

export const uploadEssay = async (file: File, userId: string, essayName: string) => {
  try {
    const { data, error } = await supabase.storage
      .from('essays')
      .upload(`${userId}/${essayName}.pdf`, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from('essays')
      .getPublicUrl(`${userId}/${essayName}.pdf`);

    return { success: true, url: publicUrl };
  } catch (error) {
    console.error('Error uploading essay:', error);
    return { success: false, error };
  }
};

export const getResumeUrl = async (userId: string) => {
  try {
    const { data: { publicUrl } } = supabase.storage
      .from('resumes')
      .getPublicUrl(`${userId}/resume.pdf`);

    return { success: true, url: publicUrl };
  } catch (error) {
    console.error('Error getting resume URL:', error);
    return { success: false, error };
  }
}; 