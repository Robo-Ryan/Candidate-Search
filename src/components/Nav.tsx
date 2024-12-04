import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav style={{ padding: '1rem', backgroundColor: '#f0f0f0' }}>
      <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none' }}>
        <li>
          <Link to="/">Search Candidates</Link>
        </li>
        <li>
          <Link to="/SavedCandidates">Saved Candidates</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
