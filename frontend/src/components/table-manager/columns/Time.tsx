/* eslint-disable react/display-name */

import React from 'react'
import moment from 'moment'

export default function (time:any) {
  if (time) {
    return (
      <span>
        {moment(time).format('MM/DD/YYYY')}
        <br />
        {moment(time).format('HH:mm:ss')}
      </span>
    )
  }
}
