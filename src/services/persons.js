const urlBase = '/api/persons'

const post = (data) => ({
	method: 'POST',
	headers: {
			'Content-Type': 'application/json'
	},
	body: JSON.stringify(data)
})

const put = (data) => ({
	method: 'PUT',
	headers: {
			'Content-Type': 'application/json'
	},
	body: JSON.stringify(data)
})

const getAll = () => {
	const response = fetch(urlBase)
	return response.then(async res => {
		const data = await res.json()
			if (!res.ok) {
				throw {
					status: res.status,
					data
				}
			}
			return data
	})
}   

const createData = (newObject) => {
	const response = fetch(urlBase, post(newObject))
	return response.then(async res => {
		const data = await res.json()
		if (!res.ok) {
			throw {
				status: res.status,
				data
			}
		}
		return data
	})
}

const deleteData = (id) => {
	const response = fetch(`${urlBase}/${id}`, { method: 'DELETE'})
	return response.then(res => {
		if (!res.ok) throw new Error('Delete error')
			return null
	})
}

const updateData = (id, newObject) => {
	const response = fetch(`${urlBase}/${id}`, put(newObject))
	return response.then(async res => {
		const data = await res.json()

		if (!res.ok) {
			throw {
				status: res.status,
				data
			}
		}
		return data
	})
}

export default { getAll, createData, deleteData, updateData }