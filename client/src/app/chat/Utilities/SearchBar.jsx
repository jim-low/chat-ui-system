import { RxMagnifyingGlass } from 'react-icons/rx'
import '../styles/Utilities/SearchBar.css'

const SearchBar = ({ placeholder = "Search...", value, handleChange }) => {
  return (
    <div id="searchBar">
      <RxMagnifyingGlass className='magnifying-glass-icon icon' />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </div>
  )
}

export default SearchBar
