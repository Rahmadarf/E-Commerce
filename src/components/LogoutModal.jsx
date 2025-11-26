import { useNavigate } from "react-router-dom"

const LogoutModal = () => {

    const navigate = useNavigate()

    const handleOut = () => {
        localStorage.removeItem('isLoggIn')
        navigate('/login')
    }

    return (
        <div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <dialog id="logout" className="modal overflow-hidden">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Are you sure wan't to logout?</h3>
                    <p className="py-4">You must Sign In again</p>
                    <div className="modal-action">
                        <form method="dialog" className="flex gap-x-2">
                            {/* if there is a button in form, it will close the modal */}
                            <button onClick={handleOut} className="btn btn-warning">Sure</button>
                            <button className="btn">Cancel</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default LogoutModal