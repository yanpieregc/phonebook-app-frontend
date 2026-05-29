const Filter = ({ textToFilter, handleInputFilter}) => (
<p>filter shown with <input type="text" value={textToFilter} onChange={handleInputFilter}/></p>
)

export default Filter