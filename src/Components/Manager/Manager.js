import { Fragment, useEffect } from 'react';
import './Manager.css'
import { Button } from 'react-bootstrap';

function Manager(){

    useEffect(()=>{
        document.body.classList.add('Manager-page-body');

        return ()=>{
            document.body.classList.remove('Manager-page-body');
        }
    },[])

return <Fragment>
 <h2 className='heading'>MATHS VIEWS</h2>

 <div>
    <Button>Add Admin </Button>
 </div>
</Fragment>

}

export default Manager;