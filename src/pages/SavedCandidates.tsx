import { useState, useEffect } from 'react';
import PotentialCandidates from '../components/PotentialCandidates';
import Candidate from '../interfaces/Candidate.interface';

type SortField = 'name' | 'location' | 'company' | 'email';
type SortDirection = 'asc' | 'desc';

const SavedCandidates = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  useEffect(() => {
    const savedCandidates = JSON.parse(localStorage.getItem('potentialCandidates') || '[]');
    setCandidates(savedCandidates);
    setFilteredCandidates(savedCandidates);
  }, []);

  // Filter candidates based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredCandidates(sortCandidates(candidates, sortField, sortDirection));
    } else {
      const filtered = candidates.filter(
        (candidate) =>
          candidate.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          candidate.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          candidate.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          candidate.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          candidate.bio?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCandidates(sortCandidates(filtered, sortField, sortDirection));
    }
  }, [searchTerm, sortField, sortDirection, candidates]);

  const handleReject = (index: number) => {
    const updatedCandidates = candidates.filter((_, i) => i !== index);
    setCandidates(updatedCandidates);
    localStorage.setItem('potentialCandidates', JSON.stringify(updatedCandidates));
  };

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      // Toggle sorting direction if clicking on the same field
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new sort field and default to ascending
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortCandidates = (candidatesToSort: Candidate[], field: SortField, direction: SortDirection) => {
    return [...candidatesToSort].sort((a, b) => {
      // Handle null/undefined values
      const valueA = a[field] || '';
      const valueB = b[field] || '';
      
      // Compare string values
      const comparison = valueA.localeCompare(valueB);
      
      // Apply sorting direction
      return direction === 'asc' ? comparison : -comparison;
    });
  };

  return (
    <div>
      <h1>Potential Candidates</h1>
      
      {/* Filtering */}
      <div className="filtering">
        <input 
          type="text" 
          placeholder="Search candidates..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {/* Sorting UI */}
      <div className="sorting">
        <span>Sort by: </span>
        <button 
          onClick={() => handleSort('name')} 
          className={sortField === 'name' ? 'active' : ''}
        >
          Name {sortField === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
        </button>
        <button 
          onClick={() => handleSort('location')} 
          className={sortField === 'location' ? 'active' : ''}
        >
          Location {sortField === 'location' && (sortDirection === 'asc' ? '↑' : '↓')}
        </button>
        <button 
          onClick={() => handleSort('company')} 
          className={sortField === 'company' ? 'active' : ''}
        >
          Company {sortField === 'company' && (sortDirection === 'asc' ? '↑' : '↓')}
        </button>
        <button 
          onClick={() => handleSort('email')} 
          className={sortField === 'email' ? 'active' : ''}
        >
          Email {sortField === 'email' && (sortDirection === 'asc' ? '↑' : '↓')}
        </button>
      </div>

      <PotentialCandidates candidates={filteredCandidates} handleReject={handleReject} />
    </div>
  );
};

export default SavedCandidates;
