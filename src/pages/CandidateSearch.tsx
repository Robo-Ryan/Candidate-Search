import { useState, useEffect } from 'react';
import { searchGithub } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCandidates = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await searchGithub();
      console.log('Fetched candidates:', data);
      setCandidates(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch candidates');
      console.error('Fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  const handleSaveCandidate = (candidate: Candidate) => {
    const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    if (!savedCandidates.some((saved: Candidate) => saved.id === candidate.id)) {
      localStorage.setItem('savedCandidates', JSON.stringify([...savedCandidates, candidate]));
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Search Candidates</h1>
      <button onClick={fetchCandidates}>Refresh Candidates</button>
      
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
        {candidates.map((candidate) => (
          <div key={candidate.id} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
            <img src={candidate.avatar_url} alt={candidate.login} style={{ width: '100%', borderRadius: '4px' }} />
            <h3>{candidate.login}</h3>
            <button 
              onClick={() => handleSaveCandidate(candidate)}
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
            >
              Save Candidate
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CandidateSearch;
