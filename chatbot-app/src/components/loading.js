import "./loading.css";

const Loading = ({ isCustomer }) => {
  return (
    <div className="mainLoader" id="loader" style={{ display: 'flex' , justifyContent: 'left' }}>
      <div className="lds-ellipsis" style={{ display: isCustomer ? 'inline-block' : 'block' }}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )

}

export default Loading