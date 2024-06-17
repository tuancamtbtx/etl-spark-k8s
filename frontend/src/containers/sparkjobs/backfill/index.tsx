import React, { useState } from 'react';

import { Drawer, Button } from 'antd'

import FormBackfill from './form'
const Backfill: React.FC = () => {
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
            Backfill
        </Button>
        <Drawer size='large' title="Backfill Job" onClose={onClose} open={open}>
            <FormBackfill/>
        </Drawer>
        </>
       

    )
}

export default Backfill;