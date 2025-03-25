import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import CandidateDisplay from '../components/CandidateDisplay';
import Candidate from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [potentialCandidates, setPotentialCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const fetchCandidate = async () => {
      const users = await searchGithub();
      if (users.length > 0) {
        const user = await searchGithubUser(users[0].login);
        console.log('Fetched user:', user); // Add this line to log the fetched user data
        setCandidate({
          name: user.name,
          username: user.login,
          location: user.location,
          avatar: user.avatar_url,
          email: user.email,
          html_url: user.html_url,
          company: user.company,
          bio: user.bio,
        });
      }
    };
    fetchCandidate();
  }, []);

  useEffect(() => {
    const savedCandidates = JSON.parse(localStorage.getItem('potentialCandidates') || '[]');
    setPotentialCandidates(savedCandidates);
  }, []);

  useEffect(() => {
    localStorage.setItem('potentialCandidates', JSON.stringify(potentialCandidates));
  }, [potentialCandidates]);

  const handleSave = () => {
    if (candidate) {
      setPotentialCandidates([...potentialCandidates, candidate]);
      nextCandidate();
    }
  };

  const handleSkip = () => {
    nextCandidate();
  };

  const nextCandidate = async () => {
    const users = await searchGithub();
    if (users.length > 0) {
      const user = await searchGithubUser(users[0].login);
      console.log('Fetched user:', user); // Add this line to log the fetched user data
      setCandidate({
        name: user.name,
        username: user.login,
        location: user.location,
        avatar: user.avatar_url,
        email: user.email,
        html_url: user.html_url,
        company: user.company,
        bio: user.bio,
      });
    } else {
      setCandidate(null);
    }
  };

  return (
    <div>
      {candidate ? (
        <CandidateDisplay
          name={candidate.name}
          username={candidate.username}
          location={candidate.location}
          avatar={candidate.avatar}
          email={candidate.email}
          html_url={candidate.html_url}
          company={candidate.company}
          bio={candidate.bio}
          onSave={handleSave}
          onSkip={handleSkip}
        />
      ) : (
        <p>No more candidates available.</p>
      )}
    </div>
  );
};

export default CandidateSearch;


