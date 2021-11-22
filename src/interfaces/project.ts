export interface Project {
  isPublished: boolean
  _id: string
  owner: string
  title: string
  description: string
  scope: Scope
  budget: Budget
  skills: Array<string>
}

export interface Budget {
  type: string
  currency: string
  amount: string
}

export interface Scope {
  size: string
  duration: string
  experience: string
}
