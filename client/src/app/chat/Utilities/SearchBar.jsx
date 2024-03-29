import { RxMagnifyingGlass } from 'react-icons/rx'
import { TextField } from '@radix-ui/themes'

// const SearchBar = ({ placeholder = "Search...", value, handleChange }) => {
//   return (
//     <div id="searchBar">
//       <RxMagnifyingGlass className='magnifying-glass-icon icon' />
//       <input
//         type="text"
//         placeholder={placeholder}
//         value={value}
//         onChange={handleChange}
//       />
//     </div>
//   )
// }

const SearchBar = ({ placeholder = "Search", value, handleChange, style }) => {
  return (
    <TextField.Root
      placeholder={placeholder}
      type='text'
      value={value}
      onChange={handleChange}
      className='searchBar'
      style={style}
    >
      <TextField.Slot>
        <RxMagnifyingGlass style={{ fontSize: '1.5rem' }} />
      </TextField.Slot>
    </TextField.Root>
  )
}

export default SearchBar
