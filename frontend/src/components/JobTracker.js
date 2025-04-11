import { useState, useEffect } from 'react';

const JobTracker = () => {
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState('All');
  const [formData, setFormData] = useState({
    company: '', role: '', status: 'Applied', link: ''
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const res = await fetch('https://your-backend-url/api/jobs');
    const data = await res.json();
    setJobs(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('https://your-backend-url/api/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, appliedDate: new Date() }),
    });
    setFormData({ company: '', role: '', status: 'Applied', link: '' });
    fetchJobs();
  };

  const updateStatus = async (id, status) => {
    await fetch(`https://your-backend-url/api/jobs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    fetchJobs();
  };

  const deleteJob = async (id) => {
    await fetch(`https://your-backend-url/api/jobs/${id}`, {
      method: 'DELETE',
    });
    fetchJobs();
  };

  const filteredJobs = filter === 'All' ? jobs : jobs.filter(job => job.status === filter);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Student Job Tracker</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Company"
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Role"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          className="border p-2 mr-2"
        />
        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          className="border p-2 mr-2"
        >
          <option>Applied</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>
        <input
          type="text"
          placeholder="Link"
          value={formData.link}
          onChange={(e) => setFormData({ ...formData, link: e.target.value })}
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add Job
        </button>
      </form>

      <div className="mb-4">
        <label className="mr-2">Filter by Status:</label>
        <select onChange={(e) => setFilter(e.target.value)} className="border p-2">
          <option>All</option>
          <option>Applied</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredJobs.map(job => (
          <div key={job._id} className="border p-4 rounded">
            <p><strong>{job.company}</strong> - {job.role}</p>
            <p>Status: {job.status}</p>
            <p>Date: {new Date(job.appliedDate).toLocaleDateString()}</p>
            <a href={job.link} target="_blank" className="text-blue-500">Link</a>
            <div className="mt-2">
              <select
                value={job.status}
                onChange={(e) => updateStatus(job._id, e.target.value)}
                className="border p-1 mr-2"
              >
                <option>Applied</option>
                <option>Interview</option>
                <option>Offer</option>
                <option>Rejected</option>
              </select>
              <button
                onClick={() => deleteJob(job._id)}
                className="bg-red-500 text-white p-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobTracker;
