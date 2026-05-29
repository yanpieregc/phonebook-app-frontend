import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import Numbers from './components/Numbers'
import personService from './services/persons'
import './app.css'

const Notification = ({message, className}) => (
  !message
    ? null
    : <p className={className}>{message}</p>
)

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [textToFilter, setTextToFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(textToFilter.toLowerCase()))

  const handleInputFilter = (event) => {
    setTextToFilter(event.target.value)
  }

  const handleInputName = (event) => {
    setNewName(event.target.value)
  }

  const handleInputNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const resetForm = () => {
    setNewName('')
    setNewNumber('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber
    }

    const existingPerson = persons.find(p => newName.toLowerCase() === p.name.toLowerCase())

    if (existingPerson) {
      const confirmReplace = window.confirm(`${newName} is already added to Phonebook, replace the old number with a new one?`)

      if (!confirmReplace) return

      personService
        .updateData(existingPerson.id, {...existingPerson, number: newNumber})
          .then(updatePerson => {
            setPersons(persons.map(p => p.id === existingPerson.id ? updatePerson : p))
            resetForm()
            setSuccessMessage(`The number of ${existingPerson.name} has been updated correctly`)
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
          })
          .catch(error => {
            if (error.status === 400) {
              setErrorMessage(error.data.error)
              setNewNumber('')
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000)
            }
            else {
              setErrorMessage(`Information of ${existingPerson.name} has already been removed from server`)
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000)
              resetForm()
              setPersons(persons.filter(p => p.id !== existingPerson.id))
            }
          })
      return
    }

    personService
      .createData(newPerson)
        .then(returnedPerson => {
          setPersons(prev => [...prev, returnedPerson])
          resetForm()
          setSuccessMessage(`Added ${newPerson.name}`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
        .catch(error => {
          console.error('Error:', error.data.error)
          setErrorMessage(error.data.error)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setNewName('')
          setNewNumber('')
        })
  }

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}`)) {
      personService
      .deleteData(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
          setSuccessMessage(`${name} delete successfully`)
          setTimeout(() => {
          setSuccessMessage(null)
          }, 5000)
        })
        .catch(() => {
          setErrorMessage(`Information of ${name} has already been removed from server`)
          setTimeout(() => {
                setErrorMessage(null)
              }, 5000)
              setPersons(persons.filter(p => p.id !== id))
        })
    }
  }
  
  useEffect(() => {
    personService
      .getAll()
      .then(data => setPersons(data))
  }, [])

  return (
    <>
      <h2>Phonebook</h2>
      <Notification className='success' message={successMessage} />
      <Notification className='error' message={errorMessage} />
      <Filter textToFilter={textToFilter} handleInputFilter={handleInputFilter} />
      <h2>add a new</h2>
      <Form 
        handleSubmit={handleSubmit} 
        newName={newName} 
        newPhone={newNumber}
        handleInputName={handleInputName} 
        handleInputPhone={handleInputNumber}
      />
      <h2>Numbers</h2>
      <Numbers filteredPersons={filteredPersons} deletePerson={deletePerson} />
    </>
  )
}

export default App