import MentionTextarea from './components/mention-textarea.tsx'
import type { User } from './types.tsx'

const users: User[] = [
  { id: 1, username: 'Pavel_Smirnov', name: 'Павел Смирнов' },
  { id: 2, username: 'Elena_Ivanova', name: 'Елена Иванова' },
  { id: 3, username: 'Dmitry_Petrov', name: 'Дмитрий Петров' },
  { id: 4, username: 'Anna_Sokolova', name: 'Анна Соколова' },
  { id: 5, username: 'Alex_Dev', name: 'Алексей Разработчиков' },
  { id: 6, username: 'Maria_K', name: 'Мария Кузнецова' },
  { id: 7, username: 'Ivan_Grozny', name: 'Иван Грозный' },
  { id: 8, username: 'Svetlana_Light', name: 'Светлана Светлая' },
  { id: 9, username: 'Nikolay_99', name: 'Николай Новиков' },
  { id: 10, username: 'Olga_Design', name: 'Ольга Дизайнова' },
]

function App() {
  return (
    <>
      <h1>Тестовое задание</h1>
      <MentionTextarea users={users} />
    </>
  )
}

export default App
