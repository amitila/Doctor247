import { makeStyles } from '@material-ui/core';
import React, {useState} from 'react';

const useStyles = makeStyles((theme) => ({
    li: {
        cursor: 'pointer'
    }
}));

function TestActive(props) {
    const classes = useStyles();
    
    const [items, setItems] = useState([
        { name: 'Item 1', isActive: true },
        { name: 'Item 2', isActive: false },
        { name: 'Item 3', isActive: false }
     ]);
     
    const handleClick = (index) => {
        setItems(prevItems => 
           prevItems.map((e, i) => ({...e, isActive: i === index}))
        );
     }
     
     const list = items.map( (item, index) => {
         return(
           <li className={classes.li}
             key={index} 
             onClick={() => handleClick(index)} 
             className={item.isActive ? 'active' : null}
           >
              {item.name}
           </li>
         )
     })
     
     return (
        <div>
         <ul>{list}</ul>
        </div>
     )
}

export default TestActive;