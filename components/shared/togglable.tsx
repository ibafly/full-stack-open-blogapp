"use client"

import PropTypes from "prop-types"
import { forwardRef, useImperativeHandle, useState, PropsWithChildren } from "react"

export interface ToggleRef {
  toggleVisibility: () => void
}

const Togglable = forwardRef<ToggleRef, PropsWithChildren<{ btnLabel: string }>>(({ children, btnLabel }, ref) => {
  // const Togglable = React.forwardRef(({ children, btnLabel }, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? "none" : "" }
  const showWhenVisible = { display: visible ? "" : "none" }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return { toggleVisibility } // return an object not a function variable
  })

  return (
    <div>
      <button onClick={toggleVisibility} style={hideWhenVisible} className="mx-auto mt-2 inline-flex w-full items-center justify-center space-x-2 rounded-full border border-black bg-black px-5 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black">
        {btnLabel}
      </button>
      <div style={showWhenVisible}>{children}</div>
    </div>
  )
})

Togglable.propTypes = {
  btnLabel: PropTypes.string.isRequired,
}

Togglable.displayName = "Togglable"

export default Togglable
