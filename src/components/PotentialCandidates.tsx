import React from 'react';
import Candidate from '../interfaces/Candidate.interface';

interface PotentialCandidatesProps {
  candidates: Candidate[];
  handleReject: (index: number) => void;
}

const PotentialCandidates: React.FC<PotentialCandidatesProps> = ({ candidates, handleReject }) => {
  return (
    <div>
      {candidates.length > 0 ? (
        <table className="potential-candidates-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Location</th>
              <th>Email</th>
              <th>Company</th>
              <th>Bio</th>
              <th>Reject</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate, index) => (
              <tr key={index}>
                <td>
                  <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
                    <img src={candidate.avatar} alt={candidate.name} />
                  </a>
                </td>
                <td>{candidate.name || candidate.username}</td>
                <td>{candidate.location || 'N/A'}</td>
                <td>{candidate.email || 'N/A'}</td>
                <td>{candidate.company || 'N/A'}</td>
                <td>{candidate.bio || 'N/A'}</td>
                <td><button onClick={() => handleReject(index)}>Reject</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No potential candidates available.</p>
      )}
    </div>
  );
};

export default PotentialCandidates;
