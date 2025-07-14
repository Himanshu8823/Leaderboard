import { useState, useEffect } from 'react';
import { getHistory } from '../../services/api';
import useApi from '../../hooks/useApi';
import Button from '../ui/Button';
import Card from '../ui/Card';

// PointsHistory component displays a paginated table of points history for users
const PointsHistory = () => {
  // State to store history records
  const [history, setHistory] = useState([]);
  // State to track current page for pagination
  const [page, setPage] = useState(1);
  // Custom hook for API requests, provides loading and error states
  const { loading, error, request } = useApi();

  // Fetch history data from API for the current page
  const fetchHistory = async () => {
    try {
      // Call the API and update state with the response data
      const response = await request(getHistory, page);
      setHistory(response.data || []);
    } catch (err) {
      // Log error to console for debugging
      console.error('Error fetching history:', err);
    }
  };

  // Fetch history whenever the page changes
  useEffect(() => {
    fetchHistory();
    // Only re-run when 'page' changes
  }, [page]);

  return (
    <Card>
      <h2 className="text-xl font-semibold mb-4">Points History</h2>
      
      {/* Show loading spinner while fetching data */}
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : error ? (
        // Show error message if API call fails
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {/* Render each history record as a table row */}
                {history.map(record => (
                  <tr key={record._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {/* Format date to local string */}
                      {new Date(record.claimedAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {/* Show user name or 'Unknown' if not available */}
                      {record.userId?.name || 'Unknown'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-bold">
                      {/* Display awarded points with a plus sign */}
                      +{record.pointsAwarded}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination controls */}
          <div className="flex justify-between items-center">
            <Button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              variant="outline"
            >
              Previous
            </Button>
            <span className="text-sm text-gray-600">Page {page}</span>
            <Button
              onClick={() => setPage(p => p + 1)}
              // Disable 'Next' if there are no more records
              disabled={history.length === 0}
              variant="outline"
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default PointsHistory;