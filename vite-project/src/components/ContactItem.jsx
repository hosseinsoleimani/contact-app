import styles from "./ContactsItem.module.css"


function ContactItem({data:{id,name,lastName,email,phone}, deleteHandler , editHandler}){
    return(
             <li className={styles.item}>
                <p>{name} {lastName}</p>
                <p>
                    <span>📧</span> {email}
                </p>
                <p>
                    <span>📱</span> {phone}
                </p>
                <button onClick={()=>editHandler(id)}>📝</button>
                <button onClick={()=>deleteHandler(id)}>🗑️</button>
            </li>
    )
}

export default ContactItem