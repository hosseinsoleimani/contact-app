import styles from "./ContactsItem.module.css"


function ContactItem({data:{id,name,lastName,email,phone}, deleteHandler , editHandler, checkHandler, selectedContacts}){
    return(
        
             <li className={styles.item}>
                <p>{name} {lastName}</p>
                <p>
                    <span>📧</span> {email}
                </p>
                <p>
                    <span>📱</span> {phone}
                </p>
                <input className={styles.checkbox} type="checkbox" checked={selectedContacts.includes(id)} onChange={e=>checkHandler(id,e.target.checked)} />
                <button onClick={()=>editHandler(id)}>📝</button>
                <button onClick={()=>deleteHandler(id)}>🗑️</button>

            </li>

    )
}

export default ContactItem