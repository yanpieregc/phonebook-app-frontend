const Form = ({ handleSubmit, newName, newPhone, handleInputName, handleInputPhone }) => (
  <form onSubmit={handleSubmit}>
    <p>name: <input type="text" value={newName} onChange={handleInputName}/></p>
    <p>number: <input type="text" value={newPhone} onChange={handleInputPhone}/></p>
    <button type="submit">add</button>
  </form>
)

export default Form