import React from 'react'
// Kutuları doldurma
function Area (props) {
    const classes = (props.className ? `${props.className} area` : `area`)
  return (
    <span
    className={classes + (props.state === "X" ? ` fc-aqua` : ` fc-white`)}
    onClick={() => props.onClick(props.index)}>
   {props.state}
</span>
  )
}

export default Area;