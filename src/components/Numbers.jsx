const Numbers = ({ filteredPersons, deletePerson }) => (
  filteredPersons.map(p => <p key={p.id}>{p.name} {p.number} <button onClick={() => deletePerson(p.id, p.name)}>delete</button></p>)
)

export default Numbers