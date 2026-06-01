import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Trash2 } from 'lucide-react';
import { useTrackerStore } from '../store/useTrackerStore';

interface Feedback {
  id: number;
  user_id: string;
  message: string;
  created_at: string;
}

export default function AdminFeedback() {
  const [reports, setReports] = useState<Feedback[]>([]);
  const { user } = useTrackerStore();

  // Replace this with your actual User ID from Supabase Auth
  const ADMIN_ID = '06391879-d280-472e-b253-7e0685bf1014';

  useEffect(() => {
    if (user?.id === ADMIN_ID) {
      fetchReports();
    }
  }, [user]);

  const fetchReports = async () => {
    const { data, error } = await supabase
      .from('feedback')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching feedback:', error);
      alert(`Error fetching feedback: ${error.message}`);
    } else {
      console.log('Feedback data fetched:', data);
      setReports(data || []);
    }
  };

  const deleteReport = async (id: number) => {
    await supabase.from('feedback').delete().eq('id', id);
    fetchReports();
  };

  if (user?.id !== ADMIN_ID) return <div className="text-center p-10">Access Denied</div>;

  return (
    <div className="glass p-10 rounded-[3rem] shadow-2xl">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-black uppercase tracking-tighter">Feedback Reports</h2>
        <button onClick={fetchReports} className="text-sm font-bold bg-blue-600 text-white px-4 py-2 rounded-xl">Refresh</button>
      </div>
      <div className="space-y-4">
        {reports.map((report) => (
          <div key={report.id} className="p-6 bg-white/40 dark:bg-black/20 rounded-2xl flex justify-between items-center border border-white/10">
            <div>
              <p className="font-bold text-gray-900 dark:text-white">{report.message}</p>
              <p className="text-xs text-gray-500 mt-1">{new Date(report.created_at).toLocaleString()}</p>
            </div>
            <button onClick={() => deleteReport(report.id)} className="text-red-500 hover:text-red-700">
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
