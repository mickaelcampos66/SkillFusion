export interface Course {
  id: number
  name: string
  description: string
  content: string
  image: string
  created_at?: Date | null
  updated_at?: Date | null
  level: string
  created_by: number
}
