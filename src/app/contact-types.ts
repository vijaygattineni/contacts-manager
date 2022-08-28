
export interface signIn {
	email: String,
	password: String
}

export interface signUp extends signIn {
	firstName: String,
	lastName: String,
	aadhar: String,
}

export  interface Contact {
    name: string
	email: string
	phone: string,
	status: string
}

export interface Group {
	name: string
	active: boolean,
	contacts: Contact[] 
}
