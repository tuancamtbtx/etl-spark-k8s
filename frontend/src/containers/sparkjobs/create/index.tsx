import React, { useState } from 'react';

import { Drawer, Button } from 'antd'

import CreateSparkJobForm from './form'

const CreateSparkJob: React.FC = () => {
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
      setOpen(true);
    };
  
    const onClose = () => {
      setOpen(false);
    };
    return (
        <>
         <Button type="primary" onClick={showDrawer}>
            Create
        </Button>
        <Drawer size='large' title="Submit Spark Job" onClose={onClose} open={open}>
            <CreateSparkJobForm/>
        </Drawer>
        </>
       

    )
}

export default CreateSparkJob;