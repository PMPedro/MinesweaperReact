import React from 'react';


export default function Cell({ details, updateFlag, revealCell }) {
    const handleRightClick = (e) => {
      e.preventDefault();
      if (!details.revealed) {
        updateFlag(e, details.x, details.y);
      }
    };
  
    const handleClick = () => {
      if (!details.flagged) {
        revealCell(details.x, details.y);
      }
    };
  
    return (
      <div
        onContextMenu={handleRightClick}
        onClick={handleClick}
        className={`cel ${details.revealed ? 'revealed' : ''} ${details.flagged ? 'flagged' : ''}`}
      >
        {details.flagged ? (<span className="flag">🚩</span>) : details.revealed && details.value !== 0 ? ( details.value === "X" ? (<span className="bomb">💣</span> ) : (details.value  )) : (""  )}
      </div>
    );
  }