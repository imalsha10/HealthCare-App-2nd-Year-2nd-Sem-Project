import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function SubmissionSuccessful() {
  const [dialogOpen, setDialogOpen] = useState(true);

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <div>
      {dialogOpen && (
        <div className="dialog">
          <div className="dialog-content">
            <h1>Submission Successful</h1>
            <p>Your form has been submitted successfully.</p>
            <Link className="u-button" to='/dental/dentalhome' onClick={handleCloseDialog}>Close</Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default SubmissionSuccessful;
