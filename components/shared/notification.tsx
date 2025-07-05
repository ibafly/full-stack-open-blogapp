"use client"

import React from "react"

export default function Notification ({ 
    message,
    className, 
    style
}: {
    message: string | null,
    className?: string,
    style?: React.CSSProperties
}) {
//   const msgStyle = {
//     background: "gray",
//     padding: "5px",
//     fontSize: "16px",
//     fontWeight: "bold",
//     color: "green",
//     border: "solid 4px",
//     borderRadius: "4px",
//   }
  return !message ? null : (
    <p
      style={{
        ...style,
        color: message.includes("wrong") ? "red" : "green",
      }}
      className={`notification ${className}`}
    >
      {message}
    </p>
  )
}
