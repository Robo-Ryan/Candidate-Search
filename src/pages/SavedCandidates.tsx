import { useState, useEffect } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    setSavedCandidates(saved);
  }, []);

  const handleRemoveCandidate = (candidateId: number) => {
    const updated = savedCandidates.filter(candidate => candidate.id !== candidateId);
    localStorage.setItem('savedCandidates', JSON.stringify(updated));
    setSavedCandidates(updated);
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Saved Candidates</h1>
      
      {savedCandidates.length === 0 ? (
        <p>No saved candidates yet.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
          {savedCandidates.map((candidate) => (
            <div key={candidate.id} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
              <img src={candidate.avatar_url} alt={candidate.login} style={{ width: '100%', borderRadius: '4px' }} />
              <h3>{candidate.login}</h3>
              <button 
                onClick={() => handleRemoveCandidate(candidate.id)}
                style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem', backgroundColor: '#ff4444', color: 'white', border: 'none', borderRadius: '4px' }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedCandidates;
