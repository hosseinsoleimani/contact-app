import { useState } from "react"
import{v4} from "uuid"

import ContactsList from "./ContactsList";
import inputs from "../constants/inputs";

import styles from "./Contacts.module.css";
import Modal from "./Modal";

function Contacts(){
    const[contacts,setContacts]=useState([]);
    const[alert,setAlert]=useState("");
    const[contact,setContact]=useState({
        id:"",
        name:"",
        lastName:"",
        email:"",
        phone:""
    });
    const[search,setSearch]=useState("");
    const[isModalOpen,setIsModalOpen]=useState(false);

    const[tempDeleteId,setTempDeleteId]=useState(null);

    const changeHandler=(event)=>{
        const name=event.target.name;
        const value=event.target.value;

        setContact((contact)=>({...contact,[name]:value}))
    }
      const toggleModal=()=>{
      setIsModalOpen((prev)=>!prev)
  }

    const addHandler=()=>{
        if(!contact.name || !contact.lastName || !contact.email || !contact.phone){
            setAlert("Please Enter valid data!");
            return;
        }
        
        setAlert("")

        if(contact.id){
            const editContact= contacts.map(item=>{
                if(item.id===contact.id){
                    return contact;
                }else{
                    return item;
                }    
            })
            setContacts(editContact)
            setContact({
            name:"",lastName:"",email:"",phone:""
            })
        }else{
        const newContact={...contact, id: v4()}
        setContacts(contacts=>([...contacts,newContact]))
        setContact({
        name:"",lastName:"",email:"",phone:""
        })}
    }

    const deleteHandler=(id)=>{
        setTempDeleteId(id);
        toggleModal();
    }

    const editHandler=(id)=>{
        const newContact=contacts.find(contact=>contact.id===id);
        setContact(newContact);

    }
    const searchHandler=(event=>setSearch(event.target.value));


    const filteredContacts= contacts.filter((contact)=>{
        const fullText=`${contact.name} ${contact.lastName} ${contact.email}`.toLowerCase();
        return fullText.includes(search.toLowerCase());
    })

    const confirmDelete=()=>{
        const newContacts=contacts.filter(contact=> contact.id !=tempDeleteId);
        setContacts(newContacts);
        setTempDeleteId(null);
        toggleModal();
    }


    return(
        <div className={styles.container}>
            <div className={styles.form}>
                {
                inputs.map((input, index)=>(<input
                    key={index}
                    type={input.type}
                    name={input.name}
                    placeholder={input.placeholder}
                    value={contact[input.name]}
                    onChange={changeHandler} />))
                }
                <button onClick={addHandler}>{contact.id ? "Update Contact" : "Add Contact"}</button>
                <input type="text" placeholder="Search" value={search} onChange={searchHandler} />
            </div>
            <div className={styles.alert}>{alert && <p>{alert}</p>}</div>
            <ContactsList contacts={filteredContacts} deleteHandler={deleteHandler} editHandler={editHandler}/>
            {isModalOpen && <Modal modal={toggleModal} onConfirm={confirmDelete}/>}

        </div>
    )
}

export default Contacts