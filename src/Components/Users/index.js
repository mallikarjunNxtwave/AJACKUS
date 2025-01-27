import { CgProfile } from "react-icons/cg";
import { MdEdit, MdDelete } from "react-icons/md";
import Popup from 'reactjs-popup';
import './index.css'

const Users = props => {
    const { userDetails, deleteUser } = props
    const { id, name, username, email, company } = userDetails

    const onClickYes = () => {
        deleteUser(id)
        
    }

    const deletePopup = () => (
        <Popup
            modal
            trigger={
                <button type="button" className="edit-delete-button">
                    <MdDelete className="delete" />
                </button>
            }
        >
            {close => (
                <div className="delete-popup">
                    <p className="delete-popup-text">Are you sure ?</p>
                    <div>
                        <button className="delete-popup-yes" onClick={() => {
                            onClickYes();
                            close();
                        }}>Yes</button>
                        <button className="delete-popup-no" onClick={() => close()}>No</button>
                    </div>
                </div>
            )}
        </Popup>
    )
    return (
        <div className="user-container">
            <div className="profile-container">
                <CgProfile className="profile-icon" />
                <h1 className="name">{name}</h1>
            </div>
            <p className="username">USERNAME:- {username}</p>
            <div className="details-container">
                <p className="id">ID:- {id}</p>
                <p className="email">EMAIL:- {email}</p>
                <p className="company">COMPANY:- {company.name}</p>
                <button type="button" className="edit-delete-button">
                    <MdEdit className="edit" />
                </button>
                {deletePopup()}
            </div>
        </div>
    )
}

export default Users;