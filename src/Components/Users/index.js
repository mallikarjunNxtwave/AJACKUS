import { CgProfile } from "react-icons/cg";
import { MdEdit, MdDelete } from "react-icons/md";
import './index.css'

const Users = props => {
    const { userDetails } = props
    const { id, name, username, email, company } = userDetails
    console.log(userDetails)
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
                <button type="button" className="edit-delete-button">
                    <MdDelete className="delete" />
                </button>
            </div>
        </div>
    )
}

export default Users