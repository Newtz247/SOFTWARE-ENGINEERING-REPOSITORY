/* Purpose: This is the DropDown Menu Which Contains 7 Month
    From Sep to Mar
    It Reads User's Input, and Return Value to Layout.js (grid)
    Notice, Even Selected same option, a new game will Start
    Author: Ziyang Xia */

/* This is the event function which dropdown menu uses
  It reads if user selected any options in dropdown menu
  And Notify its parent compinent about it(Month Changed)
  Parameter SelectedMonth: Which is the Index of the word set correponding to
  Months, like Sep has first 3 words, Oct will have first 6 words... etc
  onMonthChange: This one Notify parent component
  if there is any change */
  function DropDownMenu({ selectedMonth, onMonthChange }) {
    const handleChange = (event) => {
      const value = parseInt(event.target.value, 10); // pass value
      onMonthChange(value); 
    };
  
    return (
        <div>
          <select id = "dropdown"
            className="w-full h-[7vh] bg-teal-600 text-gray-300 border border-teal-700 rounded-lg py-2 px-3 
                       shadow-sm hover:bg-teal-700 focus:outline-none focus:ring focus:ring-teal-800 
                       transition-all font-comic"
            onChange={handleChange}
            value={selectedMonth || ""}
          >
            <option value="3">wikumkewiku's (Sep)</option>
            <option value="6">wikewiku's (Oct)</option>
            <option value="9">keptekewiku's (Nov)</option>
            <option value="12">kesikewiku's (Dec)</option>
            <option value="15">punamujuiku's (Jan)</option>
            <option value="18">apuknajit (Feb)</option>
            <option value="20">si'ko'ku's (Mar)</option>
          </select>
        </div>
    );
  }
  
  export default DropDownMenu;