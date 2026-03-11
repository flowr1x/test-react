import type { DropdownPosition, User } from '../types.tsx'

interface Props {
  users: User[]
  position: DropdownPosition
  onSelect: (username: string) => void
}
function MentionDropdown({ users, position, onSelect }: Props) {
  return (
    <ul
      className="dropdown-list"
      style={{
        position: 'absolute',
        top: position.top,
        left: position.left,
      }}
    >
      {users.map((user: User) => (
        <li key={user.id} className="dropdown-list__item">
          <button
            onMouseDown={() => onSelect(user.username)}
            className="dropdown-list__btn"
          >
            {user.name}
          </button>
        </li>
      ))}
    </ul>
  )
}

export default MentionDropdown
