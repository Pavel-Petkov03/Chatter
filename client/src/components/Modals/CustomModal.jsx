import "../../styles/Modal.css" 


export default function CustomModal(){
    return (
        <div>
            <div class="modal">
                <h1>Modal window</h1>
                <button class="close-icon">&times;</button>
                <p></p>
            <button class="close">Close</button>
            </div>
            <div class="modal-container"></div>
        </div>
    )
}