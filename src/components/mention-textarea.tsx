import { type ChangeEvent, useRef, useState } from 'react'
import getCaretCoordinates from 'textarea-caret'
import type { DropdownPosition, User } from '../types.tsx'
import MentionDropdown from './mention-dropdown.tsx'
import useClickOutside from '../hooks/useClickOutside.ts'
import React from 'react'

interface Props {
  users: User[]
}

function MentionTextarea({ users }: Props) {
  const [textareaValue, setTextareaValue] = useState('')
  const [showDropdown, setShowDropdown] = useState<boolean>(false)
  const [dropdownPosition, setDropdownPosition] = useState<DropdownPosition>({
    top: 0,
    left: 0,
  })
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  useClickOutside(containerRef, () => setShowDropdown(false))
  const [search, setSearch] = useState('')
  const filterUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(search.toLowerCase()) ||
      user.name.toLowerCase().includes(search.toLowerCase()),
  )

  const onClickButton = (username: string) => {
    const element = textareaRef.current
    if (!element) {
      return
    }
    const selectionStart = element.selectionStart
    const textBeforeAt = textareaValue.substring(
      0,
      textareaValue.lastIndexOf('@', selectionStart - 1),
    )
    const textAfterCursor = textareaValue.substring(selectionStart)

    const newText = `${textBeforeAt}@${username} ${textAfterCursor}`
    setTextareaValue(newText)
    setShowDropdown(false)
    element.focus()
  }

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target
    const value = target.value
    const cursor = target.selectionStart
    const textBeforeCursor = value.substring(0, cursor)
    const lastIndex = textBeforeCursor.lastIndexOf('@')

    if (lastIndex !== -1) {
      const coords = getCaretCoordinates(target, cursor)
      setSearch(value.substring(lastIndex + 1, cursor + 1))
      setDropdownPosition({
        top: coords.top + coords.height - target.scrollTop,
        left: coords.left,
      })

      setShowDropdown(true)
    } else {
      setShowDropdown(false)
      setSearch('')
    }
    const coords = getCaretCoordinates(e.target, e.target.selectionEnd)
    console.log(coords)
    setTextareaValue(value)
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Escape') {
      setShowDropdown(false)
    }
  }

  return (
    <div style={{ position: 'relative' }} ref={containerRef}>
      <textarea
        ref={textareaRef}
        value={textareaValue}
        onChange={handleInput}
        onKeyDown={onKeyDown}
        onBlur={() => setShowDropdown(false)}
        placeholder="Текст..."
      ></textarea>
      {showDropdown && (
        <MentionDropdown
          users={filterUsers}
          position={dropdownPosition}
          onSelect={onClickButton}
        />
      )}
    </div>
  )
}

export default MentionTextarea
