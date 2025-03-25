import React from 'react';

interface CandidateProps {
  name: string;
  username: string;
  location: string;
  avatar: string;
  email: string;
  html_url: string;
  company: string;
  bio: string;
  onSave: () => void;
  onSkip: () => void;
}

const CandidateDisplay: React.FC<CandidateProps> = ({
  name,
  username,
  location,
  avatar,
  email,
  html_url,
  company,
  bio,
  onSave,
  onSkip,
}) => {
  console.log('Avatar URL:', avatar);

  return (
    <div className="candidate-display">
      <img src={avatar || 'fallback-image-url.jpg'} alt={name} />
      <h2>{name}</h2>
      <p>Username: {username}</p>
      <p>Location: {location || 'N/A'}</p>
      <p>Email: {email || 'N/A'}</p>
      <p>Company: {company || 'N/A'}</p>
      <p>Bio: {bio || 'N/A'}</p>
      <a href={html_url} target="_blank" rel="noopener noreferrer">
        GitHub Profile
      </a>
      <div>
        <button id="save-button" onClick={onSave}>+</button>
        <button id="skip-button" onClick={onSkip}>-</button>
      </div>
    </div>
  );
};

export default CandidateDisplay;
