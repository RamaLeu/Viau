import React from 'react'

const SingleItem = (props) => {
  return (
    <div>BIGIMG
        <button onClick={()=>{props.addToCart(props.currentItem)}}>Į krepšelį</button>
        <button>Užsisakyti</button>
    </div>
  )
}

export default SingleItem