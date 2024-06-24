import React, { useState } from 'react';

import { Drawer, Button } from 'antd'

import DataLineageVisualize from './visualize'

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
         <Button onClick={showDrawer}>
            Lineage
        </Button>
        <Drawer size='large' title="Lineage" onClose={onClose} open={open}>
            <DataLineageVisualize/>
        </Drawer>
        </>
       

    )
}

export default CreateSparkJob;