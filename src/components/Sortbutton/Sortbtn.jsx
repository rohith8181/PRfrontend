import React, { useState } from 'react';
import "./Sortbtn.css"
import { useSelector, useDispatch } from 'react-redux';
import { setsorttype } from '../../redux/Slices/SortSlice';

const Sortbtn = () => {
  const options = ['latest', 'relevance', 'oldest', 'PopularChoice'];
  const sortType = useSelector((state) => state.Sort.sorttype);
  const [selectedOption, setSelectedOption] = useState(sortType);
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

  const handleOptionSelect = (option) => {
    dispatch(setsorttype(option));
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="mainsortbtn max-w-xl m-auto">
      <div className="sbtn flex items-center justify-end pb-4">
        <span className="btn-label text-[#a01e1e]">Sort By :</span>
        <div className="dropdown">
          <button
            className="dropdown-toggle"
            onClick={() => setIsOpen(!isOpen)}
          >
            {selectedOption}
          </button>
          {isOpen && (
            <ul className="dropdown-menu z-10">
              {options.map((option, index) => (
                <li
                  key={index}
                  onClick={() => handleOptionSelect(option)}
                  className={option === selectedOption ? 'activesort' : ''}
                >
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sortbtn;
